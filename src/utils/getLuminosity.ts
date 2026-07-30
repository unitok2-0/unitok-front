

export function getLuminosity(hex: string) {
  const nib = hex.split('');
  
  const r = parseInt(nib[1] + nib[2], 16);
  const g = parseInt(nib[3] + nib[4], 16);
  const b = parseInt(nib[5] + nib[6], 16);

  const luminosity = (r * 299 + g * 587 + b * 114) / 1000;



  return luminosity
}