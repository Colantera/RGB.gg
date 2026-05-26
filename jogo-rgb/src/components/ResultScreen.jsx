import React, { useState, useEffect } from 'react';
import { getColorInfo } from '../services/colorApiService';

const ResultScreen = ({ targetColor, selected, score, streak, round, onNext }) => {
  // Estados para a cor original
  const [targetColorName, setTargetColorName] = useState("");
  const [loadingTargetName, setLoadingTargetName] = useState(false);
  
  // Estados para a cor escolhida pelo jogador
  const [selectedColorName, setSelectedColorName] = useState("");
  const [loadingSelectedName, setLoadingSelectedName] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Busca o nome da cor original
    const fetchTargetColor = async () => {
      if (targetColor) {
        setLoadingTargetName(true);
        const info = await getColorInfo(targetColor.r, targetColor.g, targetColor.b);
        
        if (isMounted) {
          if (info && info.name) {
            setTargetColorName(info.name);
          } else {
            setTargetColorName("Cor não identificada");
          }
          setLoadingTargetName(false);
        }
      }
    };

    // Busca o nome da cor selecionada pelo usuário
    const fetchSelectedColor = async () => {
      if (selected) {
        setLoadingSelectedName(true);
        const info = await getColorInfo(selected.r, selected.g, selected.b);
        
        if (isMounted) {
          if (info && info.name) {
            setSelectedColorName(info.name);
          } else {
            setSelectedColorName("Cor não identificada");
          }
          setLoadingSelectedName(false);
        }
      }
    };

    // Executa as duas buscas ao mesmo tempo
    fetchTargetColor();
    fetchSelectedColor();

    return () => {
      isMounted = false;
    };
  }, [targetColor, selected]);

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
        {/* Coluna da Cor Original */}
        <div className="color-col">
          <div
            className="color-swatch"
            style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }}
          />
          <p className="swatch-label">original</p>
          <p className="swatch-code">rgb({targetColor.r}, {targetColor.g}, {targetColor.b})</p>
          
          {loadingTargetName && <p className="swatch-code" style={{color: '#a78bfa'}}>identificando cor...</p>}
          {!loadingTargetName && targetColorName && <p className="swatch-code" style={{color: '#4ade80'}}>{targetColorName}</p>}
        </div>

        <div className="vs-divider">vs</div>

        {/* Coluna da Resposta do Usuário */}
        <div className="color-col">
          <div
            className="color-swatch"
            style={{ backgroundColor: selected ? `rgb(${selected.r}, ${selected.g}, ${selected.b})` : '#333' }}
          />
          <p className="swatch-label">sua resposta</p>
          <p className="swatch-code">
            {selected ? `rgb(${selected.r}, ${selected.g}, ${selected.b})` : '—'}
          </p>
          
          {selected && loadingSelectedName && <p className="swatch-code" style={{color: '#a78bfa'}}>identificando cor...</p>}
          {selected && !loadingSelectedName && selectedColorName && <p className="swatch-code" style={{color: '#4ade80'}}>{selectedColorName}</p>}
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

      <button className="next-btn" onClick={onNext}>
        próxima cor →
      </button>
    </div>
  );
};

export default ResultScreen;