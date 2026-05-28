import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // NOVO ESTADO AQUI
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }
    if (name.trim().length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      return false;
    }
    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres.');
      return false;
    }
    return true; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccessMsg(''); // Limpa a mensagem caso já exista
    
    if (!validateForm()) return;

    // Dispara para o Backend (lembre-se que aqui usamos await)
    const result = await register(name, email, password);
    
    if (result.success) {
      // 1. Exibe a mensagem de sucesso na tela
      setSuccessMsg('Cadastro realizado com sucesso! Redirecionando...');
      
      // 2. Aguarda 2 segundos (2000ms) antes de jogar o usuário pra tela de Login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } else {
      setError(result.error); 
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        
        {/* Renderização Condicional: Mostra Erro OU Sucesso */}
        {error && <div className="auth-error">{error}</div>}
        {successMsg && <div className="auth-success">{successMsg}</div>}
        
        <div className="form-group">
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Seu nome"
            disabled={!!successMsg} /* Desabilita os campos se deu sucesso */
          />
        </div>
        
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Seu e-mail"
            disabled={!!successMsg}
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Crie uma senha"
            disabled={!!successMsg}
          />
        </div>
        
        <button 
          type="submit" 
          className="confirm-btn auth-btn"
          disabled={!!successMsg} /* Desabilita o botão para não clicar duas vezes */
        >
          {successMsg ? 'Aguarde...' : 'Cadastrar'}
        </button>
        
        <p className="auth-footer">
          Já tem uma conta? <Link to="/login">Entre</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;