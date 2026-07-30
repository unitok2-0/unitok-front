import { getImageUrl } from "constants/functions";
import { useState } from "react";

import * as S from "./styles";
import ReactPlayer from "react-player";

type PlayVideoPetProps = {
  photo: any;
}

export function PlayVideoPet({ photo }: PlayVideoPetProps) {
  const [videoControl, setVideoControl] = useState(false);

  function isValidImageURL(str) {
    if (typeof str !== 'string') return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
  }

  return (
    isValidImageURL(photo?.location) ?
      <S.SquarePhoto
        key={photo?.key}
        src={getImageUrl(photo?.location)}
      />
      :
      <S.VideoContainer
        onClick={() => { setVideoControl(!videoControl); }}
      >
        {
          !videoControl && <S.VideoButton
          >
            <img src="/assets/icon_play_video.svg" alt="play/pause button"></img>
          </S.VideoButton>
        }

        <ReactPlayer
          playing={videoControl}
          url={getImageUrl(photo?.location)}
          width="100%"
          height="100%"
        />

      </S.VideoContainer>
  )
}