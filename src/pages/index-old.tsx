import { useState, useEffect } from "react";
import Head from "next/head";
import * as S from "styles/pageStyles/home/styles";
import { WhatsappButonStyles } from "styles/pageStyles/home/styles";
import { AcceptCookies } from "components/AcceptCookies";
import { Module1 } from "components/HomeModules/Module1";
import { Module1MobileMenu } from "components/HomeModules/Module1MobileMenu";
import { Module2 } from "components/HomeModules/Module2";
import { Module3 } from "components/HomeModules/Module3";
import { Module4 } from "components/HomeModules/Module4";
import { Module5 } from "components/HomeModules/Module5";
import { Module6 } from "components/HomeModules/Module6";
import { Module7 } from "components/HomeModules/Module7";
import { Module8 } from "components/HomeModules/Module8";
import useDisclosure from "hooks/useDisclosure";
import VideoModal from "components/VideoModal";
import { HeaderHome } from "components/Header/HeaderHome";
import { Module2Video } from "components/HomeModules/Module2Video";
import { Module3Video } from "components/HomeModules/Module3Video";
import WhatsappButton from "components/Buttons/WhatsappButton";
import PwaModal from "components/PwaModal";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FooterUnitok } from "components/FooterUnitok";
import { Module2Enterprises } from "components/HomeModules/Module2Enterprises";

export interface ActiveVideoModal {
  setSelectedVideoSrc: (src: string) => void;
  videoModal: {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleToggle: () => void;
  };
}

export const homeIcons = {
  bracoCartao1: "images/_Unitok_braco-cartao2_mobile.png",
  bracoSmartphone1: "images/_Unitok_braco-smartphone_mobile.png",
  bracoSmartphone2: "images/_Unitok_braco-smartphone2_mobile.png",
  orangeNFC: "assets/orangeNFC.svg",
  orangeQRCODE: "assets/orangeQRCODE.svg",
  unitokCartaoPrincipal1: "images/unitokCartaoPrincipal1.png",
  padlock: "assets/padlock.svg",
  unitokCelularPrincipal3: "images/unitokCelularPrincipal3.png",
  group80: "images/group80.png",
  unitokCelularModule51: "images/_Unitok_celular-principal1.png",
  unitokCelularModule52: "images/_Unitok_celular-principal2.png",
  unitokCelularModule53: "images/_Unitok_celular-principal3.png",
  unitokCelularModule54: "images/_Unitok_celular-principal4.png",
  unitokCartaoSocial1: "images/unitokCartaoSocial1.png",
  unitokCartaoPersonalizado1: "images/_Unitok_cartao-personalizado.png",
  plusIcon64px: "assets/plusIcon64px.svg",
  reduceIcon64px: "assets/reduceIcon64px.svg",
  unitokCartaoPrincipal1WithoutName: "images/unitok_cartao2-semnome.png",
};


interface HomeProps {
  showModalPwa: boolean;
}

