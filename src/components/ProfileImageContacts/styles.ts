import styled from 'styled-components';

export const Container = styled.div`

/*   left: 50%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  transform: translateY(-40%);  */
  display: flex;
  align-items: center;
  flex-direction: column;

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
    font-weight: 500;
    font-size: 1.25rem;
    padding-top: 0.7rem;
  }

  .userCompany{
    padding: 0.4rem 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: #383D3B;
  }

  .userJob{
    color: #909692;
    font-weight: 400;
    font-size: 0.875rem;
  }

`
