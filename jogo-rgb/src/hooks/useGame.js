import { useState, useEffect, useCallback } from 'react';

const generateColor = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
});

export const useGame = () => {
  const [phase, setPhase] = useState('reveal');
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);

  const startRound = useCallback(() => {
    const newTarget = generateColor();
    setTargetColor(newTarget);
    setSelected(null);
    setPhase('reveal');
    setTimeout(() => setPhase('guess'), 2000);
  }, []);

  const handleGuess = (color) => {
    setSelected(color);
    setPhase('result');

    const diff = Math.sqrt(
      Math.pow(color.r - targetColor.r, 2) +
      Math.pow(color.g - targetColor.g, 2) +
      Math.pow(color.b - targetColor.b, 2)
    );

    const accuracy = Math.max(0, (1 - diff / 441));

    if (accuracy >= 0.95) {
      setScore((prev) => prev + Math.round(accuracy * 100));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      setScore((prev) => prev + Math.round(accuracy * 50));
    }
  };

  const handleNext = () => {
    setRound((prev) => prev + 1);
    startRound();
  };

  useEffect(() => {
    startRound();
  }, [startRound]);

  return { 
    phase, 
    targetColor, 
    selected, 
    score, 
    streak, 
    round, 
    handleGuess, 
    handleNext 
  };
};