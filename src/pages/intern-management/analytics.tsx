import ClicksAnalytics from "components/ClicksAnalytics";
import DashbardContainer from "containers/dashboard";
import { withSSRAuth } from "utils/withSSRAuth";

const shouldQueryFromServer = [
  { clicks: 2, name: "INSTAGRAM" },
  { clicks: 5, name: "EMAIL" },
  { clicks: 1, name: "LINKEDIN" },
  { clicks: 1, name: "FACEBOOK" },
  { clicks: 1, name: "LIGAR" },
  { clicks: 1, name: "TWITTER" },
];

export default function InternManagementAnalyticsPage() {
  return (
    <DashbardContainer title="Analytics">
      <ClicksAnalytics buttons={shouldQueryFromServer} />
    </DashbardContainer>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
}, {
  roles: ['ADMIN']
});
