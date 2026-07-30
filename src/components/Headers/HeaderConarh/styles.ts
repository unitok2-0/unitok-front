import styled from 'styled-components';


export const Container = styled.header`
  padding: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
  .d-flex{
    display: flex;
    align-items: center;

    @media(max-width: 500px){
      width: 100%;
      justify-content: space-between;
      .event-name{
        order: -1;
        margin: 0;
      }
    }

  }

  .event-name{
    margin-left: 30px;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0.07rem;
    color: #909692;
  }

  .unitok-logo{
    max-width: 139px;
    cursor: pointer;

    @media(max-width: 500px){
      display: none;
    }
  }
`