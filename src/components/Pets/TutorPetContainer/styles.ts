import styled from 'styled-components';

type PropsContainer = {
  isModalSos: boolean;
  isEditPetRoute: boolean;
  isOwner: boolean;
}



export const Container = styled.div<PropsContainer>`
  max-width: 1100px;
  width: 100%;

  display: grid;
  grid-template-columns: ${props => props.isModalSos ? '70px 2fr 100px' : props.isEditPetRoute && props.isOwner ? '70px 1fr 0.65fr 30px' : '70px 1fr 30px'};
  grid-gap: 12px;
  place-items: center;

  cursor: pointer;

  padding-bottom: 1rem;
  border-bottom: ${props => props.isModalSos ? 'none' : '1px solid #EFF2F2'};

  margin-top: 0.5rem;

  a {
    color: #FF4C1C;
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: underline;
  }
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
    font-weight: 300;
    color: #01302F;
    font-size: 0.9rem;
  }

  strong {
    font-size: 1rem;
  }
`

export const ButtonOpenModal = styled.div`

  height: 30px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const ButtonOpenPerfil = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #FF4C1C;
  text-decoration: underline;
  font-weight: 500;
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
