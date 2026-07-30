import { HeaderConarh } from "components/Headers/HeaderConarh";
import { Doubts } from "components/Doubts";
import { Heading } from "components/Typography";
import VideoModal from "components/VideoModal";
import { ModalPWA } from "components/Conarh2022/ModalPWA";
import videos from "constants/videos";
import useDisclosure from "hooks/useDisclosure";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Container,
  Hero,
  Steps,
  Card,
  VideoThumb,
  CallToAction,
  Footer,
} from "../../styles/pageStyles/conarh2022/landing-page/styles";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import WhatsappButton from "components/Buttons/WhatsappButton";
import { setInterval } from "timers";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

interface IStepCards {
  imgUrl: string;
  description: string;
}

const StepsCards: IStepCards[] = [
  {
    imgUrl: "/images/conarh2022/step01.png",
    description:
      "<p>Encoste seu cartão ABRH Unitok no seu celular ou, com a câmera, escaneie o QR Code do verso do cartão.<p>",
  },
  {
    imgUrl: "/images/conarh2022/step02.png",
    description: "<p>Clique na notificação para acessar o link.</p>",
  },
  {
    imgUrl: "/images/conarh2022/step03.png",
    description:
      "<p>Ao abrir o link, desbloqueie o cartão utilizando o código <strong>783316</strong>. Siga o passo a passo para criar uma conta Unitok.</p>",
  },
  {
    imgUrl: "/images/conarh2022/step04.png",
    description:
      "<p>Agora você já pode marcar presença em todos os stands que visitar. Basta encostar seu celular nas tags dos stands e fazer login na sua conta!</p>",
  },
  {
    imgUrl: "/images/conarh2022/step05.png",
    description:
      "<p>Durante o evento você ainda pode utilizar seu cartão ABRH Unitok para compartilhar seus contatos, sabia? É só preencher o perfil com os dados que desejar.</p>",
  },
  {
    imgUrl: "/images/conarh2022/step06.png",
    description:
      "<p>Pronto! Agora é só sair compartilhando. Basta encostar ou escanear o seu Unitok no celular da pessoa que acabou de conhecer e ela já verá o seu perfil.</p>",
  },
];

const CardsImages = [
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_01.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_02.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_02.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_03.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_04.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_05.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_06.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_07.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_08.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_09.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_10.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_11.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_12.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_13.png",
  "/images/conarh2022/cards/Unitok_cartoes_CONARH14_14.png",
];

/* interface ConarhProps {
  showModalPwa: boolean;
} */

export default function Conarh({ }) {
  const videoModal = useDisclosure();
  /* const pwaModal = useDisclosure(showModalPwa); */
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string>(
    videos.howItWorks
  );

  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState<number>();

  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState(CardsImages);

  const handleNavigation = (e) => {
    const window = e.currentTarget;
    if (window) {
      setScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    setScrollY(window.scrollY);
    setScrollHeight(document.body.scrollHeight * 0.8);

    window.addEventListener("scroll", (e) => handleNavigation(e));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      bgImageIndex + 2 > backgroundImages.length
        ? setBgImageIndex(0)
        : setBgImageIndex(bgImageIndex + 1);
    }, 1000);
  }, [bgImageIndex]);

  return <>
    <Head>
      <title>Conarh | Unitok</title>
    </Head>
    <HeaderConarh />
    {scrollY <= scrollHeight && <WhatsappButton />}
    <Container>
      <Hero>
        <img
          src="/images/conarh2022/cards/Unitok_LP-conarh_banner_COMPLETO.png"
          alt="Cartões personalizados Abrh"
        />
        <Heading>Entenda como configurar o seu cartão ABRH Unitok</Heading>
      </Hero>
      <Steps>
        <Heading color="primary">Siga o passo a passo</Heading>
        <div className="step-content">
          {StepsCards.map((step, index) => (
            <Card key={index} img_src={step.imgUrl}>
              <span className="number">{`0${index + 1}`}</span>
              <div className="thumb">
                <img src={step.imgUrl} alt="" />
              </div>
              <span
                dangerouslySetInnerHTML={{ __html: step.description }}
              ></span>
            </Card>
          ))}
        </div>
        <div className="doubt">
          <Heading color="primary">
            Ainda em dúvidas? <span>Assista ao vídeo:</span>
          </Heading>
          <VideoThumb>
            <img
              className="thumb"
              src="/images/conarh2022/thumbnail_video.png"
              alt=""
            />
            <button
              onClick={() => {
                videoModal.handleOpen();
              }}
            >
              <img src="/assets/play-icon.svg" alt="" />
            </button>
          </VideoThumb>
        </div>
      </Steps>
      <Doubts></Doubts>
      <CallToAction>
        <img src={backgroundImages[bgImageIndex]} alt="" />
        <Heading>
          {" "}
          <span>Adquira também um Unitok</span>
          com a identidade da sua empresa ou escolha um de nossos 9 modelos.
        </Heading>
        <div className="buttons">
          <ButtonPrimary as="a" variant="secondary" href="/cards/classictok-0">
            Veja nossos modelos
          </ButtonPrimary>
          <ButtonPrimary
            as="a"
            href="/conarh2022/personalizados"
            target="_blank"
          >
            Faça com a sua marca
          </ButtonPrimary>
        </div>
      </CallToAction>
      <Footer>
        <Link href="/" passHref>

          <img src="/assets/logo2.svg" alt="" />

        </Link>

        <div className="social-media">
          <a
            href="https://www.instagram.com/unitok_br/"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram color="#FF4C1C" size={32} />
          </a>
          <a
            href="https://www.linkedin.com/company/unitok/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn color="#FF4C1C" size={32} />
          </a>

          <a
            href="https://www.youtube.com/channel/UCmLVukDcy1WsiMNry_nNR6g"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/youtube.svg"
              alt=""
              width="32px"
              height="32px"
            />
          </a>
        </div>
      </Footer>
    </Container>

    <VideoModal
      videoSrc={selectedVideoSrc}
      modalIsOpen={videoModal.isOpen}
      closeModal={videoModal.handleClose}
    />
    {/* {showModalPwa && (
      <ModalPWA
        modalIsOpen={pwaModal.isOpen}
        closeModal={pwaModal.handleClose}
      />
    )} */}
  </>;
}


export const getServerSideProps: GetServerSideProps =
  async (context) => {

    /* const { ['dontHaveInterestPWA']: haveInterest } = parseCookies(context);
    const showModalPwa = haveInterest === "0" ? false : true; */

    return {
      props: {}
    }
  }
