import styled from 'styled-components';

type Props = {
  openModal: boolean;
}

export const TableContainer = styled.div`
  padding-bottom: 40px;
  width: 100%;

  .overflowX{
    overflow-x: scroll;
    
    &::-webkit-scrollbar {
      height: 6px;              
    }

    &::-webkit-scrollbar-track {
      background: #EFF2F2;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #FF4C1C; 
      border-radius: 20px;    
      border: 1px solid #FF4C1C; 
    }
  }

  .table{
    padding-top: 4rem;
    width: 100%;

    thead{
      tr{
        th{
          text-align: center;
          padding-bottom: 1.125rem;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
    }

    tbody{
      tr{
        td{
          text-align: center;
          font-size: 0.75rem;
          padding: 1.563rem 0;
          border-top: 0.125rem solid #EFF2F2;
        }
      }
    }

    @media (max-width: 800px){
      width: 800px;
    }
  }
`

export const ActionsSheetContainer = styled.div`
  max-width: 90%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

  @media (max-width: 433px){
    align-items: center;
  }
`

export const FilterDataGroup = styled.div<Props>`
  display: flex;
  align-items: center;

  .filterTitle{
    font-size: 0.938rem;
    font-weight: 500;
    color: #FF4C1C;
    cursor: pointer;

    &:hover{
      color: #D14018;
    } 
  }

  .chevronIcon{
    color: #FF4C1C;
    margin-left: 0.313rem;
    cursor: pointer;

    transition: all 0.5s;

    transform: ${props => props.openModal ? 'rotate(180deg)' : 'rotate(0deg)'}
  }

  @media (max-width: 430px){
    padding-bottom: 1.5rem;
  }
`

