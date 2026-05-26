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
  const [loadingCount, setLoadingCount] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const initCounter = async () => {
      setLoadingCount(true);
      await getMatchCount(); 
      const updated = await incrementMatchCount();
      
      if (isMounted) {
        if (updated !== null) {
          setMatchCount(updated);
        }
        setLoadingCount(false);
      }
    };
    
    initCounter();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNextRound = async () => {
    gameHandleNext();
    const updated = await incrementMatchCount();
    if (updated !== null) {
      setMatchCount(updated);
    }
  };

  return (
    <>
      <header className="game-header">
        <span className="user-greeting">Olá, {user?.name}</span>
        
        {loadingCount && <span className="user-greeting">...</span>}
        {!loadingCount && matchCount !== null && (
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