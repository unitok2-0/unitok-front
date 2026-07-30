import styled, { CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';

type ButtonStyleProp = {
  styleProp: CSSProp
}

export const Container = styled.button<ButtonStyleProp>`
  background-color: #FF4C1C;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: fixed;
  right: 1rem;
  bottom: 2rem;
  z-index: 6;
  transition: 0.25s;
  a{
    width: 25px;
    height: 25px;
  }
  img{
    animation: wiggle 1.25s infinite;
    width: 100%;
  }
  p{
    position: absolute;
    left: 0;
    top: 50%;
    white-space: nowrap;
    opacity: 0;
    transform: translate(-105%, -50%);
    color: #fff;
    font-weight: 400;
    transition: opacity 0.25s;
    visibility: hidden;
  }

  &:hover{
    background-color: #D14018;
    p{
      visibility: visible;
      opacity: 1;
    }
  }
  
  @keyframes wiggle {
  0% {
    transform: rotate(-2deg);
  }
  20% {
    transform: rotate(6deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  60% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0);
  }
}

  ${props => props.styleProp};


`;
