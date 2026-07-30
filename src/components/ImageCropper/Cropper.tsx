import Cropper from 'react-easy-crop';
import { useState } from 'react';

import * as S from './styles';

interface ImageCropperProps {
  yourImage: string;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}

const ImageCropper = ({
  yourImage,
  onCropComplete
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  return (
    <S.Container>
      <Cropper
        image={yourImage}
        crop={crop}
        zoom={zoom}
        aspect={4 / 2}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
      />
      <S.ButtonsArea>
        <button onClick={() => setZoom(current => current === 1 ? 1 : current - 0.5)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11115 15.2223C12.0385 15.2223 15.2223 12.0385 15.2223 8.11115C15.2223 4.18377 12.0385 1 8.11115 1C4.18377 1 1 4.18377 1 8.11115C1 12.0385 4.18377 15.2223 8.11115 15.2223Z" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 17L13.1333 13.1333" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.44434 8.11133H10.7777" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={() => setZoom(current => current + 0.5)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11115 15.2223C12.0385 15.2223 15.2223 12.0385 15.2223 8.11115C15.2223 4.18377 12.0385 1 8.11115 1C4.18377 1 1 4.18377 1 8.11115C1 12.0385 4.18377 15.2223 8.11115 15.2223Z" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 17L13.1333 13.1333" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.11133 5.44434V10.7777" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.44434 8.11133H10.7777" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </S.ButtonsArea>
    </S.Container>
  )
}

export default ImageCropper;