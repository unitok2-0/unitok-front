import styled from "styled-components";

export const Wrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  > * + * {
    margin-left: 0.8rem;
  }
`;

export const InputDiv = styled.div`
  display: grid;
  place-items: center;
`;

export const Input = styled.input`
  appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
