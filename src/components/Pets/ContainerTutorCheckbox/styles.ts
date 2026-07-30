import styled from 'styled-components';

export const DataTutor = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 30px 70px 1fr 30px;
  grid-gap: 10px;
  place-items: center;

  cursor: pointer;

  padding-bottom: 1rem;
  border-bottom: 1px solid #EFF2F2;

  margin-bottom: 2rem;
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

type CheckboxProps = {
  isDisabled: boolean;
}

export const Checkbox = styled.div<CheckboxProps>`
  width: 20px;
  height: 21px;
  border: 1px solid #FF4C1C;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"]{
    opacity: ${props => props.isDisabled ? '0.5' : '1'};
    position: relative;
    width: 20px;
    height: 19px;
    outline: none;
    -webkit-appearance: none;
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked[type="checkbox"]{
    opacity: ${props => props.isDisabled ? '1' : '1'};
    background-color: #FF4C1C;
    cursor: pointer;
  }

`