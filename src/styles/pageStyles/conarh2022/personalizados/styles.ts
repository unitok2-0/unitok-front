import styled from 'styled-components';



export const Container = styled.section`
  min-height: 100vh;
  background-color: #EFF2F2;
  padding-bottom: 4rem;
`

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 32px 30px;
  .title{
    color: #909692;
    margin-left: 30px;
    font-size: 15px;
  }
  z-index: 5;

  @media (max-width: 1060px) {
    justify-content: space-between;
    .title{
      margin-left: 0;
    }
  }
`

export const Content = styled.section`
  padding-top: 5rem;
  position: relative;
  min-height: 100vh;
  z-index: 100;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  .card-container{
    img{
      max-width: 600px;
    }
  }

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
    padding-top: 8rem;
    .card-container{
      img{
        max-width: 360px;
      }
    }
  }
  @media (max-width: 480px) {
    min-height: 80vh;
    .card-container{
      margin: 0 auto;
      img{
        max-width: 300px;
        width: 100%;
      }
    }
  }
`

export const ClipPath = styled.div`
  background-repeat: no-repeat;
  background-image: url(/assets/subtract.svg);
  background-position: left center;
  background-size: cover;
  height: 140vh;
  width: 45vw;
  position: absolute;
  left: 0;
  top: -10%;

  @media (max-width: 1060px) {
    width: 100vw;
    height: 70vh;
    top: -20%;
    background-image: url(/assets/subtract_mobile.svg);
  }
  @media (max-width: 750px) {
    width: 100vw;
    height: 70vw;
    top: -20%;
    background-image: url(/assets/subtract_mobile.svg);
  }
  @media (max-width: 560px) {
    top: 0;
  }
`