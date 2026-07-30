import styled from 'styled-components';
import { Colors } from 'styles/Colors';

type Props = {
  openModal: boolean;
}

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
  max-width: 90%;
  width: 100%;

  .sectionTitle{

    margin-top: 36px;
    font-weight: 300;
    text-align: center;
    padding-bottom: 1.875rem;

    border-bottom: 0.125rem solid #EFF2F2;

    width: 90%;
    height: 4rem;

    .containerTitle{
      font-size: 3rem;

      max-width: 40rem;
      width: 100%;
      position: relative;
      margin: auto;

      .iconInterrogation{
        position: absolute;
        top: -10px;
        cursor: pointer;
        color: #FF4C1C;
        font-size:23px;
        
        @media (max-width: 500px){
          top: -20px;
          right: 10px;
        }
      } 

      .positionModalAbsolute{
        position: absolute;
        right: -32%;
        top:-0px;

        @media (max-width: 1000px){
          position: absolute;
          right: -40px;
          margin-right: 15px;
          top:20px;
        }

        @media (max-width:500px){
          position: absolute;
          right: -30px;
          margin-right: 15px;
        }
      }
    }

    @media (max-width: 590px){
      .containerTitle{
        font-size: 2.5rem;
      }
    }

    @media (max-width: 468px){
      .containerTitle{
        font-size: 2rem;
      }
    }

    @media (max-width: 360px){
      .containerTitle{
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 525px) {
    max-width: 98%;
  }
`

export const ContainerVisitsDays = styled.div`
  max-width: 90%;
  width: 100%;

  padding: 5.5rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .days {
    height: 10.25rem;

    div{
      padding-top: 1rem;
      font-size: 3rem;
      font-weight: 300;
    }

    .daysTitle{
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
    }

    .shapeIcons{
      margin-bottom: 0.5rem;
    }

    .numbers{
      color: #6A736F;
      font-weight: 300;
    }

    .peoples{
      display: flex;
      align-items: center;
      margin-top: 2.5rem;
      font-size: 0.938rem;
      font-weight: 400;
      color: #6A736F;

      .IconPeople{margin-right: 5px}

    }

  }

  .grandTotal {
    height: 8.813rem;
    font-weight: 500;
    font-size: 0.9rem;

    .titleTotal{
      padding-top: 3.125rem;
    }

    .total{
      padding-top: 1rem;
      font-size: 3rem;
      font-weight: 300;
      color: #01302F;
    }

    .peoples{
      display: flex;
      align-items: center;
      margin-top: 3.1rem;
      font-size: 0.938rem;
      font-weight: 400;
      color: #6A736F;

      .IconPeople{margin-right: 5px}

    }

  }

  @media (max-width: 650px) {
    max-width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.875rem;

    padding-left: 6rem;
  }

  @media (max-width: 420px) {
    max-width: 90%;

    display: flex;
    flex-direction: column;

    padding-left: 0;
    
    .days{
      display: flex;
      flex-direction: column;
      width: 15.625rem;

      .daysContainer{
        display: flex;
        align-items: center;
      }

      .shapeIcons{
        margin-right: 3rem;
      }

      .peoples{
        height: 3.125rem;
      }

    }

    .grandTotal{
      width: 15.625rem;

      .containerTotal{
        padding-top: 1.875rem;
        display: flex;
        align-items: center;
      }
      
      .titleTotal{
        padding: 0;
        margin-right: 2.688rem;
        max-width: 1.875rem;
        width: 100%;
      }
    }

  }
`

export const GraphContainer = styled.div`
  margin-top: -3rem;
  padding-bottom: 8.5rem;
  max-width: 90%;
  width: 100%;
  height: 100%;

  @media (max-width: 420px){
    margin-left: 10px;
    max-width: 100%;
    padding-bottom: 5rem;
  }

`

export const InformationAccessibilityUser = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  color: #909692;

  padding-top: 7.5rem;
  padding-bottom: 8rem;

  @media (max-width: 500px){
    display: none;
  }
`
export const InformationAccessibilityUserMobile = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  color: #909692;
  display: none;

  padding-top: 7.5rem;
  padding-bottom: 8rem;

  @media (max-width: 500px){
    display: flex;
  }

  @media (max-width: 476px){
    max-width: 20rem;
    width: 100%;
  }

  @media (max-width: 420px){
    padding-top: 0;
  }
`

export const ActionsSheetContainer = styled.div`
  max-width: 90%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

  @media (max-width: 433px){
    align-items: center;
  }
`

export const FilterDataGroup = styled.div<Props>`
  display: flex;
  align-items: center;

  .filterTitle{
    font-size: 0.938rem;
    font-weight: 500;
    color: #FF4C1C;
    cursor: pointer;

    &:hover{
      color: #D14018;
    } 
  }

  .chevronIcon{
    color: #FF4C1C;
    margin-left: 0.313rem;
    cursor: pointer;

    transition: all 0.5s;

    transform: ${props => props.openModal ? 'rotate(180deg)' : 'rotate(0deg)'}
  }

  @media (max-width: 430px){
    padding-bottom: 1.5rem;
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