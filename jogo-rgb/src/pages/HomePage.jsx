import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatchCount } from '../services/matchCounterService';
import Ajuda from '../components/Ajuda';

const HomePage = () => {
  const navigate = useNavigate();
  const [matchCount, setMatchCount] = useState(null);
  const [loadingCount, setLoadingCount] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      setLoadingCount(true);
      const count = await getMatchCount();

      if (isMounted) {
        if (count !== null) {
          setMatchCount(count);
        }
        setLoadingCount(false);
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center' }}>
        <h2>RGB.gg</h2>

        <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
          Adivinhe a cor a partir do código RGB.
        </p>

        <div style={{
          backgroundColor: 'var(--surface2)',
          padding: '1.25rem 1rem',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Partidas jogadas
          </p>

          {loadingCount && (
            <p style={{ color: 'var(--accent)', fontWeight: '600' }}>Carregando...</p>
          )}

          {!loadingCount && matchCount !== null && (
            <p style={{ color: 'var(--correct)', fontWeight: '600', fontSize: '2rem', lineHeight: '1' }}>
              {matchCount}
            </p>
          )}

          {!loadingCount && matchCount === null && (
            <p style={{ color: 'var(--wrong)', fontSize: '0.85rem' }}>
              Servidor offline
            </p>
          )}
        </div>

        <button
          className="confirm-btn auth-btn"
          onClick={() => navigate('/game')}
        >
          Jogar
        </button>
      </div>
    </div>
  );
};

export default HomePage;