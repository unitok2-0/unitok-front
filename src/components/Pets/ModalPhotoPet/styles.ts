import Slider from 'react-slick';
import ReactPlayer from 'react-player'
import styled from 'styled-components';

export const MainModal = styled.main`
  height: 38.5rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 500px) {
    width: 360px;
  }

  @media (max-width: 425px) {
    height: 45vh;
    width: 300px;
  }
`
type SquarePhotoProps = {
  image: string;
}

export const SquarePhoto = styled.div<SquarePhotoProps>`
  @media (max-width: 425px) {
    height: 45vh;
    width: 300px;
  }

  height: 38.5rem;
  width: 100%;
  max-width: 30rem;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const StyledSlider = styled(Slider)`
  width: 101%;
  height: 100%;
  margin: 0;
  padding: 0;


.slick-list {
  width: 100%;
  height: 100%;
}

//dots
.slick-dots li button ::before{
  font-size: 8px;
  color: #D9D9D9;
}

.slick-dots .slick-active button ::before{
  color: #FF4C1C;
}

//arrows
.slick-prev, .slick-next {
  z-index: 1;
  font-family: none;
  font-size: 40px;
}

.slick-prev {
  content: '>';
  margin-left: 75px;
  font-size: 20px;
  width: 40px;
  height: 40px;
}

.slick-arrow {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  display: flex;
}

.slick-next {
  background-image: url(/assets/icon_next_arrow.svg);
  margin-right: -10px;
}

.slick-prev {
  background-image: url(/assets/icon_prev_arrow.svg);
  margin-left: -10px;
}

.slick-arrow::before {
  font-size: 0;
}
`

export const VideoButton = styled.button`
  position: absolute;
  z-index: 999;
  top: 31%;
  margin-left: 13.5rem;

  @media (max-width: 425px) {
    top: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-50%);
  }
`
export const VideoContainer = styled.div`
  cursor: pointer;
  position: relative;

  @media (max-width: 425px) {
    height: 45vh;
    width: 100vw;

    video {
      object-fit: cover;
    }  
  }
`
