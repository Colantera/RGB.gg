import React from 'react';

const GameScreen = ({ phase, targetColor, options, onGuess }) => {
  if (phase === 'reveal') {
    return (
      <div className="game-screen reveal">
        <div 
          className="color-block" 
          style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} 
        />
        <p className="hint">memorize essa cor</p>
      </div>
    );
  }

  if (phase === 'guess') {
    return (
      <div className="game-screen guess">
        <p className="question">qual era a cor?</p>
        <div className="options">
          {options.map((color, i) => (
            <button
              key={i}
              className="option-btn"
              onClick={() => onGuess(color)}
            >
              rgb({color.r}, {color.g}, {color.b})
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default GameScreen;