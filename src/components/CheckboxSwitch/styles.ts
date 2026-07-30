import styled from 'styled-components';

export const Container = styled.div`
`

export const Switch = styled.input`
  position: relative;
  width: 40px;
  height: 25px;
  -webkit-appearance: none;
  background-color: #c6c6c6;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0,0,0,.2);
  cursor: pointer;

  &:checked{
    background-color: #FF4C1C;
  }

  &::before {
    content: '';
    position: absolute;
    margin-top: 1.5px;
    width: 21px;
    height: 21px;
    border-radius: 20px;
    top: 0;
    left: 3px;
    background-color: #FFFFFF;
    transition: .2s;
    box-sizing: 0 2px 5px rgba(0,0,0, .2);
  }

  &:checked::before{
    left: 17px;
  }

`