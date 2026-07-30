import LogoAdbat from '../../../public/assets/logo_adbat.svg';

import { Container } from './styles'

interface CardProps {
  width?: string;
  height?: string
}

const Card: React.FC<CardProps> = ({ width = '300px', height = '200px' }) => {
  return (
    <Container
      width={width}
      height={height}
    >
      <LogoAdbat />
    </Container>
  )
}

export default Card;