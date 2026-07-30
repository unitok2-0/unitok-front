import styled, { css, DefaultTheme } from 'styled-components';

export const EighthScreen = styled.div`
  padding: 11.25rem 0 10.625rem;

  h2 {
    margin-bottom: 4.375rem;
    text-align: center;
  }

  @media (max-width: 430px) {
    padding: 90px 2rem;

    h2 {
      margin-bottom: 30px;
      font-size: 37px
    }
  }
`;

export const EightScreenDiv = styled.div`
  max-width: 64.75rem;
  margin: 0 auto;
  position: relative;

  p {
    padding: 2.125rem 0;
  }

  .EighthScreenPlayIcon {
    cursor: pointer;
  }

  @media (max-width: 430px) {
    max-width: 302px;

    .questionResponseText {
      width: 100%;
    }

    p {
      width: 226px;
      padding: 20px 0;
    }
  }
`;

export const EightDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

interface EightScreenSpanProps {
  isLast?: boolean;
}

export const EightScreenSpan = styled.span<EightScreenSpanProps>`
  ${({
  isLast
}) => css`
    ${!isLast &&
  css`
        position: absolute;
        width: 100%;
        height: 1px;
        background: ${(props) => props.theme.colors.gray};
      `
  }
  `}
`;