import { Container } from './styles'
import Abrh from '../../../../public/assets/abrh_logo.svg';
interface HeaderEventProps {
  whiteIcons: boolean;
}

export function HeaderEvent({ whiteIcons }: HeaderEventProps) {

  return (
    <Container>
      {whiteIcons ? (
        <>
          <img src="/assets/logo_unitok_white.svg" alt="" />
          <img src="/assets/abrh_logo_white.svg" alt="" />
        </>
      ) : (
        <>
          <img src="/assets/abrh_logo.svg" alt="" />
          <img src="/assets/logo_unitok_gray.svg" alt="" />
        </>
      )}

    </Container>
  )
}