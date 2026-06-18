import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // NOVO ESTADO
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
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
    setSuccessMsg(''); // Limpa a mensagem
    
    if (!validateForm()) return;

    const result = await login(email, password);
    
    if (result.success) {
      // 1. Exibe a mensagem de sucesso
      setSuccessMsg('Login aprovado! Entrando no RGB.gg...');
      
      // 2. Aguarda 1.5 segundo (1500ms) para mandar pro jogo
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        
        {/* Renderização Condicional: Mostra Erro OU Sucesso */}
        {error && <div className="auth-error">{error}</div>}
        {successMsg && <div className="auth-success">{successMsg}</div>}
        
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu e-mail"
            disabled={!!successMsg} /* Bloqueia se estiver redirecionando */
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha"
            disabled={!!successMsg}
          />
        </div>
        
        <button 
          type="submit" 
          className="confirm-btn auth-btn"
          disabled={!!successMsg} /* Botão bloqueado enquanto espera */
        >
          {successMsg ? 'Carregando...' : 'Login'}
        </button>
        
        <p className="auth-footer">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;