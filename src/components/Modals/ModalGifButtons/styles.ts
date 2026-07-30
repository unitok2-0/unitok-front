import styled from 'styled-components';

export const Container = styled.div`
  max-width: 350px;
  width: 100%;
  padding: 1.5rem;

  p {
    svg {
      display: inline;
      color: rgb(255, 76, 28);
      margin: 0 0.25rem;
    }
  }
`

export const VideoModalContent = styled.div`
  padding-top: 2rem;
  padding-bottom: 0;

  /* video {
    max-width: 100%;
    height: auto;

    @media (max-width: 1120px) {
      height: 100%;
    }

    @media (max-height: 768px) and (min-width: 768px) {
      height: 100%;
      width: 70%;
    }
  } */
`;