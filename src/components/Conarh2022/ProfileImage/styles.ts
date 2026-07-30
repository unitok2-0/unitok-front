import styled from 'styled-components';

type Props = {
  isEvent: boolean
}

export const Container = styled.div<Props>`

  left: 50%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  transform: ${props => props.isEvent ? 'translateY(-40%)' : 'translateY(-30%);'};

  .imageUser {
    width: 115px;
    height: 115px;

    clip-path: circle();
    position: relative;
    overflow: hidden;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .userName{
    font-size: 1.25rem;
    font-weight: 500;
    padding-top: 0.625rem;
  }

  .userNiche{
    margin-top: 5px;
    font-size: 15px;
    color: #909692;
  }

`