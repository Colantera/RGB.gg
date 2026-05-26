export const getColorInfo = async (r, g, b) => {
  try {
    // Passando apenas os números (ex: rgb=255,0,0) evita problemas de parsing na API
    const response = await fetch(`https://www.thecolorapi.com/id?rgb=${r},${g},${b}&format=json`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Acessando exatamente a propriedade que você mostrou no JSON
    const name = data.name?.value || '';
    
    const harmonics = data.colors 
      ? data.colors.map(c => ({ r: c.rgb.r, g: c.rgb.g, b: c.rgb.b })) 
      : [];

    return { name, harmonics };
  } catch (error) {
    console.error("Erro ao buscar a cor:", error);
    return null;
  }
};