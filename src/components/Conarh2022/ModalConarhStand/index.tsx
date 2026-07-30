import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import {
  CloseModal,
  Container,
  ModalStandsContainer, 
  ModalStandsTitle, 
  Table, 
  TableBody, 
  TableHead,
  Td_Body,
  Td_Head,
  Tr_Body,
  Tr_Head,
} from "./styles";

interface IModalStandsProps{
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<Boolean>>;
  userId: string;
  checkins: any;
}

export default function ModalStands({
  openModal, 
  setOpenModal,
  userId,
  checkins,
}: IModalStandsProps) {

  return(
  <Container openModal={openModal}>
    <CloseModal onClick={() => setOpenModal(false)}>Fechar</CloseModal>
    
    <ModalStandsContainer>
      <ModalStandsTitle>Stands visitados</ModalStandsTitle>

      <Table>
        <TableHead>
          <Tr_Head>
            <Td_Head>Data da visita</Td_Head>
            <Td_Head>Hora da visita</Td_Head>
            <Td_Head>Nome do stand</Td_Head>
          </Tr_Head>
        </TableHead>

        <TableBody>
        {checkins?.map((checkin, index) => (
        <>
          <Tr_Body key={index}>
            <Td_Body style={{display: checkin.user?._id === userId ? '' : 'none'}}>
              {checkin.user?._id === userId && 
                moment(checkin.moment).format('DD/MM/YYYY')
              }
            </Td_Body>
            <Td_Body style={{display: checkin.user?._id === userId ? '' : 'none'}}>
              {checkin.user?._id === userId && 
                `${moment(checkin.moment).format('HH')}h ${moment(checkin.moment).format('mm')}min`
              }
            </Td_Body>
            <Td_Body style={{display: checkin.user?._id === userId ? '' : 'none'}}>
              {checkin.user?._id === userId && 
                checkin.exhibitor
              }
            </Td_Body>
          </Tr_Body>
        </>
        ))}
        </TableBody>
      </Table>
    </ModalStandsContainer>
  </Container>
  )
}