import React from 'react';

const ResultScreen = ({ targetColor, selected, score, streak, round }) => {
  const diff = selected
    ? Math.round(
        Math.sqrt(
          Math.pow(selected.r - targetColor.r, 2) +
          Math.pow(selected.g - targetColor.g, 2) +
          Math.pow(selected.b - targetColor.b, 2)
        )
      )
    : 0;

  const maxDiff = 441;
  const accuracy = Math.round(Math.max(0, (1 - diff / maxDiff)) * 100);
  const isCorrect = diff === 0;

  return (
    <div className="result-screen">
      <div className="color-comparison">
        <div className="color-col">
          <div
            className="color-swatch"
            style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }}
          />
          <p className="swatch-label">original</p>
          <p className="swatch-code">rgb({targetColor.r}, {targetColor.g}, {targetColor.b})</p>
        </div>

        <div className="vs-divider">vs</div>

        <div className="color-col">
          <div
            className="color-swatch"
            style={{ backgroundColor: selected ? `rgb(${selected.r}, ${selected.g}, ${selected.b})` : '#333' }}
          />
          <p className="swatch-label">sua resposta</p>
          <p className="swatch-code">
            {selected ? `rgb(${selected.r}, ${selected.g}, ${selected.b})` : '—'}
          </p>
        </div>
      </div>

      <p className={isCorrect ? 'verdict correct' : 'verdict'}>
        {isCorrect ? 'perfeito!' : `${accuracy}% de precisão`}
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