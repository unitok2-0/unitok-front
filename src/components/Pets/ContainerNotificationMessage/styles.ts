import styled from 'styled-components';

type MainContainerProps = {
  notificationView: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
  display: grid;
  grid-template-columns: ${props => props.notificationView ? '70px 1fr 50px' : '10px 70px 1fr 50px'};
  grid-gap: 10px;
  align-items: center;
  place-items: center;
  border-bottom: 1px solid #EFF2F2;
  padding-top: 0.5rem;
  margin-right: 10px;
  transition: all 0.2s;
`

export const MessagesContainer = styled.div`
`

export const ImagePhoto = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  img{
    width: 70px;
    height: 60px;
    clip-path: circle();
  }
`

export const MessageBold = styled.p`
  font-size: 0.9rem;
  margin-top: -10px;
  color: #01302F;
  font-weight: 700;
`

export const MessagePreview = styled.p`
  font-size: 0.8rem;
  color: #01302F;
  font-weight: 300;
`

export const CircleView = styled.div`
  width: 10px;
  height: 10px;
  clip-path: circle();
  background-color: #FF4C1C;
  margin-top: -20px;
`

export const OpenText = styled.p`
  margin-top: -15px;
  color: #FF4C1C;
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`