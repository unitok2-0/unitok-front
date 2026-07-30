import { useState } from "react";
import { ICongressmanVisitantes } from "../../../pages/expositor/dashboard";
import { formatPhoneNumber } from "utils/conarh2022/formatPhoneNumber";
import { TableContainer } from "./styles";

interface ITableConarhStandProps {
  resCheckins: ICongressmanVisitantes[]
  exhibitorId?: string;
}

export default function TableConarhStand({ resCheckins: checkins, exhibitorId }: ITableConarhStandProps) {
  return (
      <TableContainer>
        <div className="overflowX">
          <table className="table" id="emp-table">
            <thead>
              <tr>
                <th>Data da visita</th>
                <th>Hora da visita</th>
                <th>Visitante</th>
                <th>E-mail</th>
                <th>Telefone</th>
              </tr>
            </thead>

            <tbody>
              {checkins?.map((congressman, index) => (
                <>
                  <tr key={index}>
                    <td>{congressman.createdAt}</td>
                    <td>{`${congressman.hour}h ${congressman.minutes}min`}</td>
                    <td>{congressman.name}</td>
                    <td>{congressman.email}</td>
                    <td>{formatPhoneNumber(congressman.phone)}</td>
                  </tr>
                </>
              ))} 
            </tbody>
          </table>
        </div>
      </TableContainer>
  )
}