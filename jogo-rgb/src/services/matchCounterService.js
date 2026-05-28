const API = 'http://localhost:3001';

const getToken = () => localStorage.getItem('rgb_token');

// Retorna o total global de partidas jogadas hoje
export const getMatchCount = async () => {
  try {
    const res = await fetch(`${API}/matches/today-count`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.count;
  } catch {
    return null;
  }
};

// Cria uma nova partida no banco e retorna o matchId
export const createMatch = async () => {
  try {
    const res = await fetch(`${API}/matches`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.matchId;
  } catch {
    return null;
  }
};

// Salva uma rodada dentro de uma partida
export const saveRound = async (matchId, { targetColor, guessColor, accuracy }) => {
  if (!matchId) return;

  try {
    await fetch(`${API}/matches/${matchId}/rounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        target_r: targetColor.r,
        target_g: targetColor.g,
        target_b: targetColor.b,
        guess_r:  guessColor.r,
        guess_g:  guessColor.g,
        guess_b:  guessColor.b,
        accuracy,
      }),
    });
  } catch (err) {
    console.error('saveRound error:', err);
  }
};