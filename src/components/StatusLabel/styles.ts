import styled from "styled-components";

export type WrapperProps = {
  isActive: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;

  span.circle {
    height: 10px;
    width: 10px;
    border-radius: 9999px;

    background: ${(props) =>
      props.theme.colors[props.isActive ? "success" : "error"]};
  }

  > * + * {
    margin-left: 0.5rem;
  }
`;
