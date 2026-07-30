import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-gap: 15px;

  max-width: 28rem;
  width: 100%;

  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
`

type ContainerButtonProps = {
  isActive: boolean;
}

export const ContainerButton = styled.div<ContainerButtonProps>`
  width: 23rem;

  display: grid; 
  grid-template-columns: 50px 1fr 80px 50px;
  height: 70px;
  place-items: center;
  grid-gap: 10px;

  border-bottom: 1px solid #EFF2F2;
  padding-bottom: 0.8rem;

  &:nth-last-child(1){
    border-bottom: none;
  }

  .icon{
    opacity: ${props => props.isActive ? '1' : '0.3'};
  }

  .name{
    opacity: ${props => props.isActive ? '1' : '0.3'};
    text-align: left;
    width: 100%;
    height: 50%;
    font-size: 1.1rem;
  }

  .toggleActive{
    text-decoration: underline;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    color: ${props => props.isActive ? '#01302F' : '#FF4C1C'};
  }

  .iconEdit{
    background-color: transparent;
    border: none;

    opacity: ${props => props.isActive ? '1' : '0.3'};
    cursor: ${props => props.isActive ? 'pointer' : 'default'};

    width: 28px;
    height: 28px;

    img{
      width: 100%;
    }

  }

`