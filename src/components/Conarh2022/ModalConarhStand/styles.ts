import styled from 'styled-components';

type Props = {
  openModal: boolean;
}

export const Container = styled.div<Props>`
  display: ${props => props.openModal ? 'block' : 'none'};

  position: fixed;
  max-width: 45.875rem;
  width: 100%;
  height: 33.5rem;

  top: 50%;
  right: 50%;
  transform: translate(50%);

  margin-top: -16.75rem;
  background: #FFFF;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const ModalStandsContainer = styled.div`
  overflow-y: scroll;

  margin-right: 0.938rem;
  margin-top: 0.938rem;
  margin-bottom: 0.938rem;

  max-width: 45.400rem;
  width: 100%;

  height: 32rem;

  &::-webkit-scrollbar {
    width: 6px;              
  }

  &::-webkit-scrollbar-track {
    background: #EFF2F2;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #FF4C1C; 
    border-radius: 20px;    
    border: 1px solid #FF4C1C; 
  }

`

export const CloseModal = styled.div`
  position: absolute;
  top: -1.875rem;
  right: 0.625rem;
  color: #FF4C1C;
  text-decoration: underline;

  cursor: pointer;
  z-index: 999;
`

export const ModalStandsTitle = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 1.25rem;
  padding-top: 2.5rem;
`

export const Table = styled.table`
  margin: auto;
  position: relative;
  
  max-width: 90%;
  width: 100%;
  padding-top: 2.5rem;
`

export const TableHead = styled.thead`
`

export const Tr_Head = styled.tr`
`

export const Td_Head = styled.td`
  text-align: center;
  padding-bottom: 1.125rem;
  font-size: 0.75rem;
  font-weight: 500;
`

export const TableBody = styled.tbody`
`

export const Tr_Body = styled.tr`
  color: #6A736F;
`

export const Td_Body = styled.td`
  text-align: center;
  font-size: 0.75rem;
  padding: 1.563rem 0;

  border-top: 0.125rem solid #EFF2F2;
`