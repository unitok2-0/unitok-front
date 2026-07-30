import moment from "moment";
import { ModalFilterContainer } from "./styles";

interface IModalFilterProps{
  openModal: boolean;
  checkinsQuery: any;
  setOpenModal: (parameter: boolean) => void;
  setCheckins: (parameter) => void;
}

export default function ModalFilter({openModal, setOpenModal, setCheckins, checkinsQuery}: IModalFilterProps){

  function activeFilter(filter) {
    setOpenModal(false);
    setCheckins(filter);
  }

  function filterDays(dateFilter: string) {
    return checkinsQuery?.filter(checkin => moment(checkin.moment).format('DD/MM/YYYY') === dateFilter);
  }

  const listDayOne = filterDays('18/04/2022');
  const listDayThow = filterDays('19/04/2022');
  const listDayThree = filterDays('20/04/2022');

  return(
    <ModalFilterContainer openModal={openModal}>
      <div onClick={() => activeFilter(listDayOne)}>Dia 1</div>
      <div onClick={() => activeFilter(listDayThow)}>Dia 2</div>
      <div onClick={() => activeFilter(listDayThree)}>Dia 3</div>
      <div onClick={() => activeFilter(checkinsQuery)}>Todos os dias</div>
    </ModalFilterContainer>
  )
}