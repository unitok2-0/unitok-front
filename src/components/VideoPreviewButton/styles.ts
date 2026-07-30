import styled from "styled-components";

export const Wrapper = styled.button`
  position: relative;
  display: grid;
  background: none;
  border: 0;

  color: white;
  min-height: 20rem;

  img {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  padding: 1rem 1.25rem 0.5rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(255, 76, 28, 0) 42.19%,
    #ff4c1c 100%
  ); ;
`;
