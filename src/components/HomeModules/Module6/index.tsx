import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Heading } from 'components/Typography'
import { MdPlayCircleOutline } from 'react-icons/md'
import * as S from './styles'
import { ActiveVideoModal } from '../../../pages/index-old'
import videos from 'constants/videos'

import Image from 'next/image'

/* const gifURL = 'https://development-adbat.s3.amazonaws.com/standard_files/cartao_unitok.gif' */
const gifURL = '/images/_Unitok_cartao-social.png'

export function Module6(props: ActiveVideoModal) {
  return (
    <></>
    // <S.SixthScreen id={'section-id-6'}>
    //   <Heading font="titleMdLight" color="secondary" css={{ fontWeight: 400 }}>
    //     Todas as formas de contato
    //   </Heading>
    //   <Heading font="titleMd" color="primary">
    //     com você em um único lugar.
    //   </Heading>

    //   <S.SixthImageContainer>
    //     <Image
    //       width={110}
    //       height={80}
    //       className="Module6Gif"
    //       src="/images/_Unitok_cartao-social.png"
    //       layout="responsive"
    //       alt=""
    //     />

    //     <ButtonPrimary
    //       variant="tertiary"
    //       onClick={() => {
    //         props.setSelectedVideoSrc(videos.howItWorks)
    //         props.videoModal.handleOpen()
    //       }}
    //     >
    //       Entenda como funciona
    //       <MdPlayCircleOutline />
    //     </ButtonPrimary>
    //   </S.SixthImageContainer>
    // </S.SixthScreen>
  )
}
