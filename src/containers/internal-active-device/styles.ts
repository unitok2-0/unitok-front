import styled from 'styled-components';

type IContainerProps = {
  backgroundColor?: string
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${(props) => props.backgroundColor ? props.backgroundColor : props.theme.colors.secondary};

  .fullWidth {
    width: 90%;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100%;
`;  

export const Header = styled.header`
  width: 100%;
  max-width: 36rem;
  position: relative;
  min-height: 7rem;

  #logo {
    position: absolute;
    top: 2rem;
    left: 1rem;
  }

  #back {
    position: absolute;
    top: 2rem;
    right: 1rem;
  }

  #optional-img {
    width: 100%;
    max-height: 290px;
  }
`;

export const Title = styled.h2`
  font: ${(props) => props.theme.fonts.titleSm};
  color: ${(props) => props.theme.colors.white};
`;

export const Text = styled.p`
  font: ${(props) => props.theme.fonts.bodyMd};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

export const ButtonBack = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  color: #FF4C1C;
`;

export const Logo = styled.img`
  width: 4.5rem;
  height: 3rem;
`;