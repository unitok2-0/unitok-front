import styled, { css } from "styled-components";

type Props = {
  openModal: boolean;
}

export const ContentHStack = styled.div`
  @media (min-width: 1120px) {
    max-width: 60rem;
  }

  > * + * {
    margin-top: 5.75rem;
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
`

export const CheckBoxContainer = styled.div`
  margin-top: 1.875rem;

  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  max-width: 31.25rem;

  @media (max-width: 400px){
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`

export const CustomRadio = styled.div`
  input{
    display: none;
  }

  label{
    cursor: pointer;
    font-size: 0.875rem;
  }

  input + label::before {
   content: '';
   width: 18px;
   height: 18px;
   border-radius: 50%;
   background-color: white;
   border: 1px solid #01302F;
   display: inline-block;
   vertical-align: middle;
   margin-right: 8px;
   margin-bottom: 3px;
  }

  input:checked + label::before{
    /* background-color: #01302F;
    box-sizing: border-box;
    border: 5px solid #01302F;
    padding: 5px; */
    background-color: #01302F;

  }
`

export const ContainerInputs = styled.div`
  margin-top: 2.3rem;

  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 50px;

  max-width: 600px;
  width: 100%;


  .inputQuantity {
    grid-column: 1;
  }

  .inputOrderTitle {
    grid-column: 1/-1;
  }

  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }

`

export const PositionModalAbsolute = styled.div`
  position: absolute;

  @media (max-width: 400px){
    left: 60%;
    top: 100%;
  }
`

export const ActionsSheetContainer = styled.div`
  max-width: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

  .inputSearch{
    max-width: 350px;
    width: 100%;
  }

  .inputSearch::placeholder{
    color: #909692;
      opacity: 1;
  }

  @media (max-width: 550px){

    .inputSearch{
      max-width: 300px;
    }

    display: grid;
    grid-gap: 30px;

  }

  @media (max-width: 433px){
    flex-direction: column;
  }
`

export const FilterDataGroup = styled.div<Props>`
  display: flex;
  align-items: center;

  .filterTitle{
    font-size: 0.875rem;
    font-weight: 500;
    color: #FF4C1C;
    cursor: pointer;

    &:hover{
      color: #D14018;
    }
  }

  .chevronIcon{
    color: #FF4C1C;
    margin-left: 0.313rem;
    cursor: pointer;

    transition: all 0.5s;

    transform: ${props => props.openModal ? 'rotate(180deg)' : 'rotate(0deg)'}
  }

  @media (max-width: 430px){
    padding-bottom: 1.5rem;
  }
`

export const QrcodeWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;

  margin-top: 2rem;

  .controls{

    text-align: left;

    .qrcode-value{
      margin-top: 2rem;
    }
  }
`
