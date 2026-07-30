import styled, { css } from 'styled-components'

export const Flex = styled.div`
  display: flex;
  margin-top: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
`
interface HeaderTable {
  typeView?: 'leads' | 'views' | 'no-report';
}

export const HeaderTable = styled.div<HeaderTable>`
  display: grid;
  grid-template-columns: 1fr 5.7fr 4fr 4.5fr;
  margin-top: 4.25rem;
  gap: 1rem;
  border-bottom: 1px solid #EFF2F2;
  padding-bottom: 1rem;

 ${({ typeView }) => typeView !== 'no-report' ? css`
  width: 95%;
  grid-template-columns: 10.5fr 10fr;
  gap: 1rem;
  padding-left: 2rem;

  @media(max-width: 450px) {
    grid-template-columns: 13fr 10fr;
    margin-bottom: 0;
  }
` : css`
  @media(max-width: 450px) {
      grid-template-columns: 1fr 10fr 4fr 4.5fr;
      margin-bottom: 0;
    }
`}
`

export const ContentContainer = styled.div<HeaderTable>`
${({typeView}) => (typeView === 'leads' || typeView === 'views') ? css`
  max-height: 300px;
  margin-bottom: 12rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 4px;
    margin-left: 1rem;
  }

  @media(max-height: 668px) {
    max-height: 200px;
  }
  @media(max-height: 568px) {
    max-height: 100px;
  }
`: 
``}
`

interface CheckboxProps {
  isActiveSelectedAllUsers?: boolean;
}

export const Checkbox = styled.div`
  input[type="checkbox"] {
  cursor: pointer;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: #FF4C1C;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid #909692;
  border-radius: 50%;
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  background-color: #FF4C1C;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
  border-color: #FF4C1C;
}

input[type="checkbox"]:checked {
  border-color: #FF4C1C;
}
`

interface ViewButtonProps {
  isActive: boolean;
}

export const ContainerButtonsOptions = styled.div<ViewButtonProps>`
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  height: ${props => props.isActive ? '70px' : '0px'};

  position: fixed;
  min-width: 100vw;
  margin-left: -200px;

  display: flex;
  justify-content: center;

  background-color: #EFF2F2;

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

  height: 100%;
  font-weight: 500;

  text-align: left;
  margin: 0 2.5rem;

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
