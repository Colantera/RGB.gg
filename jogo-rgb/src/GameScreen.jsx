import React, { useState } from 'react';
import { RgbColorPicker } from 'react-colorful';

const GameScreen = ({ phase, targetColor, options, onGuess }) => {
  const [pickedColor, setPickedColor] = useState({ r: 128, g: 128, b: 128 });

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

        <div className="picker-wrapper">
          <div
            className="picked-preview"
            style={{ backgroundColor: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})` }}
          />
          <RgbColorPicker color={pickedColor} onChange={setPickedColor} />
          <p className="picked-label">
            rgb({pickedColor.r}, {pickedColor.g}, {pickedColor.b})
          </p>
          <button
            className="confirm-btn"
            onClick={() => onGuess(pickedColor)}
          >
            confirmar
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GameScreen;