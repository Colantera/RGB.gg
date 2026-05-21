import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-title-wrapper">
          <h1 className="home-title">RGB<span className="home-title-accent">.gg</span></h1>
        </div>

        <p className="home-description">
          uma cor aparece por 2 segundos. memorize-a. depois tente reproduzi-la com o seletor.
          sua pontuação depende da precisão.
        </p>

        <div className="home-user-card">
          <span className="home-user-name">{user?.name}</span>
          <button className="home-logout-btn" onClick={handleLogout}>sair</button>
        </div>

        <button className="home-play-btn" onClick={() => navigate('/game')}>
          jogar
        </button>
      </div>
    </div>
  );
};

export default HomePage;