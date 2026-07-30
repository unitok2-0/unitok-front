import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2.5rem;

  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 3rem;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 2rem;
  }
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
`;

export const Link = styled.a`
  display: grid;
  gap: 0.5rem;
  align-items: center;
  text-align: center;

  > div {
    padding: 0.5rem;
    display: grid;
    place-items: center;
    justify-self: center;
    border-radius: 9999px;
    color: white;
    background: ${(props) => props.theme.colors.secondary};
  }
`;

export const ProfileLinkContainer = styled(LinksContainer)`
  > * + * {
    margin-top: 1rem;
  }
`;

export const ProfileLinkBox = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
  width: 100%;

  border-radius: 10px;

  background: ${(props) => props.theme.colors.grayLight};

  @media (max-width: 798px) {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
