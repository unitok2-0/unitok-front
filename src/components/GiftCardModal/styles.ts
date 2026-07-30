import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  background: #FFFFFF;
  text-align: center;
  padding: 2.5rem 1.8rem;


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
  }

  .promocode_container{
    background: transparent;
    padding: 14px;
    border-radius: 10px;
  }
`;



export const ButtonStyles = css`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`