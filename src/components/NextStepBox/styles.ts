import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.white};

  justify-content: flex-end;

  @media (max-width: 1120px) {
    flex-direction: column;
    position: fixed;
    z-index: 100;

    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem 2rem;
  }
`;

export const SubTotalBox = styled.div`
  display: none;

  @media (max-width: 1120px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;
