import React, { useState, useEffect } from 'react';
import './App.css';
import GameScreen from './GameScreen.jsx';
import ResultScreen from './ResultScreen.jsx';

const App = () => {
  // ESTADOS
  const [phase, setPhase] = useState('reveal'); // "reveal" | "guess" | "result"
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);

  // FUNÇÕES DE UTILIDADE
  const generateColor = () => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  });

  const generateOptions = (target) => {
    const opts = [target, generateColor(), generateColor()];
    // Embaralha as opções
    return opts.sort(() => Math.random() - 0.5);
  };

  // GERENCIAMENTO DE RODADA
  const startRound = () => {
    const newTarget = generateColor();
    const newOptions = generateOptions(newTarget);

    setTargetColor(newTarget);
    setOptions(newOptions);
    setSelected(null);
    setPhase('reveal');

    // Após 2 segundos de exibição da cor, muda para a fase de adivinhação
    setTimeout(() => {
      setPhase('guess');
    }, 2000);
  };

  const handleGuess = (color) => {
    setSelected(color);
    setPhase('result');

    // Verifica se os valores RGB batem
    const isCorrect = 
      color.r === targetColor.r && 
      color.g === targetColor.g && 
      color.b === targetColor.b;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    // Após 1.2s de feedback, inicia nova rodada e incrementa o contador
    setTimeout(() => {
      setRound((prev) => prev + 1);
      startRound();
    }, 5000);
  };

  // CICLO DE VIDA
  useEffect(() => {
    startRound();
  }, []);

  return (
    <div className="app">
      {/* RENDERIZAÇÃO CONDICIONAL BASEADA NAS FASES */}
      {(phase === 'reveal' || phase === 'guess') && (
        <GameScreen 
          phase={phase} 
          targetColor={targetColor} 
          options={options} 
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
          onNext={startRound} 
        />
      )}
    </div>
  );
};

export default App;