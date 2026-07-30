import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* > * + * {
    margin-left: 1.25rem;
  } */
`;

export const ButtonsGrid = styled.div`
  margin-top: 1.5rem;
  display: grid;
  gap: 0.5rem;
  > * {
    justify-self: stretch;
  }

  button {
    padding: 0 0rem;
    width: 144px;
    > span {
      display: unset !important;
      /* width: 120px; */
      position: relative;
    }

    label {
      position: absolute;
      top: -18px;
      left: -60px;
      width: 120px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 460px) {
    button {
      font-size: 12px;
    }
  }
`;

interface ImageContainerProps {
  img_src: string;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  height: 7.5rem;
  width: 7.5rem;
  margin: 0 auto;
  background: ${props => `no-repeat center url("${props.img_src}")`};
  background-size: cover;

  border-radius: 50%;
  border: 3px solid #FFF;

`;

export const EditGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  padding-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(255, 76, 28, 0) 42.19%,
    #ff4c1c 100%
  ); ;
`;


export const Banner = styled.div`
  height: 10rem;
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 8px;
`

export const ProfileAndButtons = styled.div`

  transform: translateY(-20%);
`
