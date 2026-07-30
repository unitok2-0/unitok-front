import styled from "styled-components";

export type WrapperProps = {
  gridTemplateColumns?: string;
};

export const Wrapper = styled.table<WrapperProps>`
  width: 100%;
  min-width: 35rem;
  text-align: start;

  thead {
    display: block;
  }

  th {
    text-align: start;
    font-weight: 500;
  }

  tr {
    display: grid;
    align-items: center;
    grid-template-columns: ${(props) =>
      props.gridTemplateColumns || "repeat(auto-fit, minmax(4rem, 1fr));"};
    border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
    padding: 1rem 0;
  }
`;
