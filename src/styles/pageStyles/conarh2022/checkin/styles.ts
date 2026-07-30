import styled, { css } from 'styled-components';


export const ContainerCheckin = styled.div`
  height: 100vh;
  background: #efefef;
`

export const Container = styled.div`
  margin: 0 auto;
  width: 95%;

  height: 93%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .title{
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    color: #909692;
    font-weight: 400;
  }

  .center {
    display: flex;
    align-items: center;
  }
`
export const ContainerProfile = styled.div`
  margin-top:-50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .userName{
    font-size: 1.25rem;
    font-weight: 500;
    padding-top: 0.625rem;
  }

  .userNiche{
    margin-top: 5px;
    font-size: 15px;
    color: #909692;
  }
`

interface ProfileImageProps {
  img_src: string;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 7.2rem;
  min-height: 7.2rem;
  clip-path: circle();
  background-image: url(${props => props.img_src});
  background-size: cover;
  background-position: center;

`

export const ContainerButtonIcon = styled.div`
  position: relative;
  max-width: 24rem;
  width: 100%;
`

export const ButtonSuccess = css`
  background-color: #2AC087;
  width: 100%;
  font-size: 0.938rem;
  height: 2.5rem;
  border: 1px solid #2AC087;
  cursor: auto;

  span{
    display: grid;
    gap:0.7rem;
    cursor: auto;
  }

  .iconCheckin{
    margin-top: 5px;
  }

  &:hover{background-color: #2AC087;}
  &:disabled{opacity: 1}
`

export const WarningText = styled.div`
  text-align: center;
  padding-top: 10px;
  font-size: 0.8rem;
`