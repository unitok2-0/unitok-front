import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  width: 46.75rem;
`;

export const Thead = styled.thead`

`;

export const Th = styled.th`
  padding: 0.9375rem 0;
  text-align: start;
`;

export const Tbody = styled.tbody`

`;

export const Tr = styled.tr`

`;

export const Td = styled.td`
  padding: 1.5rem 0;
  border-bottom: 1px solid #EFF2F2;
  
  div {
    display: flex;
    
    img {
      margin-right: 0.625rem;
    }
  }

  .qrUnderscore {
    width: 6.625rem;
    border: 1px solid ${(props) => props.theme.colors.secondary};
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .underscore {
    width: 4.625rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;