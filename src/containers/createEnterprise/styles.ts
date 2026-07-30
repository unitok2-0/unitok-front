import styled from 'styled-components'

interface TextProps {
  margin?: string
}

interface WrapperProps {
  columnDirection?: boolean;
  gap?: string;
}

export const Title = styled.h1<TextProps>`
  font-weight: 500;
  font-size: 20px;
  margin: ${props => props.margin ? props.margin : 0};
  text-align: center;

  @media(max-width: 640px) {
    font-size: 16px;
  }
`

export const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  justify-items: center;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

export const Flex = styled.div<WrapperProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => props.columnDirection ? 'column' : 'row'};
  gap: ${props => props.gap ? props.gap : 0};
`

interface FlexButtonContainerProps {
  margin?: string;
}

export const FlexButtonContainer = styled.div<FlexButtonContainerProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: ${props => props.margin ? props.margin : 0};

   @media (max-width: 640px) {
      margin: 3rem auto;
      button {
        width: 20rem;
      }
   }
`
export const Footer = styled.footer`
display: grid;
  place-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  padding: 0.5rem 0;
`;
