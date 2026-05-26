import React, { useState, useEffect } from 'react';
import GameScreen from '../components/GameScreen.jsx';
import ResultScreen from '../components/ResultScreen.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame.js';
import { getMatchCount, incrementMatchCount } from '../services/matchCounterService.js';

const GamePage = () => {
  const { 
    phase, 
    targetColor, 
    selected, 
    score, 
    streak, 
    round, 
    handleGuess, 
    handleNext: gameHandleNext 
  } = useGame();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [matchCount, setMatchCount] = useState(null);

  useEffect(() => {
    const count = getMatchCount(); // só busca, não incrementa
    setMatchCount(count);
  }, []);

  const handleNextRound = () => {
    gameHandleNext();
    const updated = incrementMatchCount(); // incrementa só ao avançar rodada
    setMatchCount(updated);
  };

  return (
    <>
      <header className="game-header">
        <span className="user-greeting">Olá, {user?.name}</span>
        
        {matchCount !== null && (
          <span className="user-greeting">{matchCount} partidas jogadas hoje</span>
        )}
        
        <button className="logout-btn confirm-btn" onClick={() => navigate('/')}>voltar</button>
      </header>

      <div className="app">
        {(phase === 'reveal' || phase === 'guess') && (
          <GameScreen
            phase={phase}
            targetColor={targetColor}
            onGuess={handleGuess}
          />
        )}
        {phase === 'result' && (
          <ResultScreen
            targetColor={targetColor}
            selected={selected}
            score={score}
            streak={streak}
            round={round}
            onNext={handleNextRound}
          />
        )}
      </div>
    </>
  );
};

export default GamePage;