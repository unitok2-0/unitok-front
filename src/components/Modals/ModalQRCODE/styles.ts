import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2.9rem;
  max-width: 22.5rem;

  text-align: center;

  button{
    position: absolute;
    right: 14px;
    top: -1rem;
    transform: translateY(-100%);
    color: #FF4C1C;
    text-decoration: underline;
    font-size: 1.1rem;
    font-weight: 600;
  }

  > * + * {
    margin-top: 2.5rem;
  }
`;
