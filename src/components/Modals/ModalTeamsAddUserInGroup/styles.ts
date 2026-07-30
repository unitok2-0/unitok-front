import styled from 'styled-components';

export const Form = styled.form`
  width: 26rem;
  max-height: 38rem;
  position: fixed;
  padding: 1rem 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;

  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  display: grid;
  gap: 1rem;
  place-items: center;
  z-index: 9;
  border-radius: 4px;

  @media(max-width: 768px) {
    width: 25rem;
  }
`
export const Section = styled.section`
  width: 100%;
  padding: 1.5rem;
`

export const Checkbox = styled.div`
  width: 20px;
  height: 21px;
  border: 1px solid #909692;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:checked {
    border: 1px solid #FF4C1C;
  }

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

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #EFF2F2;
`
