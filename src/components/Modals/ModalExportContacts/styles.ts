import styled from 'styled-components';

type Props = {
  isOpenModal: boolean;
}

export const ModalContainer = styled.div<Props>`
  display: ${props => props.isOpenModal ? 'grid' : 'none'};

  position: absolute;
  bottom: 73px;
  z-index: 999;

  width: 20rem;
  height: 9.625rem;

  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0px 0px;

  background-color: #ffffff;

  justify-content: center;

  button{
    background-color: transparent;
    border: none;
    display: grid;
    grid-template-columns: 10px 1fr 10px;
    grid-gap: 20px;
    place-items: center;
    font-weight: 500;

    p{margin-top: -7px}
  }
`

