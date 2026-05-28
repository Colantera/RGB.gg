const BASE_URL = 'https://api.counterapi.dev/v2/joao-vitor-ribass-team-4256/first-counter-4256';

export const incrementMatchCount = async () => {
  try {
    const res = await fetch(`${BASE_URL}/up`);
    if (!res.ok) return null;
    const json = await res.json();
    // Acessa diretamente o número de contagens positivas
    return json.data?.up_count ?? null;
  } catch (err) {
    console.error("Erro no increment:", err);
    return null;
  }
};

export const getMatchCount = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return null;
    const json = await res.json();
    // Acessa diretamente o número de contagens positivas
    return json.data?.up_count ?? null;
  } catch (err) {
    console.error("Erro no get:", err);
    return null;
  }
};