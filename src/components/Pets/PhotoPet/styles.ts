import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  position: relative;
`;

export const PhotoPet = styled(Image)`
  max-width: 90px;
  width: 100%;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`

export const VideoPet = styled.div`
  position: relative;
  max-width: 90px;
  width: 100%;
  height: 90px;

  video {
    max-width: 7rem;
    width: 100%;
    height: 90px;
    border-radius: 10px;
    object-fit: cover;
  }
`

export const IconDelete = styled.img`
  position: absolute;
  right: -10px;
  top: -8px;
  cursor: pointer;
`
