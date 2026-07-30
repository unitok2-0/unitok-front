import styled, { css } from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .modalEditIcon {
    width: 32px;
    height: 32px;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    margin-bottom: 46px;
  }

  .modalProfileEditSubmitButton {
    margin: 25% auto 0;
  }

  .modalProfileDeleteButton {
    margin: 1.8rem auto;
    margin-bottom: 0rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.375rem;
    }
  }
`;

export const CloseButtonStyles = css`
  position: absolute;
  top: 3rem;
  right: 2.4rem;
  /* transform: translate(0%,-100%);  */
  z-index: 1000;
`