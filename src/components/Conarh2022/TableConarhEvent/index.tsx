import { formatPhoneNumber } from "utils/conarh2022/formatPhoneNumber";
import { TableContainer } from "./styles";

import Check from '../../../../public/assets/check.svg';
import NoCheck from '../../../../public/assets/noCheck.svg';
import IconStands from '../../../../public/assets/iconOpenStand.svg';

interface ITableConarhEventProps {
  resCheckins?: any;
  openModalStand: boolean;
  setCheckinUserId: (parameter) => void;
  setOpenModalStand: (parameter: boolean) => void;
  noDuplicateCheckins: any;
  checkinsDays: {
    dayOne: [],
    dayTwo: [],
    dayThree: []
  }
}

export default function TableConarhEvent({
  resCheckins: checkins,
  openModalStand,
  setCheckinUserId,
  setOpenModalStand,
  checkinsDays,
  noDuplicateCheckins,
}: ITableConarhEventProps) {
  function openModal(variable: boolean, setVariable: (parameter: boolean) => void) {
    setVariable(!variable)
  }

  function filterStandsVisitedByUser(checkinUserId: string) {
    const array = checkins.filter(checkin => checkin.user?._id === checkinUserId);
    return `${array.length}`
  }

  function filterDaysTheUserAttended(array, conditions: boolean) {
    return array.find(checkin => checkin.user?._id === conditions ? true : false);
  }

  return (
    <TableContainer>
      <div className="overflowX">
        <table className="table" id="emp-table">
          <thead>
            <tr>
              <th>Visitante</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Dia 1</th>
              <th>Dia 2</th>
              <th>Dia 3</th>
              <th>Stands visitados</th>
            </tr>
          </thead>
          <tbody>
            {noDuplicateCheckins?.map((checkin, index: number) => (
              <>
                <tr key={index}>
                  <td>{checkin.user?.full_name}</td>
                  <td>{checkin.user?.email}</td>
                  <td>{formatPhoneNumber(checkin.user?.phone)}</td>
                  <td>{filterDaysTheUserAttended(checkinsDays.dayOne, checkin.user?._id) ? <Check /> : <NoCheck />}</td>
                  <td>{filterDaysTheUserAttended(checkinsDays.dayTwo, checkin.user?._id) ? <Check /> : <NoCheck />}</td>
                  <td>{filterDaysTheUserAttended(checkinsDays.dayThree, checkin.user?._id) ? <Check /> : <NoCheck />}</td>
                  <td>{filterStandsVisitedByUser(checkin.user?._id)}</td>
                  <td>
                  <IconStands 
                    style={{cursor: 'pointer'}} 
                    onClick={() => {
                      setCheckinUserId(checkin.user?._id);
                      openModal(openModalStand, setOpenModalStand);
                    }}
                  />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </TableContainer>
  )
}