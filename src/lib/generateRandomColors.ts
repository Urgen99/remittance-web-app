export const getColors = (name: string = "", colorPalette: string[]) => {
  if (!name || !colorPalette) return colorPalette[0] || "#DDE0F3";
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalette[hash % colorPalette.length];
};
