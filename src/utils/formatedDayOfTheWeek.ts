export function formatedDayOfTheWeek(day: string) {
  let dayStringToPtBr: string;

  if(!day) return false;

  switch (day) {
    case 'Monday':
      dayStringToPtBr = 'Segunda-feira'
    break;
    case 'Tuesday':
      dayStringToPtBr = 'Terça-feira'
    break;
    case 'Wednesday':
      dayStringToPtBr = 'Quarta-feira'
    break;
    case 'Thursday':
      dayStringToPtBr = 'Quinta-feira'
    break;
    case 'Friday':
      dayStringToPtBr = 'Sexta-feira'
    break;
    case 'Saturday':
      dayStringToPtBr = 'Sábado'
    break;
    case 'Sunday':
      dayStringToPtBr = 'Domingo'
    break;
  }

  return dayStringToPtBr;
}