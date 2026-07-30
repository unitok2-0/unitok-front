import styled, { css } from 'styled-components'

interface WrapperProps {
  isGroupView?: boolean;
  isAddGroupView?: boolean;
  typeView?: 'leads' | 'views' | 'no-report';
}

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: ${({ isGroupView }) => isGroupView ? '1fr 12fr 24px' : '0.5fr 0.5fr 2.4fr 2.3fr 2fr 24px'};
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #EFF2F2;

 ${({ typeView }) => typeView !== 'no-report' && css`
    width: 95%;
    grid-template-columns: 1fr 4rem 15fr 16fr 24px;
    gap: 1rem;
 `}

 ${({ isAddGroupView }) => isAddGroupView && css`
 grid-template-columns: 2fr 2fr 8fr;
 gap: 1rem;
 padding: 1rem 2rem;
`}
`

export const Checkbox = styled.div`
  input[type="checkbox"] {
  cursor: pointer;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: #FF4C1C;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid #909692;
  border-radius: 50%;
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  background-color: #FF4C1C;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
  border-color: #FF4C1C;
}

input[type="checkbox"]:checked {
  border-color: #FF4C1C;
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

export const Flex = styled.div`
  display: flex;
`
