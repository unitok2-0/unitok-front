import styled, { css, CSSProp } from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
`

interface FlexProps {
  extendStyles?: CSSProp;
}

export const Flex = styled.button<FlexProps>`
  display: flex;
  align-items: center;

  ${({ extendStyles }) => css`
      ${extendStyles}
  ` 
}`

export const MembersModal = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  padding: 1.3rem;
  background: #FAFAFA;
`

export const EditGroupModal = styled.div`
  background: #FFF;
  width: 16rem;
  position: absolute;
  left: 90%;
  top: 0;
  transform: translate(calc(-100%), 30%);
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
  }

  button {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 500;
  }
`

export const Backdrop = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`
