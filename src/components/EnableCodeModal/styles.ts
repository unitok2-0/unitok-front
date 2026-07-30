import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  text-align: center;
  gap: 3rem;

  padding: 2.5rem;
`;

export const CodeContainter = styled.div`
  padding: 1.25rem;
  display: flex;
  align-items: center;

  border-radius: 10px;
  background: ${(props) => props.theme.colors.grayLight};

  > * + * {
    margin-left: 1.25rem;
  }
`;
