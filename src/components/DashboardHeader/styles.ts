import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.75rem;
    background: ${theme.colors.grayLight};
    min-height: 100%;
    position: sticky;
    top: 0;

    > * + * {
      margin-top: 2rem;
    }

    @media (max-width: 1120px) {
      z-index: 9;
      min-height: max-content;
      padding: 1.125rem 1.75rem;
      width: 100%;
      &.open {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        min-height: 100vh;
      }
    }
  `}
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 720px) {
    margin-bottom: 0px;

    img{
      width: 5rem;
    }
  }

`;

export const Content = styled.div`
  display: grid;
  gap: 2rem;

  .label{
    color: #FF4C1C;
    font-size: 12px;
    margin-left: 18px;
  }

  @media (max-width: 1120px) {
    display: none;
    padding-bottom: 3.75rem;

    nav {
      margin: 0 -2rem;

      @media (max-height: 568px) {
        max-height: 22.5rem;
        padding-bottom: 15rem;
        overflow-y: visible;
      }

      > * {
        padding: 1rem 2rem;
        border-radius: 0;
      }
    }

    &.open {
      display: grid;
    }
  }
`;

export const HeadIcons = styled.div`
  display: flex;
  gap: 1.25rem;
`

export const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.secondary};

  @media (min-width: 1120px) {
    display: none;
  }
`;

export const Icon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const NotificationsLength = styled.div`
  background-color: #FF4C1C;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  width: 13px;
  height: 13px;
  position: absolute;
  font-size: 10px;
  right: -2px;
  top: -4px;
`
export const ManageAccount = styled.div`
  cursor: pointer;
  width: 21.5rem;
  height: 5.25rem;
  padding: 0.8rem 1rem;
  background: #EFF2F2;
  box-shadow: 3px 12px 24px rgba(1, 48, 47, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-top: -1.5rem;
  }

  p {
    font-size: 0.9375rem;
    font-weight: 500;
  }
`
