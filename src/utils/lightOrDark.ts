function lightOrDark(color: string) {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  const colorNumber = +("0x" + color.slice(1).replace(
    color.length < 5 && /./g, '$&$&'));

  r = colorNumber >> 16;
  g = colorNumber >> 8 & 255;
  b = colorNumber & 255;

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 75) {
    return 'light';
  }
  return 'dark';
}

export default lightOrDark