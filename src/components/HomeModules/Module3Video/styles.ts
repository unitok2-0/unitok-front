import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from "framer-motion"
import { Colors } from 'styles/Colors';

export const Container = styled.div`
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background: #EFEFEF;
  padding: 4rem;
  padding-bottom: 20rem;
  text-align: center;

  .video{
    display: block;
    margin: 0 auto;
    margin-top: 4rem;
    width: 60%;
    height: 35rem;
    background: url("images/preview_video2.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    display:grid;
    place-items:center;

    button{
      background: #FF4C1C;
      border:none;
      border-radius: 50%;
      width: 6.4rem;
      height: 6.4rem;
      display: grid;
      place-items:center;

     
      img{
        width: 1.3rem;
        transition: transform 0.3s;
        transform: translateX(5px) rotate(0deg);
      }

      &:hover{
        img{
          transform: translateX(4px) scale(1.2);
        }
      }
    }

  }


  .title-wrapper{
    margin-top: 10rem;
    position: relative;
    z-index: 2;
    h2{
      font-size: 4rem;
      line-height: 5rem;
      z-index: 700;
      font-weight: 700;
      

      span{
        color: ${Colors.primaryGreen};
        font-weight: 300;
      }
    }
  }


  @media(max-width: 900px){
    display: grid;
    place-items:center;
    gap: 2rem;
    padding: 2rem;
    .video{
      width: 100%;
      height: 13rem;
      
    }
  }
  @media(max-width: 430px){
    min-height: 50vh;
    padding-bottom: 8rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;

    .title-wrapper{
      h2{
        line-height: 2.8rem;
        font-size: 2.4rem; 
      }
    }
    .video{
      margin-top: 0;
      button{
        width: 4rem;
        height: 4rem;
        img{
          width: 1rem;
        }
      }
    }

  }
`;