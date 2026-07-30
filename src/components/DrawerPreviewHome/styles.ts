import styled from 'styled-components';
import { Colors } from '../../styles/Colors';

export const Container = styled.div`
`;

export const Drawer = styled.div`
  width: 400px;
  position: absolute;
  top: 9rem;
  left: -420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  background: ${Colors.white};
  border-radius: 16px;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35);
  /* height: 100vh; */
  min-height: 100vh;
  transition: 0.5s;
  z-index: 1000;

  >button{
    margin-left: 12px;
  }
`;
