import styled from 'styled-components';

export const TableContainer = styled.div`
  padding-bottom: 150px;
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