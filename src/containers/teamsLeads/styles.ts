import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @media(max-width: 640px) {
    padding-bottom: 2rem;
    justify-content: center;
  }
`

export const ResponsiveStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;

  @media (max-width: 1120px) {
    flex-direction: column;
    align-items: stretch;

    > * + * {
      margin-top: 1.5rem;
    }
  }
`;

type ViewButtonProps = {
  isActive: boolean;
}

export const ContainerBottomFixed = styled.div<ViewButtonProps>`
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

export const BottomFixedButton = styled.button`
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

export const Input = styled.input`
  &[type="radio"] {
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

  &[type="radio"]::before { 
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: #FF4C1C;
  }

  &[type="radio"]:checked::before {
    transform: scale(1);
    border-color: #FF4C1C;
  }

  &[type="radio"]:checked {
    border-color: #FF4C1C;
  }
`