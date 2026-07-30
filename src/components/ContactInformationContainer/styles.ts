import styled from 'styled-components';

type Props = {
  activeEdit: boolean;
}

export const Container = styled.div<Props>`
  max-width: 1100px;
  width: 100%;

  display: grid;
  grid-template-columns: ${props => props.activeEdit ? '40px 70px 1fr 30px' : '70px 1fr 30px'};
  grid-gap: 10px;
  place-items: center;

  cursor: pointer;

  padding-bottom: 1rem;
  border-bottom: 1px solid #EFF2F2;
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

export const Checkbox = styled.div<Props>`
  width: 20px;
  height: 21px;
  border: 1px solid #FF4C1C;
  border-radius: 50%;

  display: ${props => props.activeEdit ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  input[type="checkbox"]{
    position: relative;
    width: 17px;
    height: 18px;
    outline: none;
    -webkit-appearance: none;
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked[type="checkbox"]{
    background-color: #FF4C1C;
    cursor: pointer;
  }

`