import styled from 'styled-components';

type PropsMainContainer = {
  isSelectedTutor: boolean;
}

export const MainContainer = styled.div<PropsMainContainer>`
  max-width: 450px;
  width: 100%;
  /* height: ${props => props.isSelectedTutor ? '581px' : '300px'}; */
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 1.5rem;

  display: grid;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #FF4C1C;
    border-radius: 20px;
    border: 3px solid #FFFFFF;
  }
`

export const DividerContainer = styled.div`
`
