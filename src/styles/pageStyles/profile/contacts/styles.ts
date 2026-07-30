import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-gap: 20px;
`

export const ButtonPagination = styled.button`
  padding-top: 2rem;
  border: none;
  background-color: transparent;

  font-weight: 500;
  color: #FF4C1C;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
  }
`

export const ContainerSelectAndEditContacts = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const EditButton = styled.button`
  border: none;
  background-color: transparent;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 1120px) {
    position: absolute;
    z-index: 99;

    top: 28px;
    right: 80px;
  }
`

export const ButtonSelectAllContacts = styled.button`
  border: none;
  background-color: transparent;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
`

type Props = {
  activeEdit: boolean;
}

export const ContainerButtonsExport = styled.div<Props>`
  visibility: ${props => props.activeEdit ? 'visible' : 'hidden'};
  height: ${props => props.activeEdit ? '70px' : '0px'};

  position: fixed;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;

  background-color: #EFF2F2;

  margin-left: -160px;
  bottom: 0;

  transition: all 0.4s;
  overflow: hidden;

  @media (max-width: 1120px) {
    margin-left: -30px;
  }
`

export const ButtonsExport = styled.button`
  margin-right: auto;

  position: relative;

  background-color: transparent;
  border: none;

  width: 100%;
  height: 100%;
  font-weight: 500;

  text-align: left;
  padding-left: 20%;
  margin: 0 10px;

  & > p:hover{
    color: #FF4C1C;
  }

  @media (max-width: 1410px) {
    &:nth-child(2) {
      padding-left: 0%;
    }
  }

  @media (max-width: 1120px) {
    text-align: center;
    &:nth-child(1) {
      padding-left: 0%;
    }
  }
`
