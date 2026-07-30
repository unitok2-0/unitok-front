import styled from 'styled-components';

type Props = {
  openModal: boolean;
}

export const Container = styled.div<Props>`
z-index: 10;
  padding: 20px;
  /* display: ${props => props.openModal ? 'grid' : 'none'}; */
  display: grid;
  visibility: ${props => props.openModal ? 'visible' : 'hidden'};

  transition: all 0.3s ease-in-out;
  overflow: hidden;

  background-color: #FFFFFF;
  border-radius: 10px 10px 0px 0px;

  position: fixed;
  left: 0;
  bottom: 0;

  width: 100vw;
  height: ${props => props.openModal ? ' 23.438rem' : '0'};

  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  justify-content: center;
  align-items: center;
`
export const Title = styled.h3`
  font-weight: 500;
  text-align: center;
`
export const Paragraph = styled.p`
  text-align: center;
`

export const Buttons = styled.div`
  display: grid;
  grid-gap: 10px;
`