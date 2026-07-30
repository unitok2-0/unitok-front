export function sumeTotalCheckins(arrayOne, arrayTwo, arrayThree){
  const sume = arrayOne?.length + arrayTwo?.length + arrayThree?.length
  return `${sume === 0 ? '-' : sume}`
}

export function conditionsSumeCheckins(arrayOne, arrayTwo, arrayThree){
  const sume = arrayOne?.length + arrayTwo?.length + arrayThree?.length
  return `${sume <= 1 ? ' pessoa' : ' pessoas'}`
}