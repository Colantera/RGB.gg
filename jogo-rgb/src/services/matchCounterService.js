const getBaseUrl = () => {
  return import.meta.env.VITE_COUNTAPI_URL || 'https://api.countapi.xyz';
};

const getNamespaceKey = () => {
  const date = new Date().toISOString().split('T')[0];
  return `rgbgg/matches-${date}`;
};

export const incrementMatchCount = async () => {
  try {
    const response = await fetch(`${getBaseUrl()}/hit/${getNamespaceKey()}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Erro ao incrementar contador de partidas:", error);
    return null;
  }
};

export const getMatchCount = async () => {
  try {
    const response = await fetch(`${getBaseUrl()}/get/${getNamespaceKey()}`);
    if (!response.ok) {
      if (response.status === 404) return 0;
      return null;
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Erro ao buscar contador de partidas:", error);
    return null;
  }
};