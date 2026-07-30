import styled from 'styled-components';

export const Container = styled.div`
  font-feature-settings: 'ss01' on;
`

export const Quantities = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const TotalLeads = styled.span`
  @media(max-width: 543px) {
    padding-bottom: 16px;
  }

  @media(max-width: 397px) {
    padding-bottom: 40px;
  }
`

export const QuantitiesBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    font-weight: 400;
    margin-bottom: 2.5rem;
    font-size: 1rem; 
  }

  small {
    font-size: 0.8rem;
    color: #909692;
    margin-bottom: 2.3rem;
    height: 2rem;
  }

  button {
    width: fit-content;
  }
`

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    display: flex;
    font-size: 5rem;
    margin-right: 1rem;
    font-weight: 100; 
  }
`

export const SortContent = styled.div`
  display: flex;
  max-width: 24rem;
  margin-bottom: 3rem;
`