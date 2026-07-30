import styled, { css } from "styled-components";

export const Container = styled.div`
  min-width: 456px;
  max-width: 456px;
  border-radius: 10px;
  background: #FFFFFF;
  text-align: center;
  padding: 2.5rem;


  .close_button{
    background: none;
    border: none;
    position: absolute;
    right: 5px;
    top: 0;
    transform: translateY(-150%);
    color: #FF4C1C;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid #FF4C1C;
  }

  img{
    display: block;
    margin: 0 auto;
  }

  h2{
    margin-top: 7px;
  }

  p{
    margin-top: 30px;
    margin-bottom: 48px;
  }

  .buttons-container{
    display: grid;
    place-items: center;
    gap: 2rem;

    button{
      max-width: 302px;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100vw;
    border-radius: 0;
    padding: 1.8rem;
  }
`;



export const ButtonStyles = css`
  border: none;
`