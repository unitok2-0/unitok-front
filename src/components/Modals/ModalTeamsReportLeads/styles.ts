import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  background: #FFF;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-40%);
  z-index: 9999;
  width: 63rem;
  height: 47rem;
  padding: 0 2rem;
  border-radius: 10px;

  .close_button{
    background: none;
    border: none;
    position: absolute;
    right: 5px;
    top: 0;
    transform: translateY(-150%);
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #FF4C1C;
    font-size: 15px;
    font-weight: 500;
  }

  @media(max-width: 1536px) {
    width: 50rem;
    height: 100%;
    max-height: 80vh;
  }

  @media(max-width: 800px) {
    width: 90%;
    height: 100vh;
    max-height: 80vh;
  }

  @media(max-height: 668px) {
    width: 90%;
    height: 80vh;
    max-height: 40rem;
  }
`

export const Backdrop = styled.div`
  background: #E5E5E5;
  cursor: pointer;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`

export const closeButton = css`
  position: absolute;
  top: 80rem;
  right: 10rem;
  color: #FF4C1C;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1.2rem;
`