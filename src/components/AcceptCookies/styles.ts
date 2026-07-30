import styled, { css } from "styled-components";

export const AcceptCookieDiv = styled.div`
  width: 33.125rem;
  height: 14.125rem;
  padding: 2.5rem;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${(props) => props.theme.colors.white};

  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;

  z-index: 7;

  @media (max-width: 880px) {
    width: 96%;
    right: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 462px) {
    width: 100%;
    height: 18rem;
    bottom: 0;
  }
`;

export const AcceptCookieButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 462px) {
    width: 100%;
    height: 6rem;
    bottom: 0;

    flex-direction: column;
    align-items: start;

    .AcceptCookieButton {
      width: 100%;
    }
  }
`;