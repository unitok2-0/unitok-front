import styled, { css } from "styled-components";

export const InformationUser = styled.div`
  position: absolute;

  width: 31.25rem;
  height: 100%;

  bottom: -9.5rem;
  right: 50%;
  left: 50%;

  margin-left: -15.688rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`


export const SendImageInputStyles = css`
  width: 12.188rem;
  font-size: 0.938rem;
  height: 2.5rem;
  margin-bottom: 0.875rem;
  margin-top: 1.5rem;
  position: relative;
  input{
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
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