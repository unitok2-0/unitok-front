import styled from 'styled-components';

export const Container = styled.div`
  .react-colorful {
    width: 340px;
    height: 180px;
  }
  .react-colorful__hue {
    height: 20px;
  }

  @media(max-width: 430px){
    justify-content: center;
    display: flex;
    .react-colorful{
      width: 70vw;
    }
  }
`;
