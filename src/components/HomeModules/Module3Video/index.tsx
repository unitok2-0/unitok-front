import { useEffect, useState } from 'react'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Heading, Text } from 'components/Typography'
import { useRouter } from 'next/router'
import videos from 'constants/videos'
import { MdPlayCircleOutline } from 'react-icons/md'
import * as S from './styles'
import { ActiveVideoModal } from '../../../pages/index-old'

export function Module3Video(props: ActiveVideoModal) {
  const { push } = useRouter()

  return (
    <S.Container id="section-id-video-3">
      <div className="title-wrapper">
        <Heading color="primary" className="title">
          <span>Entenda melhor</span>
          <br />
          como funciona
        </Heading>
      </div>
      <div className="video">
        <button
          onClick={() => {
            props.setSelectedVideoSrc(videos.howItWorks)
            props.videoModal.handleOpen()
          }}
        >
          <img src="/assets/play-icon.svg" alt="" />
        </button>
      </div>
    </S.Container>
  )
}
