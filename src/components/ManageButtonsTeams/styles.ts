import styled, { css } from 'styled-components'
import { Colors } from 'styles/Colors';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateY(100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`

export const ToggleButtonsContainer = styled.div`
  display: grid;
  gap: 1.625rem;
`

export const Checkbox = styled.div`
  width: 20px;
  height: 21px;
  border: 1px solid #FF4C1C;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"]{
    position: relative;
    width: 17px;
    height: 18px;
    outline: none;
    -webkit-appearance: none;
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked[type="checkbox"]{
    background-color: #FF4C1C;
    cursor: pointer;
  }
`

export const Icon = styled.span`
width: 36px;
height: 36px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  color: white;
  background: ${Colors.primaryGreen};
  margin-right: 0.5rem;
  margin-left: 0.6rem;
  .icon{
    width: 14px;
    margin: 0 0.10rem;
  }
`

interface SocialButtonsProps {
  hidden?: boolean;
}

export const SocialButtons = styled.div<SocialButtonsProps>`
  max-width: 30rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #EFF2F2;
  ${({ hidden }) => hidden && css`
    opacity: 50%;
  `}
`
