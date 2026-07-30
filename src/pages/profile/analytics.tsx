import Head from "next/head";
import ClicksAnalytics from "components/ClicksAnalytics";
import DashbardContainer from "containers/dashboard";
import { withSSRAuth } from "utils/withSSRAuth";
import {
  getUserAnalytics,
  GetUserAnalyticsFilters,
  UserAnalytics,
} from "services/analytics";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

function mapProfileButtons(buttons: UserAnalytics["details"]) {
  return buttons?.map((button) => ({
    name: button._id,
    clicks: button.clicks,
  }));
}

export type ProfileAnalyticsPageProps = {
  userAnalytics: UserAnalytics;
};

export default function ProfileAnalyticsPage(props: ProfileAnalyticsPageProps) {
  const [userAnalytics, setUserAnalytics] = useState(props.userAnalytics);

  const buttons = useMemo(() => {
    return mapProfileButtons(userAnalytics?.details);
  }, [userAnalytics]);

  async function filterAnalytics(filter: GetUserAnalyticsFilters) {
    try {
      const userAnalytics = await getUserAnalytics(null, { filter });
      setUserAnalytics(userAnalytics);
    } catch {
      toast.error("Erro ao obter analytics");
    }
  }

  return (
    <>
      <Head>
        <title>Relatórios | Unitok</title>
      </Head>
      <DashbardContainer variant="user-account" title="Relatório">
        <ClicksAnalytics onFilterChange={filterAnalytics} buttons={buttons} />
      </DashbardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  try {
    const userAnalytics = await getUserAnalytics(ctx, { filter: "TODAY" });
    return {
      props: {
        userAnalytics,
      },
    };
  } catch {
    return {
      props: { userAnalytics: null },
    };
  }
});
