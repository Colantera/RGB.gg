import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = register(name, email, password);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
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
            required 
            placeholder="Seu nome"
          />
        </div>
        
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Seu e-mail"
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
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