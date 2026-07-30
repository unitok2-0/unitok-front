import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  font-feature-settings: 'ss01' on;

  @media (min-width: 1120px) {
    display: grid;
    align-items: start;
    grid-template-columns: 25rem 1fr;
  }

  @media (max-width: 720px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

export type ContentProps = { shouldDisablePadding?: boolean };

export const Content = styled.div<ContentProps>`
  position: relative;
  margin-bottom: 15rem;

  ${({ theme, shouldDisablePadding }) => css`
    ${!shouldDisablePadding &&
    css`
      padding: 5.75rem 7.5rem;

      @media (max-width: 1120px) {
        padding: 2rem;
      }
    `}
    h1 {
      margin-bottom: 4rem;
    }

    > section + section {
      margin-top: 6rem;
    }

    & > section {
      display: grid;
      gap: 2rem;
    }

    @media (max-width: 1120px) {
      h1 {
        margin-bottom: 2.5rem;
        font: ${theme.fonts.titleMdMobile};
        font-weight: 300;
      }
    }

    @media(max-width: 640px) {
      h1 {
        text-align: center;
      }
    }
  `}

  /* background: #f2f2; */
  width: 100%;
`;

export const InternManagamentHeaderContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;

  img {
    height: 5.5rem;
    width: 5.5rem;
    border-radius: 9999px;
    object-fit: cover;
  }

  > * + * {
    margin-left: 1.125rem;
  }
`;

export const UserAccountHeaderContent = styled.div`
  @media (min-width: 1120px) {
    padding: 0 1.5rem;
  }
`;

export const Sino = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  right: 80px;
  cursor: pointer;

  @media (max-width: 1118px) {
    top: 40px;
  }

  @media (max-width: 600px) {
    right: 40px;
  } */
`

export const NotificationsLength = styled.div`
  background-color: #FF4C1C;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  width: 18px;
  height: 20px;
  position: absolute;
  font-size: 13px;
  right: -6px;
  top: -10px;
`
export const ManageAccount = styled.div`
  width: 21.5rem;
  height: 5.25rem;
  background: #EFF2F2;
  box-shadow: 3px 12px 24px rgba(1, 48, 47, 0.2);
  border-radius: 10px;
`
