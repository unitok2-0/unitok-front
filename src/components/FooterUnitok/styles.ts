import styled from 'styled-components'
import { Colors } from '../../styles/Colors';

export const FooterContainer = styled.footer`
  position: relative;
  z-index: 5;
  min-height: 376px;
  background-color: #01302F;
  display: flex;
  justify-content: space-between;
  padding: 3.75rem 5rem;
 

  @media (max-width: 780px) {
    padding: 30px;
    padding-top: 60px;
    display: block;

    div + div{
      margin-top: 6rem;
    }
  }
`;


export const LeftContainer = styled.div`
  

  p{
    margin-top: 2.5rem;
  }

  .links{
    margin-top: 4.12rem;
    a{
      color: #FFF;
      display: block;
      text-decoration: underline;
    }

    a + a{
      margin-top: 1rem;
    }

    @media (max-width: 780px) {
      display: none;
    }
  }
`

export const RightContainer = styled.div`
  .links{
    display: none;
  }
  min-width: 200px;
  display: flex;
  flex-direction: column;
  p:nth-child(2){
    margin-top: 0.6rem;
    margin-bottom: 1.8rem;
  }

  a{
    color: #FFF;
    display: block;
    font-weight: 500;
  }

  .social-icons{
    flex: 1;
    display: flex;
    align-items: flex-end;
    a + a{
      margin-left: 1rem;
    }
  }

  @media (max-width: 780px) {
    .links{
      display: block;
    }
    .social-icons{
      margin-top: 2rem;
    }
  }
`
