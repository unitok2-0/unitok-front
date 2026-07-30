import { Text } from "components/Typography";
import styled from "styled-components";
import Background from '/public/assets/clipPatchBg.svg';


export const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;

  padding-top: 3rem;
`;

export const ClipPath = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -10;

  background: ${(props) => props.theme.colors.grayLight};
  display: none;

  ::before {
    content: "";
    flex: 1;
    height: 100%;
    background: white;
    clip-path: circle(90% at right);
    padding-left: 250px;
  }

  @media (max-width: 1120px) {
    display: flex;
    flex-direction: column;

    ::before {
      clip-path: circle(60% at bottom);
      padding-left: 0;
      max-height: 100vh;
      padding-top: 700px;
    }

    ::after {
      content: "";
      flex: 10;
      background: white;
    }
  }
`;

export const CLipPathDesktop = styled.div`
  background-image: url("/assets/clipPatchBg.svg");
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
  height: 110vh;
  width: 50vw;
  position: absolute;
  z-index: -5;
  left: 0;
  top: 0;

  @media(max-width: 1120px){
    display: none;
  }
`

export const Main = styled.main`
  max-width: 90rem;
  padding: 2rem;
  margin: 0 auto;
  display: grid;
  align-items: start;
  grid-template-columns: 7fr 3fr;
  gap: 4rem;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    gap: 6rem;
  }
`;

export const Cards = styled.div`
  display: flex;
  > * + * {
    margin-left: 2rem;
  }

  @media (max-width: 1120px) {
    flex-direction: column;

    > * + * {
      margin-left: 0;
      margin-top: 6rem;
    }
  }
`;

export const CardAsideContainer = styled.div`
  display: grid;
  gap: 1.5rem;

  a {
    justify-self: start;
  }

  @media (max-width: 1120px) {
    > a {
      order: -1;
    }
  }
`;

export const CardAside = styled.aside`
  display: flex;
  max-width: 100%;

  flex-direction: column;

  > * + * {
    margin-top: 1rem;
  }

  @media (max-width: 1120px) {
    flex-direction: row;

    > * + * {
      margin-left: 1.75rem;
      margin-top: 0;
    }

    height: 10rem;
    align-items: center;
    max-width: 93vw;
    margin-right: -12vw;
    padding: 0 1rem;
    overflow-x: scroll;

    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.grayLight};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray};
    }
  }
`;

export const CardHighLight = styled.aside`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 70%;
  }

  @media (max-width: 1120px) {
    > div {
      width: 90%;
    }
  }
`;

export const RightSide = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* min-height: 100%; */

  > * + * {
    margin-top: 3rem;
  }
`;

export const CardData = styled.div`
  display: grid;
  gap: 2rem;
`;

export const CardName = styled.h1`
  font: ${(props) => props.theme.fonts.titleMd};

  span {
    font-weight: lighter;
  }
`;

export const CardInputs = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  }
`;

export const CardInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ColorDotsHStack = styled.div`
  display: flex;
  > * + * {
    margin-left: 1rem;
  }
`;

export const PersonalizationBox = styled.div`
  width: 100%;

  margin-top: 1rem;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.grayLighter};
`;

export const Personalization = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.white};
  width: 100%;

  padding: 2rem;
  display: grid;
  gap: 2rem;
`;

export const AddNameOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
`;
export const CartInfoBox = styled.div`
  display: grid;
  gap: 2rem;
`;

export const PersonaliaztionUpload = styled.div`
  display: grid;
  gap: 3rem;

  p {
    margin-bottom: 1rem;
  }
`;

export const NumberDot = styled(Text)`
  display: grid;
  place-items: center;
  font-weight: 500;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${(props) => props.theme.colors.grayLight};
`;
