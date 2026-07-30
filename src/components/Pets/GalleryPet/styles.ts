import styled from 'styled-components';

export const MainContainerPhotoPet = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 15px;
  place-items: center;
  grid-template-columns: repeat(4, 96px);

  @media (max-width: 425px) {
    grid-template-columns: repeat(3, 94px);
  }

  .buttonUpdatedLoading{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #FF4C1C;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ButtonAddImagePet = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
`