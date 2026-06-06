const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('./db');
require('dotenv').config();

const app = express();

// Configurações
app.use(cors({
    origin: 'http://localhost:5173', // Permite os pedidos do Vite
    credentials: true // Essencial: permite o envio e recebimento de cookies
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser()); // Ativa o suporte a cookies

// ROTA: CADASTRAR USUÁRIO
app.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ success: false, error: 'E-mail já cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ success: false, error: 'Credenciais inválidas.' });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, error: 'Credenciais inválidas.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // Guarda o token no banco de dados
        await db.execute('UPDATE users SET active_token = ? WHERE id = ?', [token, user.id]);

        // Envia o token como Cookie HttpOnly
        res.cookie('token_sessao', token, {
            httpOnly: true, 
            secure: false, // Muda para true se publicares o site com HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });

        res.status(200).json({ 
            success: true, 
            user: { name: user.name, email: user.email, avatar: user.avatar } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
});

// MIDDLEWARE: VERIFICAR SESSÃO NO MYSQL
const verificarSessaoBD = async (req, res, next) => {
    const token = req.cookies.token_sessao;

    if (!token) {
        return res.status(401).json({ success: false, error: 'Acesso negado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verifica no MySQL se o token ainda é o ativo
        const [users] = await db.execute('SELECT * FROM users WHERE email = ? AND active_token = ?', [decoded.email, token]);
        
        if (users.length === 0) {
            return res.status(403).json({ success: false, error: 'Sessão inválida.' });
        }

        req.user = decoded; // Guarda os dados na requisição para a rota seguinte usar
        next();
    } catch (error) {
        return res.status(403).json({ success: false, error: 'Token inválido.' });
    }
};

// ROTA: RECUPERAR SESSÃO (Quando o utilizador dá F5)
app.get('/auth/me', verificarSessaoBD, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT name, email, avatar FROM users WHERE email = ?', [req.user.email]);
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, error: 'Utilizador não encontrado.' });
        }

        res.status(200).json({ success: true, user: users[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao verificar sessão.' });
    }
});

// ROTA: LOGOUT
app.post('/auth/logout', async (req, res) => {
    const token = req.cookies.token_sessao;
    if (token) {
        // Remove o token do banco de dados
        await db.execute('UPDATE users SET active_token = NULL WHERE active_token = ?', [token]);
    }
    // Apaga o cookie
    res.clearCookie('token_sessao');
    res.status(200).json({ success: true });
});

// ROTA: ATUALIZAR AVATAR
app.post('/auth/avatar', verificarSessaoBD, async (req, res) => {
    try {
        const { avatar } = req.body;
        // Usa o email que veio do token (req.user.email) em vez do body, é mais seguro
        await db.execute('UPDATE users SET avatar = ? WHERE email = ?', [avatar, req.user.email]);
        res.status(200).json({ success: true, avatar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar foto de perfil.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend rodando com sucesso na porta ${PORT}`);
});