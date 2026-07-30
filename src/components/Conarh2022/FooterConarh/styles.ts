import styled, { CSSProp } from 'styled-components';

type Props = {
  activeFixed: boolean;
  styleProps: CSSProp;
}

export const Footer = styled.footer<Props>`
  width: 100%;
  
  display: flex;
  justify-content: center;

  background-color: #FFFFFF; 
  padding-top: 1.25rem;
  padding-bottom: 0.625rem;

  position: ${props => props.activeFixed ? 'fixed' : 'block'};
  bottom: 0;

  img{
    width: 170px;
  }

  @media (max-width: 433px){
    /* argin-top: ${props => props.activeFixed ? '-100px' : '-50px'}; */
    position: static;
  }

  ${props => props.styleProps};
`