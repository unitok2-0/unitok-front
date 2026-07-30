import { useEffect, useState } from 'react'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Heading, Text } from 'components/Typography'
import { useRouter } from 'next/router'
import videos from 'constants/videos'
import { MdPlayCircleOutline } from 'react-icons/md'
import * as S from './styles'
import { ActiveVideoModal } from '../../../pages/index-old'

export function Module2Video(props: ActiveVideoModal) {
  return (
    <S.Container id="section-id-video-2">
      <div className="relative-container">
        <S.TitleWrapper>
          <Heading color="primary">
            Um cartão de <br /> visita digital.
          </Heading>
          <Heading color="secondary" fontWeight="300">
            Inúmeras <br /> possibilidades.
          </Heading>
        </S.TitleWrapper>

        <S.VideoModal>
          <video src={videos.conceptual}></video>
          <button
            onClick={() => {
              props.setSelectedVideoSrc(videos.conceptual)
              props.videoModal.handleOpen()
            }}
          >
            <img src="/assets/play-icon.svg" alt="" />
          </button>
        </S.VideoModal>
      </div>
    </S.Container>
  )
}
