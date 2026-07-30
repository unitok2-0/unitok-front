import styled, { css } from "styled-components";

interface WrapperProps {
  removePadding?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`

  width: 100vw;
  height: 100vh;

  display: grid;
  place-items: center;

`;
