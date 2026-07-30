import styled, { css, CSSProp } from 'styled-components'

interface WrapperProps {
  isGroupView?: boolean;
  isAddGroupView?: boolean;
  isReportViews?: boolean;
  isReportLeads?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  font-weight: 400;
  display: grid;
  grid-template-columns: 1fr 12fr 11fr 24px;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid #EFF2F2;
  border-bottom: 1px solid #EFF2F2;
`

export const Checkbox = styled.div`
  width: 20px;
  height: 21px;
  border: 1px solid #FF4C1C;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"]{
    position: relative;
    width: 17px;
    height: 18px;
    outline: none;
    -webkit-appearance: none;
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked[type="checkbox"]{
    background-color: #FF4C1C;
    cursor: pointer;
  }
`

export const ButtonOpenModal = styled.div`

  height: 30px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
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
export const EditGroupModal = styled.div`
  background: #FFF;
  width: 16rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
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