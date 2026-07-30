import styled from "styled-components";

export const Container = styled.div`
  background-color: #efefef;
`;

export const Hero = styled.div`
  max-width: 750px;
  margin: 0 auto;
  img {
    display: block;
    margin: 0 auto;
    transform: translateY(-13%);
    width: 100%;
    max-width: 850px;
  }
  h2 {
    font-size: 3rem;
    text-align: center;
    line-height: 76px;
    margin-top: -75px;

    @media (max-width: 700px) {
      line-height: 45px;
      font-size: 2.1rem;
      margin-top: -50px;
      padding: 0 1.4rem;
    }

    @media (max-width: 380px) {
      margin-top: -30px;
    }
  }
`;

export const Steps = styled.section`
  max-width: 975px;
  margin: 0 auto;
  h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 500;
    margin-top: 6.25rem;
    margin-bottom: 5rem;

    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  .step-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4.8rem;

    @media (max-width: 1000px) {
      max-width: 435px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 480px) {
      width: 100%;
      padding: 0 1.8rem;
    }
  }
  .doubt {
    margin-top: 12.5rem;
    h2 > span {
      color: #01302f;
      font-weight: 300;
    }

    @media (max-width: 420px) {
      margin-top: 80px;
      h2 {
        font-size: 20px;
        line-height: 40px;
        margin-bottom: 32px;
      }
      h2 > span {
        display: block;
      }
    }
  }
`;

interface CardProps {
  img_src: string;
}

export const Card = styled.div<CardProps>`
  width: 100%;
  .number {
    color: #ff4c1c;
    font-size: 1.8rem;
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .thumb {
    width: 100%;
    background-color: #c4c4c4;
    border-radius: 10px;
    position: relative;
    min-height: 338px;
    background-image: ${(props) => `url(${props.img_src})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      transition: transform 0.25s;
      @media (max-width: 480px) {
        display: none;
      }
    }
    overflow: hidden;
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  p {
    margin-top: 25px;
    color: #515855;
    line-height: 40px;

    @media (max-width: 400px) {
      line-height: 25px;
    }
  }
`;

export const VideoThumb = styled.div`
  width: 100%;
  min-height: 532px;
  position: relative;
  margin-bottom: 9.3rem;

  button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 9999px;
    border: none;
    width: 115px;
    height: 115px;
    background-color: #ff4c1c;
    text-align: center;
    transition: 0.25s;
    @media (max-width: 800px) {
      width: 50px;
      height: 50px;
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-30%, -50%);

      @media (max-width: 800px) {
        width: 14px;
        height: 14px;
      }
    }
    &:hover {
      filter: brightness(0.8);
    }
  }

  .thumb {
    width: 100%;
  }

  @media (max-width: 1000px) {
    margin-bottom: 0;
    min-height: 0;
  }
`;

export const CallToAction = styled.section`
  padding-bottom: 8.75rem;
  img {
    width: 100%;
    margin: 0 auto;
    margin-top: -12%;
    max-width: 970px;
    display: block;

    @media (max-width: 900px) {
      margin-top: -24%;
    }
  }

  h2 {
    text-align: center;
    font-size: 2.5rem;
    max-width: 836px;
    margin: 0 auto;
    margin-top: 5rem;
    line-height: 75px;
    font-weight: 300;

    @media (max-width: 620px) {
      padding: 0 1.4rem;
      font-size: 20px;
      line-height: 20px;
    }
  }
  h2 > span {
    color: #ff4c1c;
    display: block;
    font-weight: 500;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.9rem;
    gap: 24px;
  }

  @media (max-width: 540px) {
    h2,
    span {
      line-height: 40px;
    }
    .buttons {
      margin-top: 2.5rem;
      display: block;
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;

      a:last-child {
        margin-top: 23px;
      }
    }
  }
`;

export const Footer = styled.footer`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem;

  .social-media {
    display: flex;
    align-items: center;
    gap: 24px;
    a {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
      }
    }
  }
`;

export const NewModalPWA = styled.div`
  overflow: hidden;
  position: fixed;
  z-index: 7;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);

  .modal-content {
    width: 100%;
    height: 100%;

    background: #fff;

    padding: 2.857rem 2.071rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    h2 {
      font-size: 1.071rem;
      font-weight: 500;
      line-height: 1.786rem;
      color: #01302f;
    }

    p {
      margin-bottom: 5.071rem;
      font-size: 1.071rem;
      font-weight: 400;
      line-height: 1.786rem;
      text-align: center;
    }

    .thumbVideo {
      position: relative;
      width: 100%;
      max-width: 28.125rem;
      max-height: 15.625rem;
      margin: 2rem 0;

      button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 9999px;
        border: none;
        width: 64px;
        height: 64px;
        background-color: #ff4c1c;
        text-align: center;
        transition: 0.25s;

        @media (max-width: 800px) {
          width: 50px;
          height: 50px;
        }
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-35%, -50%);
          width: 24px;
          height: 24px;

          @media (max-width: 800px) {
            width: 14px;
            height: 14px;
          }
        }
        &:hover {
          filter: brightness(0.8);
        }
      }

      .thumb {
        width: 100%;
        height: 100%;
      }
    }

    .closeModal {
      border: none;
      background: transparent;
      outline: 0;

      color: #ff4c1c;
      border-bottom: 1px solid #ff4c1c;
      margin-top: 2rem;
    }
  }

  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-content {
      max-width: 28.5rem;
      height: fit-content;

      border-radius: 0.75rem;

      p {
        margin-bottom: 3rem;
      }
    }
  }
`;
