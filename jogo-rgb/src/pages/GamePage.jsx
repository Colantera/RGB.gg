import React, { useState, useEffect } from 'react';
import GameScreen from '../components/GameScreen.jsx';
import ResultScreen from '../components/ResultScreen.jsx';
import { useGame } from '../hooks/useGame.js';
import { getMatchCount, incrementMatchCount } from '../services/matchCounterService.js';

const GamePage = () => {
  const { 
    phase, targetColor, selected, score, streak, round, handleGuess, 
    handleNext: gameHandleNext 
  } = useGame();

  const [matchCount, setMatchCount] = useState(null);

  useEffect(() => {
    const count = getMatchCount();
    setMatchCount(count);
  }, []);

  const handleNextRound = () => {
    gameHandleNext();
    const updated = incrementMatchCount();
    setMatchCount(updated);
  };

  return (
    <>
      <header className="game-header">
        {matchCount !== null && (
          <span className="user-greeting">{matchCount} partidas jogadas</span>
        )}
      </header>

      <div className="app">
        {(phase === 'reveal' || phase === 'guess') && (
          <GameScreen phase={phase} targetColor={targetColor} onGuess={handleGuess} />
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