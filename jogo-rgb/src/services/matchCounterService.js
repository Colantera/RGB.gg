const getLocalKey = () => {
  const date = new Date().toISOString().split('T')[0];
  return `matchCount-${date}`;
};

export const getMatchCount = () => {
  const key = getLocalKey();
  return Number(localStorage.getItem(key) || 0);
};

export const incrementMatchCount = () => {
  const key = getLocalKey();
  const current = Number(localStorage.getItem(key) || 0);
  const updated = current + 1;
  localStorage.setItem(key, updated);
  return updated;
};