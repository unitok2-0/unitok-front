import styled, { css } from 'styled-components';
import { Colors } from '../../Colors';

export const BannerContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`

interface ContentStyle {
  profileColor?: string,
}

interface ButtonPrimaryProps {
  colorBackground?: string
}

export const Main = styled.main`
  
`;

export const Content = styled.div<ContentStyle>`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 2rem;

  h1{
    text-align: center;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.5rem;
    margin-top: 0.5rem;
    color: ${Colors.black};
  }

  p{
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: ${Colors.black}
  }

  span{
    text-align: center;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.2rem;
    margin-top: 0.5rem;
    color: ${Colors.black}
  }
`;

export const styleContainerAvatar = css`
  margin-top: -4rem;
  z-index: 1;
`;

export const BoxPrimary = styled.section`
  /* display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 1rem;
  grid-row-gap: 0.6rem; */

  display: flex;
  flex-direction: column;

  margin-top: 1.7rem;
  margin-bottom: 1.8rem;
  width: 100%;
  max-width: 22rem;
`
export const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  gap: 1rem;
  margin-bottom: 0.7rem;
`


export const BoxSecundary = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  grid-row-gap:0.6rem;
  margin-top: 0.8rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 22rem;
`


export const ButtonPrimaryColorStyle = css<ButtonPrimaryProps>`
  width: 100%;
  padding: 1rem 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
  border: 1px solid ${({ colorBackground }) => {
    return colorBackground
  }};
  position: relative;
  transition: all 0.30s ease-in-out;
  background: ${({ colorBackground }) => {
    return colorBackground
  }};
  
  &:hover{
    transform: translateX(6px) translateY(-1px) ;
    border: 1px solid ${({ colorBackground }) => colorBackground}
  }
`;

export const ButtonWhiteStyle = css<ButtonPrimaryProps>`
  width: 100%;
  background: ${Colors.white};
  color: ${Colors.black};
  padding: 0.9rem 2rem;
  border: 1px solid ${Colors.gray300};
  position: relative;
  transition: all 0.30s ease-in-out;
  
  &:hover{
    transform: translateX(8px) translateY(-1px) ;
    border: 1px solid ${({ colorBackground }) => (colorBackground)}
  }
`;

export const ImageFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
  svg{
    width: 8rem;
  }
`
export const DescriptionModoOffline = styled.h5`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  text-align: center;
`