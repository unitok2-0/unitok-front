export function getColorByLuminosity(luminosity: number) {
  if (luminosity >= 128) {
    return "#01302F"
  }
  if (luminosity <= 128) {
    return "white"
  }
  return "white"
}