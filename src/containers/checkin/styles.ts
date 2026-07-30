import styled from 'styled-components';
import { Colors } from 'styles/Colors';



interface ContainerProps {
  withoutPadding?: boolean;
}

export const Container = styled.section<ContainerProps>`
  height: 100vh;
  background: #EFEFEF;
  padding: ${props => props.withoutPadding ? '0' : '0.8rem 1.8rem 0.5rem'};
  text-align: center;
  display: flex;
  flex-direction: column;

  .title{
    text-transform: uppercase;
    color: #909692;
    letter-spacing: 0.3rem;
  }

  .arrow-back {
    border:0;
    background: transparent;
    width: fit-content;
    height: fit-content;
    align-self: flex-start;
    position: absolute;
    top:30px;
    left:30px;

    > svg {
      font-size:32px;
      cursor: pointer;
      color:#FF4C1C;


      &:active {
        color: #909692;
      }
    }
  }
`

export const Content = styled.div`
  margin: 0 auto;
`