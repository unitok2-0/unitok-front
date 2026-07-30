import {
  ContainerVisitsDays,
  InformationAccessibilityUser,
  Section,
  GraphContainer,
  ActionsSheetContainer,
  FilterDataGroup,
  ContainerProfile,
  ProfileImage
} from "../../styles/pageStyles/conarh2022/visits-stand/styles";

// import { ProfileImage } from 'components/Conarh2022/ProfileImage';
import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { withSSRAuthConarh } from "utils/conarh2022/withSSRAuthConarh";
import { useAuthConarh } from "contexts/AuthConarhContext";
import { getExhibitorInformation } from "services/exhibitor";
import { useQuery } from "@tanstack/react-query";
import { conditionsSumeCheckins, sumeTotalCheckins } from "utils/conarh2022/formatInformationsCheckins";

import TableConarhStand from '../../components/Conarh2022/TableConarhStand';
import ShapeRed from '../../../public/assets/shape-red.svg';
import ShapeGreen from '../../../public/assets/shape-green.svg';
import ShapeGreenDark from '../../../public/assets/shape-green-dark.svg';
import FooterConarh from '../../components/Conarh2022/FooterConarh';
import HeaderConarh from '../../components/Conarh2022/HeaderConarh';
import IconPeople from '../../../public/assets/peoples.svg';
import IconInterrogationRed from '../../../public/assets/interrogation-red.svg';
import Graphic from 'components/Conarh2022/GraphContainer';
import ModalConarhInformation from "components/Conarh2022/ModalConarhInformation";
import ButtonDownloadSheet from "components/Conarh2022/ButtonDownloadSheet";
import withSSRIsAdmin from "utils/conarh2022/withSSRIsAdmin";
import getTokenID from "utils/conarh2022/getTokenID";
import moment from 'moment';
import ModalFilter from "components/Conarh2022/ModalConarhFilter";
import ChevronDown from '../../../public/assets/chevron-down-red.svg';
import { InformationAccessibilityUserMobile } from "styles/pageStyles/conarh2022/visits-event/styles";
import { BiHelpCircle } from "react-icons/bi";

export interface ICongressmanVisitantes {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  hour: string;
  minutes: string;
}

interface IVisitsStandProps {
  exhibitor: any;
  exhibitorId: string;
}

interface ICheckin {
  user: {
    name: string;
    full_name: string;
    phone: string;
    email: string;
  },
  moment: Date;
}

