import styled, { css } from "styled-components";
import { Colors } from "styles/Colors";

export const MainContainer = styled.main`
  max-width: 490px;
  padding: 0 1.75rem 6rem;

  @media (max-width: 1119px) {
    width: 100%;
    padding: 0 0 6rem;
    margin: 0 auto;
  }

  @media (max-width: 540px) {
    padding: 0 0 6rem;
    margin: 0 auto;
  }
`;

export const UserImage = styled.div`
  margin-top: 3.25rem;
  margin-bottom: 2.875rem;
  max-width: max-content;

  display: flex;
  flex-direction: row;
  align-items: center;

  .buttonsImageProfile {
    margin-left: 1.7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  }
`;

export const Form = styled.form`
  > * + * {
    margin-top: 2.875rem;
  }

  @media (max-width: 1119px) {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  @media (max-width: 540px) {
    width: 100%;

    .profileEditSubmitButton {
      width: 100%;
      height: 40px;
    }
  }
`;

export const IconsContainer = styled.div`
  width: 100%;

  .addButton {
    margin-top: 1.875rem;

    @media (max-width: 460px) {
      width: 100%;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 6px;
    }
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const ColorContainer = styled.div`
  width: 19rem;
  

  .react-colorful__hue{
    height: 20px;
  }

  @media(max-width: 430px){
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
  }
`;

export const ColorExample = styled.div`
  width: 100%;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
`;

/* PÁGINA PRINCIPAL */

export const Main = styled.main`
  padding-bottom: 6rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  max-width: 87.5rem;
  margin: 0 auto;
  padding: 1rem;
  @media (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
    align-items: center !important;
  }
`;

export const Block = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 1rem;
  @media (max-width: 720px) {
    align-items: center;
  }
  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  .alterText {
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 1rem;
    margin-bottom: 10px;
  }
  span {
    font-weight: 300;
    font-size: 0.9rem;
  }
  > div {
    margin: 0.4rem 0rem;
  }
`;

export const SpanLinkText = styled.span`
  font-weight: 300;
  font-size: 0.9 !important;
  margin-right: 0.75rem;
`;
export const PreLinkText = styled.pre`
  font-weight: 300 !important;
  font-family: "Roboto";
  margin-right: 0.75rem;
  font-size: 0.875rem;
`;

export const InLine = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 1rem;
  width: 100%;
  max-width: 30rem;
  margin-top: 0.4rem;
`;

export const styleContainerAvatar = css`
  z-index: 1;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 30rem;
  padding: 0.8rem;
  margin-top: 2rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);
`;

export const ContentColors = styled.div`
  margin-top: 6rem !important;
  margin-bottom: 3rem !important;
  @media (max-width: 720px) {
    margin-top: 2rem !important;
  }
`;

export const ResponsiveDrawer = styled.div`
  @media (max-width: 980px) {
    display: none;
  }
`;

export const CheckboxContainer = styled.div`
  margin-top: 1.8rem !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    margin-right: 1rem;
    margin-left: 0.6rem;
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    transform: scale(1.5);
  }
  input:focus {
    outline: 1px solid ${Colors.primary} !important;
  }
`;

export const ContainerAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const ContentAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h4 {
    padding-bottom: 5px;
    margin-left: 1rem;
    margin-right: 4px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.profileColor || Colors.primary};
  }
`;

export const VideoPreviewButtonsContainer = styled.nav`
  display: grid;

  gap: 1.5rem;

  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translate(100%, 100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`;

export const SelectInputWrapper = styled.div`
  
`
