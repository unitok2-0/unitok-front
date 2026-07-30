import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  width: 100%;

  display: grid;
  grid-template-columns: 70px 1fr 30px;
  grid-gap: 10px;
  place-items: center;

  cursor: pointer;

  padding-bottom: 1rem;
  border-bottom: 1px solid #EFF2F2;
  margin-top: 20px;
`

type ImgContainerProps = {
  img_src: string;
}

export const ImgContainer = styled.div<ImgContainerProps>`
  width: 5rem;
  height: 5rem;

  background: ${props => `no-repeat center url("${props.img_src}")`};
  background-size: cover;

  border-radius: 50%;
  border: 3px solid #FFF;
`

export const Name = styled.div`
  width: 100%;
  margin-left: 20px;
  text-align: left;


  p{
    padding-top: 0.3rem;
    font-weight: 300;
    color: #01302F;
    font-size: 0.9rem;
  }

  strong {
    font-size: 1rem;
    display: flex;
  }

  @media (max-width: 345px){
    strong{
      flex-direction: column;
    }
  }

`

export const ButtonOpenModal = styled.div`
  position: absolute;
  right: 0;

  height: 30px;
  border: none;
`

export const ContactMenu = styled.div`
  background: #FFF;
  width: 22.5rem;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% + -20px));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  gap: 2.75rem;

  button{
    background: none;
    border: none;
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    font-weight: 500;
  }

`

export const ParentComponent = styled.div`
  background-color: #FF4C1C;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80px;
  width: 100%;
  font-size: 13px;
  margin-left: 10px;
  height: 24px;
  font-weight: 500;

  @media (max-width: 345px){
    margin-left: 0;
  }
`

export const ContainerRelative = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 20px;
  place-items: center;
`
