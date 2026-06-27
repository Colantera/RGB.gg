import React, { useState, useEffect, useRef } from 'react';
import GameScreen from '../components/GameScreen.jsx';
import ResultScreen from '../components/ResultScreen.jsx';
import { useGame } from '../hooks/useGame.js';

const GamePage = () => {
  const { 
    phase, targetColor, selected, score, streak, round, handleGuess, 
    handleNext: gameHandleNext 
  } = useGame();

  const [matchCount, setMatchCount] = useState(null);

  const [matchCount, setMatchCount] = useState(null);
  const matchIdRef = useRef(null);

  // Busca contador e cria a primeira partida ao montar
  useEffect(() => {
    const count = getMatchCount();
    setMatchCount(count);
  }, []);

  // Salva a rodada assim que o resultado fica disponível
  useEffect(() => {
    if (phase === 'result' && selected) {
      const diff = Math.sqrt(
        Math.pow(selected.r - targetColor.r, 2) +
        Math.pow(selected.g - targetColor.g, 2) +
        Math.pow(selected.b - targetColor.b, 2)
      );
      const accuracy = Math.round(Math.max(0, (1 - diff / 441)) * 100);

      saveRound(matchIdRef.current, {
        targetColor,
        guessColor: selected,
        accuracy,
      });
    }
  }, [phase]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextRound = async () => {
    gameHandleNext();
    const updated = incrementMatchCount();
    setMatchCount(updated);
  };

  return (
    <>
      <header className="game-header">
        {matchCount !== null && (
          <span className="user-greeting">{matchCount} partidas hoje</span>
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