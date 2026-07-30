import styled, { css, CSSProp, DefaultTheme } from "styled-components";

interface DashboardSidebarButtonStyle {
  isSelected?: boolean;
}

export const Container = styled.a<DashboardSidebarButtonStyle>`
  ${({ isSelected }) => css`
    border: none;
    background: none;
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.secondary};

    ${isSelected &&
    css`
      background: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.primary};
    `}
  `}
`;

export const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.h1`
  font: ${(props) => props.theme.fonts.titleXs};
  margin-left: 20px;
  max-width: 230px;
  flex: 1;
`;
