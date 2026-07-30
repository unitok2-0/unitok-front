import styled, { css } from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`

export const OptionContainer = styled.div`
  width: 20rem;
  height: 14.375rem;
  border: 1px solid #C4C4C4;
  border-radius: 0.625rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

export const Text = styled.h2`
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  color: #383D3B;
`

interface BannerContainerProps {
  background_url?: string;
}

export const BannerContainer = styled.div<BannerContainerProps>`
  width: 7.1875rem;
  height: 7.1875rem;
  border-radius: 9999px;
  /* background: ${props => `url("${props.background_url}")`}; */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const ButtonsLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
`

interface FlexProps {
  margin?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: ${props => props.margin ? props.margin : 0};
`

export const ButtonStyles = css`
  padding: 11.25px;
`
export const ColorExample = styled.div`
  width: 40%;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
`;
