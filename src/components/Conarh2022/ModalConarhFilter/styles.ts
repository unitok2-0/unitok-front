import styled from 'styled-components';

type Props = {
  openModal?: boolean;
}

export const ModalFilterContainer = styled.div<Props>`
  visibility: ${props => props.openModal ? 'visibility' : 'hidden'};
  height: ${props => props.openModal ? '8.313rem' : '0px'};

  transition: all 0.3s;
  overflow-y: hidden;

  padding: 5px 10px;

  position: absolute;
  width: 9rem;
  top: 2.125rem;

  background: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 999;

  div{
    color: #01302F;
    font-size: 0.938rem;
    font-weight: 400;
    margin-bottom: 0.563rem;
    cursor: pointer;
    border-radius: 10px;

    &:hover{
      background-color: #F9FAFA;
    }
  }
`