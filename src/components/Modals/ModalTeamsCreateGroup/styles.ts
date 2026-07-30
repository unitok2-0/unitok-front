import styled from 'styled-components';
import { Colors } from 'styles/Colors';

export const Wrapper = styled.div`
  width: 47.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #FAFAFA;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  display: grid;
  gap: 1rem;
  z-index: 9;
  border-radius: 4px;
  padding: 0.5rem;

  @media(max-width: 768px) {
    width: 25rem;
  }
`

export const ButtonContainer = styled.button`
  max-width: 20rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1.5rem;
`

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 3px solid #fff;
  padding: 1.5rem;
`

export const ButtonCreate = styled.button`
  color: ${Colors.orange};
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const UserListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem 1rem;
`
