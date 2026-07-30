import { IoIosArrowForward } from 'react-icons/io';
import { RiFileExcel2Line } from 'react-icons/ri';
import { utils, writeFile } from 'xlsx';
import { Contact } from 'pages/profile/contacts';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import { useState } from 'react';

import IconExportCSV from '/public/assets/icon_export_csv.svg';
import * as S from './styles';

const headers = [
  { label: "Nome completo", key: "full_name" },
  { label: "E-mail", key: "email" },
  { label: "Link da foto", key: "img" },
  { label: "Celular", key: "phone" },
  { label: "Profissão", key: "job" },
  { label: "Colaborador", key: "user_name" },
  { label: "Empresa", key: "company" },
  { label: "Data de envio", key: "dayOfTheWeek" },
];

interface ModalExportContactsButtonProps {
  listContactsSelected: any;
  onOpenModal: boolean;
  contacts: Contact[];
  onCloseModal: () => void;
}

export function ModalExportContactsButton({
  listContactsSelected,
  onOpenModal,
  contacts,
  onCloseModal,
}: ModalExportContactsButtonProps) {
  const [listContactsSelectedObject, setListContactsSelectedObject] = useState([])

  function handleGetContactsInState() {
    const listContacts = contacts.filter(contact => listContactsSelected.includes(contact._id));

    for (let contact of listContacts) {
      delete contact._id
    }

    return listContacts
  }

  function handleOnExportContactsExcel() {
    if (listContactsSelected <= 0) {
      toast.error('Selecione pelo menos um contato!');
      return false;
    }

    let wb = utils.book_new();

    const listContacts = handleGetContactsInState();

    let ws = utils.json_to_sheet(listContacts);

    ws.A1.v = 'E-mail';
    ws.B1.v = 'URL da Foto';
    ws.C1.v = 'Nome Completo';
    ws.D1.v = 'Celular';
    ws.E1.v = 'Profissão';
    ws.F1.v = 'Empresa';
    ws.G1.v = 'Colaborador';
    ws.H1.v = 'Data do Envio';
    ws.I1.v = 'Dia do Envio';

    utils.book_append_sheet(wb, ws, "Meus_Contatos");

    writeFile(wb, "Meus_Contatos.xlsx");

    onCloseModal();
  }

  function handleOnExportContactsCSV() {
    if (listContactsSelected <= 0) {
      toast.error('Selecione pelo menos um contato!');
      return false;
    }

    const listContacts = handleGetContactsInState();

    setListContactsSelectedObject(listContacts);
    onCloseModal();
  }

  return (
    <S.ModalContainer isOpenModal={onOpenModal}>

      <button>
        <div className='icon'>
          <IconExportCSV />
        </div>
        <CSVLink
          data={listContactsSelectedObject}
          headers={headers}
          filename="Meus_Contatos.csv"
          asyncOnClick={true}
          onClick={handleOnExportContactsCSV}
        >
          Exportar em CSV
        </CSVLink>
        <div>
          <IoIosArrowForward size={20} />
        </div>
      </button>

      <button onClick={handleOnExportContactsExcel}>
        <div className='icon'>
          <RiFileExcel2Line size={20} />
        </div>
        <p>Exportar em Excel</p>
        <div>
          <IoIosArrowForward size={20} />
        </div>
      </button>



    </S.ModalContainer>
  )
}
