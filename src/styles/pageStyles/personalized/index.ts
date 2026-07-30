import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.grayLight};
`;

export const Container = styled.div`
  max-width: 80rem;
  padding: 2rem 2rem 10rem;
  margin: 0 auto;
`;

export const Hero = styled.div`
  text-align: center;
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding-top: 0;
  }

  > * + * {
    display: block;
    margin-top: 1.5rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  margin-top: 6rem;
  gap: 10rem;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    gap: 3.75rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 10px;

  padding: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 3.75rem;
  }
`;

export const CardImageBox = styled.div`
  max-width: 100%;
  position: relative;
  top: -10rem;

  img {
    display: block;

    max-width: 100%;
    margin-bottom: -10rem;
  }
`;

export const Center = styled.div`
  display: grid;
  justify-content: center;

  gap: 2rem;
`;

export const ColorsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #f9fafa;

  > div {
    display: flex;

    > * + * {
      margin-left: 1rem;
    }
  }
`;

export const personalizationWrapper = styled.div`
  &.disabled{
    display: none;
  }
`
