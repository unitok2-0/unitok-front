import styled from 'styled-components';

export const ButtonDownloadSheetContainer = styled.label `
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  max-width: 19.313rem;
  width: 100%;

  height: 2.5rem;
  border-radius: 40px;

  background: #FF4C1C;
  color: #FFFF;
  border: none;

  font-weight: normal;

  &:hover{
    background: #D14018;
  }

  .buttonDownloadExcel{
    background-color: transparent;
    color: #FFFFFF;
    border: none;
    font-size: 0.9rem;
    padding-right: 2rem;
  }

  @media (max-width: 630px){
    .buttonDownloadExcel{
      padding-right: 1rem;
      padding-left: 0;
    }
  }

  @media (max-width: 433px){
    display: none;
  }
`

export const ButtonDownloadSheetContainerSquare = styled.label `
  display: none;

  position: fixed;
  bottom: 0;

  align-items: center;
  text-align: center;
  justify-content: center;

  max-width: 100%;
  width: 100%;

  height: 3.5rem;

  background: #FF4C1C;
  color: #FFFF;
  border: none;

  font-weight: normal;

  &:hover{
    background: #D14018;
  }

  .buttonDownloadExcel{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #FFFFFF;
    border: none;
    font-size: 0.9rem;
    padding-left: 2.188rem;
    padding-right: 2rem;
  }

  div{
    font-size: 0.9rem;
    padding-left: 2.188rem;
    padding-right: 2rem;
  }

  @media (max-width: 433px){
    display: flex;
  }
`