export default function Home({ showModalPwa }: HomeProps) {
  const [cookieAccepted, setCookieAccepted] = useState<boolean>(true);
  const [headerColor, seHeaderColor] = useState<"colorful" | "transp">(
    "colorful"
  );
  const [actualSpot, setActualSpot] = useState(0);
  const [oppenedBurguerMenu, setOppenedBurguerMenu] = useState(false);
  const videoModal = useDisclosure();
  const pwaModal = useDisclosure();
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string>();

  useEffect(() => {
    const accepted = window.localStorage.getItem("unitok:AcceptedCookie");
    accepted === "accepted"
      ? setCookieAccepted(true)
      : setCookieAccepted(false);
  }, []);

  function handleAcceptCookies() {
    window.localStorage.setItem("unitok:AcceptedCookie", "accepted");
    setCookieAccepted(true);
  }

  function handleActiveVideoModal(src: string) {
    setSelectedVideoSrc(src);
  }

  useEffect(() => {
    function handleChangeHeaderColor() {
      const headerContentPositionInPx = 0;
      const Section1 = document.querySelector("#section-id-1");
      const Section2 = document.querySelector("#section-id-2");
      const Section2Video = document.querySelector("#section-id-video-2");
      const Section3 = document.querySelector("#section-id-3");
      const Section3Video = document.querySelector("#section-id-video-3");
      const Section4 = document.querySelector("#section-id-4");
      const Section5 = document.querySelector("#section-id-5");
      const Section6 = document.querySelector("#section-id-6");
      const Section7 = document.querySelector("#section-id-7");
      const Section8 = document.querySelector("#section-id-8");

      if (
        Section1?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section1?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("colorful");
        setActualSpot(0);
      } else if (
        Section2Video?.getBoundingClientRect().top <=
        headerContentPositionInPx &&
        Section2Video?.getBoundingClientRect().bottom >
        -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
        setActualSpot(1);
      } else if (
        Section2?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section2?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
        setActualSpot(1);
      } else if (
        Section3Video?.getBoundingClientRect().top <=
        headerContentPositionInPx &&
        Section3Video?.getBoundingClientRect().bottom >
        -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
      } else if (
        Section3?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section3?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("colorful");
        setActualSpot(2);
      } else if (
        Section4?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section4?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
        setActualSpot(2);
      } else if (
        Section5?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section5?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("colorful");
        setActualSpot(2);
      } else if (
        Section6?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section6?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
        setActualSpot(2);
      } else if (
        Section7?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section7?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("colorful");
        setActualSpot(2);
      } else if (
        Section8?.getBoundingClientRect().top <= headerContentPositionInPx &&
        Section8?.getBoundingClientRect().bottom > -headerContentPositionInPx
      ) {
        seHeaderColor("transp");
        setActualSpot(3);
      }
    }

    window.addEventListener("scroll", handleChangeHeaderColor);
    return () => window.removeEventListener("scroll", handleChangeHeaderColor);
  }, []);

  function handleChangeOppenedBurguerMenu() {
    setOppenedBurguerMenu(!oppenedBurguerMenu);
  }

  useEffect(() => {
    if (showModalPwa) {
      pwaModal.handleOpen();
    }
  }, []);

  return (
    <S.HomeDiv>
      <Head>
        <title>Unitok | Home</title>
      </Head>

      {!cookieAccepted && (
        <AcceptCookies handleAcceptCookies={handleAcceptCookies} />
      )}

      <VideoModal
        videoSrc={selectedVideoSrc}
        modalIsOpen={videoModal.isOpen}
        closeModal={videoModal.handleClose}
      />
      {/* {showModalPwa && (
        <PwaModal
          closeModal={pwaModal.handleClose}
          modalIsOpen={pwaModal.isOpen}
        />
      )} */}


      <HeaderHome
        position="fixed"
        whatColor={headerColor}
        whatPage={actualSpot}
        oppenedBurguerMenu={oppenedBurguerMenu}
        setOppenedBurguerMenu={handleChangeOppenedBurguerMenu}
      />

      {oppenedBurguerMenu && (
        <Module1MobileMenu
          setOppenedBurguerMenu={handleChangeOppenedBurguerMenu}
        />
      )}

      <WhatsappButton whatColor={headerColor} styleProp={WhatsappButonStyles} />

      <Module1
        setSelectedVideoSrc={handleActiveVideoModal}
        videoModal={videoModal}
      />

      <Module2Video
        setSelectedVideoSrc={handleActiveVideoModal}
        videoModal={videoModal}
      />
      <Module2Enterprises />
      <Module2 />


      <Module3Video
        setSelectedVideoSrc={handleActiveVideoModal}
        videoModal={videoModal}
      />

      <Module3 />

      <Module4 />

      <Module5 />

      {/* <Module6
        setSelectedVideoSrc={handleActiveVideoModal}
        videoModal={videoModal}
      /> */}

      {/* <Module7
        setSelectedVideoSrc={handleActiveVideoModal}
        videoModal={videoModal}
      /> */}

      <Module8 />

      <FooterUnitok />
    </S.HomeDiv>
  );
}

export const getServerSideProps: GetServerSideProps =
  async (context) => {

    const { ['dontHaveInterestPWA']: haveInterest } = parseCookies(context);

    const showModalPwa = haveInterest === "0" ? false : true;

    return {
      props: {
        showModalPwa
      }
    }
  }
