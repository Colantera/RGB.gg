import React from 'react';

const ResultScreen = ({ targetColor, selected, score, streak, round, onNext }) => {
  // Lógica interna para verificar se o jogador acertou a cor
  const isCorrect = 
    selected &&
    selected.r === targetColor.r && 
    selected.g === targetColor.g && 
    selected.b === targetColor.b;

  return (
    <div className="result-screen">
      <div 
        className="color-reveal" 
        style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} 
      />

      <p className={isCorrect ? "verdict correct" : "verdict wrong"}>
        {isCorrect ? "acertou" : "errou"}
      </p>

      <p className="color-label">
        rgb({targetColor.r}, {targetColor.g}, {targetColor.b})
      </p>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{score}</span>
          <span className="stat-label">pontos</span>
        </div>
        <div className="stat">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">sequência</span>
        </div>
        <div className="stat">
          <span className="stat-value">{round}</span>
          <span className="stat-label">rodada</span>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;