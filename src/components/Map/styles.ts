import styled from 'styled-components';

export const MapContainer = styled.div`
  height: 40vh;
  max-height: 400px;
  max-width: 400px;
  width: 100%;

    @media (max-height: 680px) {
      height: 35vh;
    }

    @media (max-height: 600px) {
      height: 25vh;
    }
`