export default function VisitsStand({ exhibitor, exhibitorId }: IVisitsStandProps) {
  const [openModalInformation, setOpenModalInformation] = useState<boolean>(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const { data: dataCheckins } = useQuery({
    queryKey: ["exhibitorCheckins"],
    queryFn: async () => await getExhibitorInformation(exhibitorId, null),
    initialData: exhibitor,
    refetchInterval: 60000,
  });
  const [exhibitorCheckins, setExhibitorCheckins] = useState<any>();
  const { user } = useAuthConarh();

  useMemo(() => {
    setExhibitorCheckins(dataCheckins?.checkins);
  }, [dataCheckins])

  const checkins = exhibitorCheckins?.map((checkin: ICheckin) => {
    return {
      name: `${checkin.user?.full_name}` || '',
      email: checkin.user?.email || '',
      phone: checkin.user?.phone || '',
      createdAt: moment(checkin?.moment).format('DD/MM/YYYY'),
      hour: moment(checkin?.moment).format('HH'),
      minutes: moment(checkin?.moment).format('mm'),
    }
  });

  const dayOne = checkins?.filter(checkin => checkin.createdAt === '18/04/2022');
  const dayTwo = checkins?.filter(checkin => checkin.createdAt === '19/04/2022');
  const dayThree = checkins?.filter(checkin => checkin.createdAt === '20/04/2022');
  return (
    <>
      <HeaderConarh />

      <Section>
        {/* <ProfileImage name={exhibitor?.company_name} isEvent={false} niche={exhibitor?.niche} img={exhibitor?.image} /> */}
        <ContainerProfile>
          <ProfileImage img_src={user?.image} />
          <div className="userName">{user?.company_name}</div>
          <div className="userNiche">{user?.niche}</div>
        </ContainerProfile>
        <div className="sectionTitle">
          <div className="containerTitle">
            Visitas ao estande
            {/* <IconInterrogationRed
              className="iconInterrogation"
              onMouseEnter={() => setOpenModalInformation(true)}
              onMouseLeave={() => setOpenModalInformation(false)}
            /> */}

            <BiHelpCircle
              onMouseEnter={() => setOpenModalInformation(true)}
              onMouseLeave={() => setOpenModalInformation(false)}
              className="iconInterrogation"
            />
            <div className="positionModalAbsolute">
              {openModalInformation &&
                <ModalConarhInformation />
              }
            </div>
          </div>
        </div>

        <ContainerVisitsDays>
          <div className="days">
            <div className="daysContainer">
              <div className="daysTitle">
                <ShapeRed className="shapeIcons" />
                Dia 1
              </div>
              <div className="numbers">
                {dayOne?.length === 0 ? ' - ' : dayOne?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople" />
              {dayOne?.length === 0 ? ' - ' : dayOne?.length}
              {dayOne?.length <= 1 ? ' pessoa' : ' pessoas'}
            </div>
          </div>

          <div className="days">
            <div className="daysContainer">
              <div className="daysTitle">
                <ShapeGreen className="shapeIcons" />
                Dia 2
              </div>
              <div className="numbers">
                {dayTwo?.length === 0 ? ' - ' : dayTwo?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople" />
              {dayTwo?.length === 0 ? ' - ' : dayTwo?.length}
              {dayTwo?.length <= 1 ? ' pessoa' : ' pessoas'}
            </div>
          </div>

          <div className="days">
            <div className="daysContainer">
              <div className="daysTitle">
                <ShapeGreenDark className="shapeIcons" />
                Dia 3
              </div>
              <div className="numbers">
                {dayThree?.length === 0 ? ' - ' : dayThree?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople" />
              {dayThree?.length === 0 ? ' - ' : dayThree?.length}
              {dayThree?.length <= 1 ? ' pessoa' : ' pessoas'}
            </div>
          </div>

          <div className="grandTotal">
            <div className="containerTotal">
              <div className="titleTotal">Total Geral</div>
              <div className="total">
                {sumeTotalCheckins(dayOne, dayTwo, dayThree)}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople" />
              {sumeTotalCheckins(dayOne, dayTwo, dayThree)}
              {conditionsSumeCheckins(dayOne, dayTwo, dayThree)}
            </div>
          </div>
        </ContainerVisitsDays>

        <InformationAccessibilityUser>
          Passe o mouse sobre o gráfico para ver as visitas de um horário específico
        </InformationAccessibilityUser>

        <InformationAccessibilityUserMobile>
          Clique no gráfico para ver as visitas de um horário específico
        </InformationAccessibilityUserMobile>

        <GraphContainer>
          <Graphic checkins={dataCheckins?.checkins} />
        </GraphContainer>

        <ActionsSheetContainer>
          <FilterDataGroup openModal={openModalFilter} onClick={() => setOpenModalFilter(!openModalFilter)}>
            <div className="filterTitle">Filtrar data</div>
            <ChevronDown className="chevronIcon" />
          </FilterDataGroup>

          <ButtonDownloadSheet isRetangule={true} />

          <ModalFilter
            checkinsQuery={dataCheckins?.checkins}
            setCheckins={setExhibitorCheckins}
            openModal={openModalFilter}
            setOpenModal={setOpenModalFilter}
          />

        </ActionsSheetContainer>

        <TableConarhStand
          resCheckins={checkins}
        />

      </Section>

      <FooterConarh activeFixed={true} />
      <ButtonDownloadSheet isRetangule={false} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuthConarh(
  async (context) => {
    const isAdmin = await withSSRIsAdmin(context);
    if (isAdmin) {
      return {
        redirect: {
          destination: '/conarh2022/visits-event',
          permanent: false,
        }
      }
    }

    const IDExhibitor = await getTokenID(context, 'unitokConarh.token');
    const exhibitor = await getExhibitorInformation(IDExhibitor, null);
    return {
      props: {
        exhibitor,
        exhibitorId: IDExhibitor
      }
    }
  }
)

