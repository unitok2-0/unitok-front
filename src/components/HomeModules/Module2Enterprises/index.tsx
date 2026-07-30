import * as S from './styles';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import AHGORA_LOGO from '/public/assets/AHGORA_LOGO.svg';
import ABRH_BRASIL_LOGO from '/public/assets/ABRH_BRASIL_LOGO.svg';
import BDONE_LOGO from '/public/assets/BDONE_LOGO.svg';
import FREEBRANDS_LOGO from '/public/assets/FREEBRANDS_LOGO.svg';
import G4_EDUCACAO_LOGO from '/public/assets/G4_EDUCACAO_LOGO.svg';
import NEON_LOGO from '/public/assets/NEON_LOGO.svg';
import PATRIANI_LOGO from '/public/assets/PATRIANI_LOGO.svg';

const items = [
  <AHGORA_LOGO key="ahgora_logo" />,
  <ABRH_BRASIL_LOGO key="abrh_logo" />,
  <BDONE_LOGO key="bdone_logo" />,
  <FREEBRANDS_LOGO key="freebrands_logo" />,
  <G4_EDUCACAO_LOGO key="g4_educacao_logo" />,
  <NEON_LOGO key="neon_logo" />,
  <PATRIANI_LOGO key="patriani_logo" />,
]

export function Module2Enterprises() {

  return (
    <>
      <S.Container>
        <S.Title>Empresas que já estão usando Unitok</S.Title>
        <S.ContainerCarrossel>

          <S.ToggleCarousel>
            <AliceCarousel
              swipeDelta={30}
              autoPlay={true}
              infinite={true}
              animationDuration={2000}
              paddingLeft={15}
              autoPlayInterval={1000}
              disableButtonsControls={true}
              swipeExtraPadding={0}
              items={items}
              responsive={{
                700: {
                  items: 4,
                },
                450:{
                  items: 3,
                },
                0:{
                  items: 2,
                }
              }}
            />
          </S.ToggleCarousel>

          <S.ToggleStaticIcons>
            <AHGORA_LOGO />
            <ABRH_BRASIL_LOGO />
            <BDONE_LOGO />
            <FREEBRANDS_LOGO />
            <G4_EDUCACAO_LOGO />
            <NEON_LOGO />
            <PATRIANI_LOGO />
          </S.ToggleStaticIcons>

        </S.ContainerCarrossel>
      </S.Container>
    </>
  )
}