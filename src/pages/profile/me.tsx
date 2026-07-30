import Head from "next/head";
import { withSSRAuth } from "utils/withSSRAuth";
import { useAuth } from "contexts/AuthContext";

import DashboardContainer from "containers/dashboard";
import Profile from "components/Profile";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installPwa = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <>
      <Head>
        <title>Meu perfil | Unitok</title>
      </Head>
      <DashboardContainer variant="user-account" shouldDisablePadding>
        {user && <Profile user={user} />}
      </DashboardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
}, {
  redirectAdmin: true
});
