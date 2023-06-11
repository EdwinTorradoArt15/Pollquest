export const formatedText = (text: string) => {
  if (text.length === 0) return text;

  const primeraLetra = text.charAt(0).toUpperCase();
  const restoPalabra = text.slice(1);

  return primeraLetra + restoPalabra;
};
