import styled, { css } from 'styled-components';



export const Container = styled.div`
  height: 10rem;
  width: 100%;
  background-color: #EFF2F2;
  border-radius: 8px;
  position: relative;
  .absolute-div{
    position: absolute;
    right: 16px;
    top: -10%;
    display: grid;
    gap: 12px;
  }

  .background-image{
    display: block;
    margin: 0 auto;
    transform: scale(1.5);
  }

  .background-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`

export const ButtonStyles = css`
  padding: 11.25px;

`

interface BannerContainerProps {
  background_url?: string;
}

export const BannerContainer = styled.div<BannerContainerProps>`
border-radius: 8px;
  background: ${props => `url("${props.background_url}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`