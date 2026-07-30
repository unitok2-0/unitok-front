import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.secondary};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 12rem);
  margin: 0 auto;
  padding: 0 1rem;
  color: white;
`;
