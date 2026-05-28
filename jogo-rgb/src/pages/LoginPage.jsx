import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Função exclusiva para validação no Frontend
  const validateForm = () => {
    // 1. Validação de campos vazios
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }

    // 2. Validação de formato de E-mail usando Expressão Regular (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      return false;
    }

    // 3. Validação de tamanho mínimo da senha (boas práticas de segurança no front)
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
      return; // Interrompe o envio se houver erro no front
    }

    // Se passar na validação do front, tenta fazer o login lógico
    const result = login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error); // Exibe o erro de credenciais inválidas do serviço
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu e-mail"
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha"
          />
        </div>
        
        <button type="submit" className="confirm-btn auth-btn">Login</button>
        
        <p className="auth-footer">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;