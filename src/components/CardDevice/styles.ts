import styled from 'styled-components';

type Props = {
  blocked: boolean;
  index: number;
  lastChildren?: boolean;
}

export const Container = styled.div<Props>`
  border-bottom: ${props => props.lastChildren ? 'none' : '1px solid #EFF2F2'};
  padding: 2rem 0rem;

  display: grid;
  grid-template-columns: 1fr 23px;
  justify-content: space-between;
  place-items: center;

  .image-and-name{
    opacity: ${props => props.blocked ? '0.3' : '1'};
    width: 100%;
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    margin-bottom: 1.8rem;

    height: 17px;

    img{
      max-width: 50px;
      max-height: 56px;
      width: 100%;
    }
  }

  .name{
    opacity: ${props => props.blocked ? '0.3' : '1'};
    font-size: 0.875rem;
    margin-left: 1.5rem;
    max-width: 85%;
  }

  .button{
    position: relative;
    background-color: transparent;
    border: none;
    height: 25px;
    cursor: pointer;
  }

`
