import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  max-width: max-content;

  .donutchart {
    width: 100%;
    height: 100%;
  }
`;

export const InnerContent = styled.div`
  position: absolute;
  height: 70%;
  width: 70%;
  border-radius: 9999px;
  background: white;
  top: 50%;
  left: 50%;
  padding: 2rem;
  gap: 1rem;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: center;

  transform: translate(-50%, -50%);
`;
