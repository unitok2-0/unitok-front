import styled, { CSSProp, css } from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 15rem;
`

export const InputsContainer = styled.div`
  div, button {
    width: 21.625rem;
    margin: 4rem 0;
  }
`

export const HeaderTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 2.5rem;
  padding-bottom: 1rem;
`

interface FlexProps {
  styles?: CSSProp;
}
export const Flex = styled.div<FlexProps>`
 ${({ styles }) => css`
  ${styles}
 `}
`
