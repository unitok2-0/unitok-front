import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

interface ColorBannerProps {
  background_url: string;
}

export const ColorBanner = styled.div<ColorBannerProps>`
  position: relative;
  min-height: 12.5rem;
  background-color: #F9FAFA;
  color: white;

  > * + * {
    margin-left: 2rem;
  }

  .banner{
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    background: ${props => `url("${props.background_url}")`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Content = styled.div`
  position: relative;
  top: -3.75rem;
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;

  > * + * {
    margin-top: 2rem;
  }

  @media (max-width: 360px) {
    padding: 0 1rem;
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsGrid = styled.div`
  display: grid;
  gap: 0.875rem;
  padding-bottom: 1rem;
/*   grid-template-columns: 1fr 1fr; */


  /* section{
    display: flex;
    flex-direction: row;
    gap: 0.9rem
  } */

/*   button:first-child {
    grid-column: 1 /-1;
  } */


  /* @media (max-width: 413px) {
    grid-template-columns: 1fr;
  } */
`;

export const NormalButtonsGrid = styled.div`
  > div {
    display: grid;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};

    :first-child {
      padding-top: 0;
    }
  }
`;

export const SocialHighlightedButtonsGrid = styled.div`
  > div {
    display: grid;
  }
`;

export const HighlightButtonsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -1.5rem;
    column-gap: 1rem;
  > div {
    display: grid;
    padding: 1rem 0;

    & + & {
      padding: 0.3rem 0;
    }
  }
`;

export const Footer = styled.footer`
  display: grid;
  place-items: center;

  padding: 0.5rem 0;
`;
