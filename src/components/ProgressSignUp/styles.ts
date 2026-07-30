import styled from 'styled-components';
import { Colors } from '../../styles/Colors';

type CircleStageProps = {
  isCurrentStage: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 42rem;
`;

export const Stage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  span{
    color: ${Colors.white};
    font-weight: bold;
    font-size: 1.2rem;
  }

  p{
    color: ${Colors.black};
    margin-top: 0.5rem;
    font-weight: 500!important;
  }
`;

export const CircleStage = styled.div<CircleStageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  background: ${({ isCurrentStage }) =>
    isCurrentStage ? Colors.primary : Colors.gray300
  };
`;

export const Bar = styled.div`
  display: flex;
  flex: 1;
  height: 2px;
  margin: 0px 1rem;
  margin-top: 30px;
  width: max-content;
  background: ${Colors.gray300};

  @media (max-width: 330px) {
    margin: 0px 0.25rem;
    background: transparent;
  }
`;