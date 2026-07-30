import styled from "styled-components";

export const Wrapper = styled.ol`
  display: grid;
  gap: 1rem;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    > * + * {
      margin-left: 0.75rem;
    }
  }

  .circle {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 9999px;

    background: ${(props) => props.theme.colors.primary};
  }
`;
