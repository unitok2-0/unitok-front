import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContainerCarrossel = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 98%;
`

export const Title = styled.h3`
  text-align: center;
  padding-bottom: 3.5rem;
  font-size: 1.25rem;
  color: #FF4C1C;
  font-weight: 500;
`

export const ToggleCarousel = styled.div`
  display: none;

  @media (max-width: 1037px){
    display: block;
  }
`
export const ToggleStaticIcons = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 30px;

  @media (max-width: 1037px){
    display: none;
  }
`