import styled from 'styled-components';

export const Container = styled.div`
  width: 16rem;
  height: 9.45rem;
  background-color: #FFFFFFFF;

  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (min-width: 1600px){
    width: 15rem;
    height: 9.375rem;
  }
`
export const ContainerText = styled.div`
  padding: 1rem;
  font-size: 0.85rem;
  font-weight: 400;
  text-align: start;
  color: #01302F;
  letter-spacing: -2%;
  line-height: 22px;

  
`