import React, { useEffect } from "react";
import Head from "next/head";
import Profile from "components/Profile";
import Link from "next/link";
import * as S from "styles/pageStyles/publicProfile/styles";

import { useRouter } from "next/router";
import { getPublicProfileUser } from "../../services/user";
import { UserProps } from "../../domain/User";
import { GetServerSidePropsContext } from "next";
import { AiOutlineUser } from "react-icons/ai";
import { TeamsGroupProps } from "domain/TeamsGroup";
import { getImageUrl } from "constants/functions";

type PropsProfileUser = {
  user: UserProps;
  admin?: UserProps;
  teamsGroup?: TeamsGroupProps;
};

const Home: React.FC<PropsProfileUser> = (props) => {
  const { user, admin, teamsGroup } = props;
  const router = useRouter();

  const isTeamsUser = !!user.administrator;

  if(isTeamsUser) {
    const buttonsPatterns = teamsGroup && teamsGroup.buttons?.length > 0
      ? teamsGroup.buttons
      : admin.buttons

    const buttonsToShow = buttonsPatterns && buttonsPatterns
      .filter(btn => !btn.hide)
      .map(btn => btn.name);

    user.buttons = user.buttons?.filter(btn => buttonsToShow.includes(btn.name));

    user.bannerUrl = admin.bannerImage ? getImageUrl(admin.bannerImage) : user.bannerUrl;
  }

  useEffect(() => {
    // Always do navigations after the first render
    if (user.name) {
      router.push(`${user.name}`, undefined, { shallow: true });
    }
  }, []);

  return <>
    <Head>
      <title>{user.full_name || user.name} | Unitok </title>
    </Head>
    <Profile
      bannerChildren={
        <S.BannerContent>
          <Link href="/login" passHref style={{ color: "white" }}>

            <AiOutlineUser size={24} />

          </Link>
        </S.BannerContent>
      }
      user={user}
      admin={admin}
      teamsGroup={teamsGroup}
    />
  </>;
};

export default Home;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { codeId } = query;

  if (!codeId) return { props: {} };


  const data = await getPublicProfileUser(codeId);

  const { isActive, tokenExists, user, admin, teamsGroup, withoutPasswordQr, event_name, isExhibitor, exhibitorId, deviceBlocked, deviceType } = data;

  const redirect = user?.buttons?.filter(button => button.isDirectLink)[0]

  if (tokenExists && deviceType === 'PETS') {
    return {
      redirect: {
        permanent: false,
        destination: `/pet/${codeId}`
      }
    }
  } else if (redirect !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: redirect.realUrl
      }
    }
  }

  if (!tokenExists) {
    return {
      redirect: {
        permanent: false,
        destination: `404`,
      },
    };
  }

  const hasUserLockedTheirProfile = user?.status === "INACTIVE";

  if (hasUserLockedTheirProfile) {
    return {
      redirect: {
        permanent: false,
        destination: `404`,
      },
    };
  }


  if (isExhibitor && !exhibitorId) {
    return {
      redirect: {
        permanent: false,
        destination: `expositor/registro/${codeId}`
      }
    }
  }

  if (isExhibitor && exhibitorId) {
    return {
      redirect: {
        permanent: false,
        destination: `checkin/${codeId}`
      }
    }
  }


  if (tokenExists && event_name === 'conarh2022') {
    return {
      redirect: {
        permanent: false,
        destination: `/conarh2022/active/${codeId}`
      }
    }
  }

  if (deviceBlocked) {
    return {
      redirect: {
        permanent: false,
        destination: `404`,
      }
    }
  }


  if (tokenExists && !isActive) {
    return {
      redirect: {
        permanent: false,
        destination: `/active/${codeId}${withoutPasswordQr ? "?pass=false" : ""}`,
      },
    };
  }

  return {
    props: {
      user,
      admin,
      teamsGroup
    },
  };
};
