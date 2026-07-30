import styled from 'styled-components';

export const Header = styled.header`
  max-width: 100%;
  width: 100%;
  background: #E5E5E5;
`

export const HeaderContainer = styled.div`
  position: relative;
  margin: auto;
  max-width: 97%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.75rem;
  padding-bottom: 6rem;

  .divisionItensHeader{
    display: flex;
  }

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

  .previousVisitPanel{
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      color: #FF4C1C;
      font-size: 0.938rem;
      font-weight: 500;
      text-decoration: underline;

      cursor: pointer;
    }

   
  }

  .chevronIcon{
    transform: rotate(90deg);
    margin-right: 0.375rem;
    margin-left: 2.614rem;
  }

  @media (min-width: 500px){
    .textLink::after{
      content: 'Voltar para o painel de visitas';
    }
  }
  
  @media (max-width: 499px){
    .divisionItensHeader{
      margin-left: -35px;
    }

    .textLink::after{
      content: 'Painel de visitas';
    }

    .logo{
      display: none;
    }
  }

`

export const HeaderTitle = styled.div`
  font-size: 0.85rem;
  letter-spacing: 0.125rem;
  color: #909692;
`