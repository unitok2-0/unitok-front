import Vibrant from 'node-vibrant'
import tinycolor from 'tinycolor2';
import { getLuminosity } from './getLuminosity';


export async function getLuminosityOfImage(img: any) {
  if (!img) return 0
  const vibrant = new Vibrant(img)
  const swatches = vibrant.swatches()
  console.log(swatches);

  return 0

  /*  const color = tinycolor(result[0].color)
   const dominantColor = color.toHex8String();
 
   console.log(dominantColor)
   return getLuminosity(dominantColor) */
}