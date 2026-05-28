import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Função exclusiva para validação de cadastro no Frontend
  const validateForm = () => {
    // 1. Validação de campos vazios ou apenas espaços em branco
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }

    // 2. Validação do tamanho do nome (evita nomes de apenas uma letra)
    if (name.trim().length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres.');
      return false;
    }

    // 3. Validação de formato de E-mail usando Expressão Regular (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      return false;
    }

    // 4. Validação de tamanho mínimo da senha por segurança
    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres.');
      return false;
    }

    return true; // Formulário válido
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    
    // Executa a validação do Frontend primeiro
    if (!validateForm()) {
      return; // Interrompe se houver erro no front
    }

    // Se passar na validação do front, envia os dados para o serviço
    const result = register(name, email, password);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error); // Exibe erro caso o e-mail já esteja cadastrado no localStorage
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-group">
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Seu nome"
          />
        </div>
        
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Seu e-mail"
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Crie uma senha"
          />
        </div>
        
        <button type="submit" className="confirm-btn auth-btn">Cadastrar</button>
        
        <p className="auth-footer">
          Já tem uma conta? <Link to="/login">Entre</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;