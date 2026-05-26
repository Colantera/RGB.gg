const BASE_URL = 'https://api.counterapi.dev/v2/joao-vitor-ribass-team-4256/first-counter-4256';
const API_KEY = import.meta.env.VITE_COUNTERAPI_KEY;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_KEY}`,
});

export const incrementMatchCount = async () => {
  try {
    const res = await fetch(`${BASE_URL}/up`, { headers: getHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data.count;
  } catch {
    return null;
  }
};

export const getMatchCount = async () => {
  try {
    const res = await fetch(BASE_URL, { headers: getHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data.count;
  } catch {
    return null;
  }
};