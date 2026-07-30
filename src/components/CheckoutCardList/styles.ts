import styled from 'styled-components';
import { Colors } from '../../styles/Colors'

export const Container = styled.div`
  width: 100%;

  border: 1px solid ${Colors.gray300};
  border-radius: 15px;
  padding: 0.5rem 2rem;
`;

export const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1.5rem 0;

  @media (max-width: 440px) {
    > div:first-of-type {
      display: none;
    }

    section {
      margin-left: 0px;
    }
  }
`;

export const CardInfo = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin-left: 1.5rem;

  strong {
    margin-bottom: 6px;
    font-weight: 500;
  }

  span {
    color: ${Colors.primary};
    font-weight: bold;
  }
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 1rem;
    cursor: pointer;
  }
`;