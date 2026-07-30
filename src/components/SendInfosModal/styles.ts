import styled from "styled-components";

export const Wrapper = styled.div`
  width: 450px;
  max-height: 80vh;
  overflow-y: auto;
/*   display: flex;
  flex-direction: column; */
  padding-top: 2rem;
  h2{
    margin-bottom: 3rem;
    text-align: center;
  }

  .close-container{
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 1.6rem;
    margin-bottom: 2rem;
    #close-btn-mobile{
      position: static;
    }
  }

  @media (max-width: 600px) {
    max-height: none;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    justify-content: center;
  }

  @media(max-height: 700px) and (min-width: 700px){
    max-height: 90vh;
    overflow-y: scroll;
  }
`;

export const Logo = styled.div`
  padding-left: 1rem;
  padding-top: 1.1rem;
  padding-bottom: 0.6rem;
`


export const FormWrapper = styled.form`
  display: grid;
  gap: 2.4rem;
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`


export const ProfileImage = styled.div`
  display: grid;
  place-items: center;

  #contact-image{
    width: 115px;
    height: 115px;
    border-radius: 50%;
    margin-bottom: 1.2rem;
    object-fit: cover;
  }
  .buttons-wrapper{
    display: grid;
    gap: 0.4rem;
  }
`

export const Span = styled.span`
  color: #FF4C1C;
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover{
    filter: brightness(0.8);
  }
`

export const ContainerModalSendSocials = styled.div`
  width: 450px;
  height: 639px;

  h2{
    margin-bottom: 3rem;
    text-align: center;
  }

  #close-btn-mobile-socials{
    display: none;
  }

  @media (max-width: 500px) {

    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    padding-top: 2rem;
    justify-content: center;
    #close-button-desktop-socials{
      display: none;
    }
    #close-btn-mobile-socials{
      display: block;
    }
  }

  @media(max-height: 700px) and (min-width: 700px){
    max-height: 90vh;
    overflow-y: scroll;
  }
`

export const ContainerSelectSocials = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 180px);
  place-items: center;
  justify-content: center;
`

export const ButtonSelector = styled.div`
  width: 150px;
  height: 98px;
  margin: 7px;

  border: 1px solid ${(props) => props.theme.colors.grayLight};  
  border-radius: 8px;

  display: grid;

  align-items: center;
  justify-content: center;

  cursor: pointer;

 svg {
   width: 32px;
   height: 32px;
   margin: 0 auto;
 }
`;