import { createGlobalStyle } from "styled-components";
import { Colors } from "./Colors";

import "react-toastify/dist/ReactToastify.css";

export const GlobalStyle = createGlobalStyle`
  #nprogress .bar {
    background: ${(props) => props.theme.colors.primary};
  }

  :root{
    --background: #444;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body {
    position: relative;
    overflow-x: hidden;
  }

  /* @media (max-width: 2780px){
    html{
      font-size: 1vw;
    }
  } */

  @media (max-width: 1080px){
    html{
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px){
    html{
      font-size: 87.5%;
    }
  }

  body{
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  body,input, textarea, select, button{
    font: ${(props) => props.theme.fonts.bodyMd};
    color: ${(props) => props.theme.colors.secondary};
    outline: none;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${Colors.gray300};
    }
  
    &::-webkit-scrollbar-track {
      margin-right: 10px;
      border: 3px solid transparent;
      border-radius: 10px;
      width: 50px; 
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${Colors.gray800}; 
      border-radius: 10px;
      width: 50px; 
    }
  }

  input::placeholder { 
    color: ${Colors.gray300};
    font-weight: 300;
    font-size: 0.9rem;
  }

  input{
    color: ${Colors.gray900};
  }

  button, a{
    cursor: pointer;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

   /* Due a bug envolving react-phone-input-2 styles injection and Next */
  .react-tel-input {
    width: 100%;
  }

  input.form-control {
    padding: 0 !important;
  }

  .light-custom-scrollbar {
    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.grayLight};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray};
    }
  }

  .white-custom-scrollbar {
    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.white};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray};
    }
  }

  .orange-custom-scrollbar {
    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.white};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;
