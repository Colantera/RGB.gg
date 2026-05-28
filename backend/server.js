const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const app = express();

// Configurações (Aumentamos o limite de JSON para caber a imagem Base64 do Avatar)
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ROTA: CADASTRAR USUÁRIO
app.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Verifica se o e-mail já existe
        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ success: false, error: 'E-mail já cadastrado.' });
        }

        // 2. Criptografa a senha (Boas Práticas)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Salva no banco de dados
        await db.execute(
            'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, null]
        );

        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
});

// ROTA: FAZER LOGIN
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Busca o usuário no banco
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ success: false, error: 'Credenciais inválidas.' });
        }

        const user = users[0];

        // 2. Compara a senha digitada com a criptografada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, error: 'Credenciais inválidas.' });
        }

        // 3. Retorna os dados do usuário logado
        res.status(200).json({ 
            success: true, 
            user: { name: user.name, email: user.email, avatar: user.avatar } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
});

// ROTA: ATUALIZAR AVATAR (Bolinha de Perfil)
app.post('/auth/avatar', async (req, res) => {
    try {
        const { email, avatar } = req.body;
        await db.execute('UPDATE users SET avatar = ? WHERE email = ?', [avatar, email]);
        res.status(200).json({ success: true, avatar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar foto de perfil.' });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend rodando com sucesso na porta ${PORT}`);
});