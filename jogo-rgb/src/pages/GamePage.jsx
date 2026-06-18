import React, { useState, useEffect, useRef } from 'react';
import GameScreen from '../components/GameScreen.jsx';
import ResultScreen from '../components/ResultScreen.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame.js';

const GamePage = () => {
  const {
    phase,
    targetColor,
    selected,
    score,
    streak,
    round,
    handleGuess,
    handleNext: gameHandleNext,
  } = useGame();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [matchCount, setMatchCount] = useState(null);
  const matchIdRef = useRef(null);

  // Busca contador e cria a primeira partida ao montar
  useEffect(() => {
    const init = async () => {
      const count = await getMatchCount();
      setMatchCount(count);

      const id = await createMatch();
      matchIdRef.current = id;
    };
    init();
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

    // Nova partida a cada rodada (cada rodada é uma "partida" no contador do dia)
    const id = await createMatch();
    matchIdRef.current = id;

    const count = await getMatchCount();
    setMatchCount(count);
  };

  return (
    <>
      <header className="game-header">
        <span className="user-greeting">Olá, {user?.name}</span>

        {matchCount !== null && (
<<<<<<< HEAD
          <span className="user-greeting">{matchCount} partidas hoje</span>
=======
          <span className="user-greeting">{matchCount} partidas jogadas</span>
>>>>>>> 997016df570b992a207d60cd21aee425b9312172
        )}

        <button className="logout-btn confirm-btn" onClick={() => navigate('/')}>
          voltar
        </button>
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