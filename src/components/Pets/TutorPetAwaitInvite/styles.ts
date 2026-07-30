import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  width: 100%;

  display: grid;
  grid-template-columns: 70px 1fr 30px;
  grid-gap: 10px;
  place-items: center;

  opacity: 0.6;

  padding-bottom: 1rem;
  border-bottom: 1px solid #eff2f2;

  margin-top: 0.5rem;
`;

type ImgContainerProps = {
  img_src: string;
};

export const ImgContainer = styled.div`
  width: 5rem;
  height: 5rem;
  clip-path: circle();

  img {
    width: 100%;
    clip-path: circle();
  }

  border: 3px solid #fff;
`;

export const Name = styled.div`
  width: 100%;
  margin-left: 20px;
  text-align: left;

  p {
    padding-top: 0.3rem;
    font-weight: 300;
    color: #01302f;
    font-size: 0.9rem;
  }

  strong {
    font-size: 1rem;
  }
`;

export const ButtonOpenModal = styled.div`
  height: 30px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ButtonOpenPerfil = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #ff4c1c;
  text-decoration: underline;
  font-weight: 500;
`;

export const ContactMenu = styled.div`
  background: #fff;
  width: 22.5rem;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% + -20px));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  gap: 2.75rem;

  button {
    background: none;
    border: none;
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    font-weight: 500;
  }
`;
