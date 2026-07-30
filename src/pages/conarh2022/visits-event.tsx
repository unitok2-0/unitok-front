import {
  ActionsSheetContainer,
  ContainerVisitsDays,
  FilterDataGroup,
  GraphContainer,
  InformationAccessibilityUser,
  Section,
  InformationAccessibilityUserMobile,
  ProfileImage,
  ContainerProfile
} from "../../styles/pageStyles/conarh2022/visits-event/styles";

// import { ProfileImage } from '../../components/Conarh2022/ProfileImage';
import { GetServerSideProps } from "next";
import { useMemo, useState } from 'react';
import { useAuthConarh } from "contexts/AuthConarhContext";
import { getCheckins } from "services/user";
import { withSSRAuthConarh } from "utils/conarh2022/withSSRAuthConarh";
import { useQuery } from "@tanstack/react-query";
import { conditionsSumeCheckins, sumeTotalCheckins } from "utils/conarh2022/formatInformationsCheckins";
import { api } from "services/api";

import ShapeRed from '../../../public/assets/shape-red.svg';
import ShapeGreen from '../../../public/assets/shape-green.svg';
import ShapeGreenDark from '../../../public/assets/shape-green-dark.svg';
import FooterConarh from '../../components/Conarh2022/FooterConarh';
import HeaderConarh from '../../components/Conarh2022/HeaderConarh';
import TableConarhEvent from '../../components/Conarh2022/TableConarhEvent';
import IconPeople from '../../../public/assets/peoples.svg';
import IconInterrogationRed from '../../../public/assets/interrogation-red.svg';
import ModalConarhInformation from 'components/Conarh2022/ModalConarhInformation';
import Graphic from "components/Conarh2022/GraphContainer";
import ButtonDownloadSheet from "components/Conarh2022/ButtonDownloadSheet";
import withSSRIsAdmin from "utils/conarh2022/withSSRIsAdmin";
import ModalFilter from "components/Conarh2022/ModalConarhFilter";
import ModalStands from "components/Conarh2022/ModalConarhStand";
import ChevronDown from '../../../public/assets/chevron-down-red.svg';
import moment from "moment";
import { BiHelpCircle } from 'react-icons/bi';


interface IVisitsEvent {
  resCheckins: [];
}

export default function VisitsEvent({ resCheckins }: IVisitsEvent) {
  const [ openModalInformation, setOpenModalInformation ] = useState<boolean>(false);
  const [ openModalStand, setOpenModalStand ] = useState(false);
  const [ openModalFilter, setOpenModalFilter ] = useState(false);

  const [ checkinUserId, setCheckinUserId ] = useState<string>();
  const { data: dataCheckins, refetch } = useQuery({
    queryKey: ["checkins"],
    queryFn: getCheckins,
    initialData: resCheckins,
    refetchInterval: 3000,
  });
  const [ checkins, setCheckins ] = useState<any>();
  const { user } = useAuthConarh();

  useMemo(() => {
    setCheckins(dataCheckins);
  }, [dataCheckins]);

  const setNoDuplicateArray = new Set();
  const noDuplicateCheckins = checkins?.filter((checkin) => {
    const duplicatedCheckins = setNoDuplicateArray.has(checkin.user?._id);
    setNoDuplicateArray.add(checkin.user?._id);
    return !duplicatedCheckins;
  });

  const filterDays = (day: string) => dataCheckins?.filter(checkin => moment(checkin.moment).format('DD/MM/YYYY') === day);
  const dayOne = filterDays('18/04/2022');
  const dayTwo = filterDays('19/04/2022');
  const dayThree = filterDays('20/04/2022');
  const checkinsDays = {dayOne, dayTwo, dayThree}

  return (
    <>
      <HeaderConarh />

      <Section>
        {/* <ProfileImage name='João' isEvent={true} niche="RH" img={user?.image}/> */}
        <ContainerProfile>
          <ProfileImage img_src={user?.image} />

          <div className="userName">{user?.name || 'Nome do expositor'}</div>
          <div className="userNiche">{user?.niche || 'Nicho do expositor'}</div>
        </ContainerProfile>

        <div className="sectionTitle">
          <div className="containerTitle">
            Visitas aos estandes
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
                {dayOne?.length === 0 ? '-' : dayOne?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople"/> 
              {dayOne?.length === 0 ? '-' : dayOne?.length} 
              {dayOne?.length <= 1 ? ' pessoa': ' pessoas'}
            </div>
          </div>

          <div className="days">
            <div className="daysContainer">
              <div className="daysTitle">
                <ShapeGreen className="shapeIcons" />
                Dia 2
              </div>
              <div className="numbers">
              {dayTwo?.length === 0 ? '-' : dayTwo?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople"/> 
              {dayTwo?.length === 0 ? '-' : dayTwo?.length} 
              {dayTwo?.length <= 1 ? ' pessoa': ' pessoas'}
            </div>
          </div>

          <div className="days">
            <div className="daysContainer">
              <div className="daysTitle">
                <ShapeGreenDark className="shapeIcons" />
                Dia 3
              </div>
              <div className="numbers">
                {dayThree?.length === 0 ? '-' : dayThree?.length}
              </div>
            </div>
            <div className="peoples">
              <IconPeople className="IconPeople"/> 
              {dayThree?.length === 0 ? '-' : dayThree?.length} 
              {dayThree?.length <= 1 ? ' pessoa': ' pessoas'}
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
              <IconPeople className="IconPeople"/>
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
          <Graphic 
            checkins={dataCheckins}
          />
        </GraphContainer>

        <ActionsSheetContainer>
          <FilterDataGroup openModal={openModalFilter} onClick={() => setOpenModalFilter(!openModalFilter)}>
            <div className="filterTitle">Filtrar data</div>
            <ChevronDown className="chevronIcon"/>
          </FilterDataGroup>

          <ButtonDownloadSheet isRetangule={true}/>

          <ModalFilter
            checkinsQuery={dataCheckins}
            setCheckins={setCheckins}
            openModal={openModalFilter} 
            setOpenModal={setOpenModalFilter}
          /> 

          <ModalStands 
            checkins={dataCheckins}
            userId={checkinUserId}
            openModal={openModalStand} 
            setOpenModal={setOpenModalStand}
          />
      </ActionsSheetContainer>
        
        <TableConarhEvent 
          resCheckins={checkins}
          openModalStand={openModalStand}
          setCheckinUserId={setCheckinUserId}
          setOpenModalStand={setOpenModalStand}
          checkinsDays={checkinsDays}
          noDuplicateCheckins={noDuplicateCheckins}
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
    if(!isAdmin){
      return{
        redirect:{
          destination: '/conarh2022/visits-stand',
          permanent: false,
        }
      }
    }

    const checkins = await getCheckins();

    return{
      props:{
        resCheckins: checkins || null
      }
    }
  }
) 

