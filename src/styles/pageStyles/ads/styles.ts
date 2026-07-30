import styled from 'styled-components';



export const Container = styled.main`
  height: 100vh;
  text-align: center;
  .brand-name{
    margin-top: 8rem;
    font-weight: 500;
  }
  .product-name{
    margin-top: 1rem;
    font-weight: 400;
  }

  .video-container{
    margin-top: 8rem;
    position: relative; 
    padding-bottom: 56.25%; 
    padding-top: 30px; 
    overflow: hidden;
    cursor: default;

    @media (min-width: 768px){
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .video-container iframe, .video-container object, .video-container embed { 
    position: absolute;
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    cursor: default;
  }

  footer{
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-name::first-letter, .brand-name::first-letter{
    text-transform: uppercase;
  }
`

