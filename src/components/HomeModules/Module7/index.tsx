import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Heading } from 'components/Typography'
import * as S from './styles'
import { MdPlayCircleOutline } from 'react-icons/md'
import { ActiveVideoModal, homeIcons } from '../../../pages/index-old'
import videos from 'constants/videos'
import { useRouter } from 'next/router'

export function Module7(props: ActiveVideoModal) {
  const { push } = useRouter()

  return (
    <S.SeventhScreen id={'section-id-7'}>
      <img
        className="CartaoPersonalizado1"
        src={homeIcons.unitokCartaoPersonalizado1}
        alt=""
      />
      <S.SeventhScreenDiv>
        <Heading font="titleMd" color="white">
          Unitok com a sua marca.
        </Heading>
        <img
          className="CartaoPersonalizado1Off"
          src={homeIcons.unitokCartaoPersonalizado1}
          alt=""
        />
        <ButtonPrimary
          className="SeventhButton"
          variant="secondary"
          onClick={() => push('personalizado')}
        >
          Saiba mais
        </ButtonPrimary>
        <S.ModalOppenerDiv model="third">
          <ButtonPrimary
            variant="tertiary"
            colorScheme="white"
            onClick={() => {
              props.setSelectedVideoSrc(videos.yourBrand)
              props.videoModal.handleOpen()
            }}
          >
            Veja como fazer
          </ButtonPrimary>
          <MdPlayCircleOutline />
        </S.ModalOppenerDiv>
      </S.SeventhScreenDiv>
    </S.SeventhScreen>
  )
}
