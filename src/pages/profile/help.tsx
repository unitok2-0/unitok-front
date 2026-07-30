import { useState } from "react";
import { withSSRAuth } from "utils/withSSRAuth";
import { Heading } from "components/Typography";

import Head from "next/head";
import DashboardContainer from "containers/dashboard";
import HelpQAList from "components/HelpQAList";
import * as S from "styles/pageStyles/profile/styles";
import VideoPreviewButton from "components/VideoPreviewButton";
import useDisclosure from "hooks/useDisclosure";
import VideoModal from "components/VideoModal";
import videos from "constants/videos";

export default function ProfilePage() {
  const videoModal = useDisclosure();
  const [selectedVideoSrc, setSelectedVideoSrc] = useState(videos.howItWorks);

  return (
    <>
      <Head>
        <title>Ajuda | Unitok</title>
      </Head>
      
      <VideoModal
        videoSrc={selectedVideoSrc}
        modalIsOpen={videoModal.isOpen}
        closeModal={videoModal.handleClose}
      />

      <DashboardContainer variant="user-account" title="Ajuda">
        <section>
          <Heading>Tutoriais</Heading>
          <S.VideoPreviewButtonsContainer>
            <VideoPreviewButton
              title="Conheça o Unitok"
              onClick={() => {
                setSelectedVideoSrc(videos.howItWorks);
                videoModal.handleOpen();
              }}
              coverUrl="/images/unitok-video-cover.jpeg"
            />
            {/* <VideoPreviewButton
              title="Configurar o cartão Unitok"
              onClick={() => {
                setSelectedVideoSrc("video-2");
                videoModal.handleOpen();
              }}
              coverUrl="/images/configure-card-video-cover.jpeg"
            /> */}
          </S.VideoPreviewButtonsContainer>
        </section>
        <section>
          <Heading>Dúvidas frequentes</Heading>
          <HelpQAList />
        </section>
      </DashboardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
