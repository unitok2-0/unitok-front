import styled, { css } from "styled-components";

interface WrapperProps {
  removePadding?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  min-width: 525px;
  max-width: 525px;
  min-height: 387px;
  padding: ${props => props.removePadding ? "2.5rem 1rem" : "2.5rem"};
  padding-bottom: ${props => props.removePadding ? "0.5rem" : "2.5rem"};
  border-radius: 10px;
  
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: none;
    min-width: auto;
  }
`;

export const CropperWrapper = styled.div<WrapperProps>`
  width: 525px;
  min-height: 387px;
  padding: 2.5rem 1rem;
  border-radius: 10px;
  
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: none;
    min-width: auto;
    padding: 0px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  button {
    width: 80%;
  }
`

export const CloseButtonStyle = css`
  position: absolute;
  right: 1rem;
  top: 0;
  transform: translateY(-100%);
  @media (max-width: 600px){
    display: none;
  }
`

export const CloseButtonWithIcon = css`
  display: none;
  position: absolute;
  right: 1.8rem;
  top: 1.8rem;
  @media (max-width: 600px){
    display: block;
  }
`


export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px){
    margin-top: 5.5rem;
  }
`

interface SelectButtonProps {
  isActive?: boolean;
}

export const SelectButton = styled.button<SelectButtonProps>`
  border: none;
  background: none;
  position: relative;
  /* border-bottom: ${props => props.isActive ? `2px solid #01302F` : `1px solid #EFF2F2`}; */
  padding-bottom: 13px;
  color: ${props => props.isActive ? "#01302F" : "#909692"};
  font-weight: 500;
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.isActive ? "#01302F" : "#EFF2F2"};
    display: block;
    height: 2px;
    border-radius: 6px;
  }
`

export const Content = styled.div`
  margin-top: 2.5rem;
  .sizes-text{
    margin-top: 10px;
    font-size: 12px;
    color: #909692;
  }
  .search-input-container{
    margin-bottom: 1.2rem;
    border: 2px solid #E0E0DE;
    background-color: #F7F7F5;
    border-radius: 0.3rem;
    padding: 0.3rem .4rem;
  }
  .upload-file{
    display: block;
    width: 100%;
    color: #FF4C1C;
    border: 1.4px dashed #D0D4D1;
    height: 127px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;
    gap: 1.2rem;
  }
  .dropzone{
    cursor: pointer;
    height: 127px;
    border: 1.4px dashed #D0D4D1;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #FF4C1C;
    font-weight: 500;
    text-decoration: underline;
    p{
      margin-bottom: 14px;
    }
  }
`


export const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: .7rem;
  overflow-y: auto;
  max-height: 276px;
  padding-right: 0.5rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 80vh;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr 1fr;
  }
  &::-webkit-scrollbar {
    width: 6px;              
  }
  &::-webkit-scrollbar-track {
    background: #EFF2F2;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #FF4C1C; 
    border-radius: 20px;    
    border: 1px solid #FF4C1C; 
  }
`

interface ImageCardProps {
  img_url: string;
}

export const ImageCard = styled.div<ImageCardProps>`
  cursor: pointer;
  .preview{
    border-radius: 8px;
    width: 100%;
    min-height: 5rem;
    background: ${props => `url(${props.img_url})`};
    background-position: center;
    background-size: cover;
  }
  a{
    font-size: 10px;
    color: #909692;
    span{
      border-bottom: 2px solid #909692;
    }
  }
`


export const UploadButtonStyle = css`
  background: none;
  color: #FF4C1C;
  border: 1.4px dashed #D0D4D1;
  height: 127px;
  border-radius: 10px;
  &:hover{
    background: none;
    color: #FF4C1C;
    border: 1.4px dashed #D0D4D1;
  }
  label{
    text-decoration: underline;
  }
`

export const ContainerCropper = styled.div`
  background-color: #FFFFFF;
  width: 2rem;
  height: 2rem;
`