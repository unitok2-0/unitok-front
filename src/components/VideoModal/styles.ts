import styled from "styled-components";

export const VideoModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 85vh;
  padding: 3rem 0;

  video {
    max-width: 100%;
    height: auto;

    @media (max-width: 1120px) {
      height: 100%;
    }

    @media (max-height: 768px) and (min-width: 768px) {
      height: 100%;
      width: 70%;
    }
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 15px;
  right: 0;
  font-weight: bold;
  
  background-color: transparent;
  color: #FF4C1C;
  text-decoration: underline;
  padding-bottom: 0.5rem;
  border: none;
`