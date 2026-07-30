import styled from 'styled-components';

export const PrivacityContainer = styled.div`
  padding: 2rem 9rem;

  .PrivacityMiddleTextTerms {
    margin-bottom: 2rem;
  }

  @media (max-width: 1000px){
    padding: 2rem 4rem;
  }

  @media (max-width: 430px){
    padding: 2rem 28px;
  }
`;

export const PrivacyPrimaryColorText = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;