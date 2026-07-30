import styled from 'styled-components';

type Props = {
  isEvent: boolean;
}

export const Header = styled.header`

  background: #E5E5E5;
`

export const HeaderContainer = styled.div`
  position: relative;
  margin: auto;
  max-width: 1382px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.75rem;
  padding-bottom: 5.313rem;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  

  .headerIcons{
    display: flex;
    gap: 0.75rem;

    svg {
      font-size:25px;

      @media (max-width:500px){
        font-size:20px;
      }
    }
  }


  @media (max-width: 540px) {
    //Logo
  }
`

export const HeaderTitle = styled.div`
  font-size: 15px;
  color: #909692;
  position: absolute;
  letter-spacing: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
`

