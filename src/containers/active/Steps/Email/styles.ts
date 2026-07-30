import styled from 'styled-components'
import { Colors } from 'styles/Colors';

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateY(100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`;

export const InputsWrapper = styled.div`
width: 100%;
  .input-name-container{
    width: 100%;
    margin-bottom: 2.5rem;
  }
`
