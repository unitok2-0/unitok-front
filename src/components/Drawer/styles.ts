import styled from 'styled-components';
import { Colors } from '../../styles/Colors';

export const Container = styled.div`
    /* width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    z-index: -1; */
    /* height: 100vh; */
`;

export const Drawer = styled.div`
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  /* right: -300px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  background: ${Colors.secundary};
  height: 100vh;
  transition: 0.5s;
  z-index: 1000;

  >button{
    margin-left: 12px;
  }
`;
