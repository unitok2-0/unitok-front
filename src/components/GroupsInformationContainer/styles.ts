import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
`

export const Flex = styled.button`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #FAFAFA;
  width: 100%;
`

export const HeaderGroups = styled.div`
  display: flex;
  justify-content: space-between;
  background: #FAFAFA;
  align-items: center;
  gap: 1rem;
`

export const EditGroupModal = styled.div`
  background: #FFF;
  width: 16rem;
  position: absolute;
  left: 90%;
  top: 0;
  transform: translateX(calc(-100%));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  gap: 2.75rem;
  z-index: 999;
  border-radius: 10px;

  p {
    font-weight: 500;
  }

  @media (max-width: 380px){
    width: 16rem;
    top: -40px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 500;
  }
`
export const EditGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  background: #80808052;
`
