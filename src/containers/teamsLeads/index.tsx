import moment from 'moment';
import 'moment/locale/pt-br';
import { utils, writeFile } from 'xlsx';
import { BsDownload } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import React, { useEffect, useMemo, useState } from 'react';

import { GenericDropdown, GenericDropdownButton, GenericDropdownHeader } from 'components/GenericDropdown';
import Input from 'components/Inputs/Input';
import NewTable from 'components/NewTable';
import { ContactProps } from 'domain/Contact';
import useDebounce from 'hooks/useDebounce';
import useDisclosure from 'hooks/useDisclosure';
import { adminDeleteContacts, adminGetContacts } from 'services/user';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import Avatar from 'components/Avatar';
import { Pagination } from 'components/Pagination';
import ContactModal from './ContactModal';
import { generateVcardToContact, getImageUrl } from 'constants/functions';
import { Heading } from 'components/Typography';
import { ModalExportContactsButton } from 'components/Modals/ModalExportContacts';

import * as S from './styles';

export default function TeamsLeadsContainer() {
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 350);
  const [sortBy, setSortBy] = useState<"full_name" | "createdAt">("createdAt");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0 })
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<ContactProps[]>([])
  const [contactToShow, setContactToShow] = useState<ContactProps>();

  const [isExportContactsModalOpen, setIsExportContactsModalOpen] = useState(false);

  const dropdownDisclosure = useDisclosure();

  const itemsPerPage = 10;

  useEffect(() => {
    adminGetContacts({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      full_name: searchDebounced,
      sortBy
    })
      .then(res => {
        setContacts(res.payload)
        setPagination(res.pagination)
      })
      .catch(e => console.error('Erro ao consultar leads'))
  }, [page, searchDebounced, sortBy])

  const mappedSelectedContacts = useMemo(() => {
    return selectedContacts.map(ctc => ({
      _id: ctc._id,
      email: ctc.email,
      img: getImageUrl(ctc.photo),
      full_name: ctc.full_name,
      phone: ctc.phone,
      job: ctc.job,
      company: ctc.company,
      user_name: typeof ctc.user_id !== "string" && ctc.user_id?.full_name,
      date: moment(ctc.createdAt).format('DD/MM/YYYY'),
      dayOfTheWeek: moment(ctc.createdAt).format('ddd')
    }))
  }, [selectedContacts])

  function handleToggleSelectedContact(selectedContact: ContactProps) {
    const isContactAlreadySelected = selectedContacts.some(contact => contact._id === selectedContact._id)

    if(isContactAlreadySelected)
      setSelectedContacts(selectedContacts.filter(contact => contact._id !== selectedContact._id))
    else
      setSelectedContacts([...selectedContacts, selectedContact])
  }

  function handleToggleSelectAll() {
    if(selectedContacts.length > 0)
      setSelectedContacts([])
    else
      setSelectedContacts(contacts)
  }

  async function handleSaveContactRequest(contact: ContactProps) {
    generateVcardToContact({ 
      ...contact,
      date: '',
      dayOfTheWeek: '',
      img: contact.photo,
     })
  }

  async function handleDeleteContactRequest(contact: ContactProps) {
    try {
      await adminDeleteContacts({ contactsIds: [contact._id] });
      setContacts(contacts.filter(ctc => ctc._id !== contact._id));
      setContactToShow(undefined);
    } catch(e) {
      console.error('Erro ao excluir contato', e);
    }
  }

  async function handleDeleteSelectedContacts() {
    const contactsIds = selectedContacts.map(ctc => ctc._id);
    try {
      await adminDeleteContacts({ contactsIds });
      setContacts(contacts.filter(ctc => !contactsIds.includes(ctc._id)));
      setSelectedContacts([]);
    } catch(e) {
      console.error('Erro ao excluir contatos', e);
    }
  }

  async function handleDownloadContacts(contacts: ContactProps[]) {
    let wb = utils.book_new();

    const listContacts = contacts.map(({_id, ...ctc}) => ({
      email: ctc.email,
      img: getImageUrl(ctc.photo),
      full_name: ctc.full_name,
      phone: ctc.phone,
      job: ctc.job,
      company: ctc.company,
      user_name: typeof ctc.user_id !== "string" && ctc.user_id?.full_name,
      date: moment(ctc.createdAt).format('DD/MM/YYYY'),
      dayOfTheWeek: moment(ctc.createdAt).format('ddd')
    }));

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
  }

  return (
    <>
      <S.Header>
        <Heading as="h1" font="titleMd" fontWeight="300" color="primary">
          Leads
        </Heading>

        <ButtonPrimary
          rightElement={<BsDownload size={18} style={{ marginLeft: "2rem" }} />}
          onClick={() => handleDownloadContacts(contacts)}
        >Baixar planilha completa</ButtonPrimary>
      </S.Header>

      <S.ResponsiveStack>
        <Input
          id="search"
          label="Pesquise por nome"
          rightElement={<BiSearch />}
          style={{ minWidth: "20rem" }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <div>
          <GenericDropdown
            shouldShowContent={dropdownDisclosure.isOpen}
            onClickOutside={dropdownDisclosure.handleClose}
            header={
              <GenericDropdownHeader
                onClick={dropdownDisclosure.handleOpen}
                onMouseEnter={dropdownDisclosure.handleOpen}
              >
                Ordenar por
              </GenericDropdownHeader>
            }
          >
            <GenericDropdownButton
              selected={sortBy === "full_name"}
              onClick={() => setSortBy("full_name")}
            >
              Nome
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortBy === "createdAt"}
              onClick={() => setSortBy("createdAt")}
            >
              Data de criação
            </GenericDropdownButton>
          </GenericDropdown>
        </div>
      </S.ResponsiveStack>

      <NewTable
        gridTemplateColumns="0.5fr 2fr 2fr 2fr 1fr"
        tableHeads={[
          <S.Input 
            type="radio"
            onClick={handleToggleSelectAll} 
            checked={selectedContacts.length === contacts.length}
          />, 
          "Lead", 
          "Conectado por", 
          <span style={{ marginLeft: "1.5rem" }}>Data</span>, 
          ""
        ]}
        tableData={contacts.map(contact => [
          <S.Input  
            type="radio"
            onClick={() => handleToggleSelectedContact(contact)}
            checked={selectedContacts.some(ctc => ctc._id === contact._id)}
          />,
          contact.full_name,
          <Avatar 
            size={40} 
            imageUrl={typeof contact.user_id !== "string" && getImageUrl(contact.user_id.userImage)} 
            styleContainer={{ paddingLeft: "2rem" }}
          />,
          moment(contact.createdAt).format('DD, MMM, YYYY'),
          <ButtonPrimary
            variant="tertiary"
            onClick={() => setContactToShow(contact)}
            style={{fontSize: "0.75rem", fontWeight: 500}}
          >
            Ver contato
          </ButtonPrimary>,
        ])}
      />

      <Pagination
        page={page} 
        total={pagination.total} 
        limit={itemsPerPage}
        onPageSelected={setPage}
        containerStyle={{ marginTop: "3rem" }}
      />

      <ContactModal 
        isOpen={!!contactToShow} 
        onCloseRequest={() => setContactToShow(undefined)}
        contact={contactToShow}
        onSaveContactRequest={handleSaveContactRequest}
        onDeleteContactRequest={handleDeleteContactRequest}
      />

      <div style={{ display: "block", height: "3rem" }} />

      <S.ContainerBottomFixed isActive={selectedContacts.length > 0}>
        <S.BottomFixedButton onClick={() => setIsExportContactsModalOpen(!isExportContactsModalOpen)}>
          <p>Exportar</p>
        </S.BottomFixedButton>

        <S.BottomFixedButton onClick={handleDeleteSelectedContacts}>
          <p>Excluir</p>
        </S.BottomFixedButton>
      </S.ContainerBottomFixed>

      <ModalExportContactsButton
        contacts={mappedSelectedContacts}
        listContactsSelected={mappedSelectedContacts.map(ctc => ctc._id)}
        onCloseModal={() => setIsExportContactsModalOpen(false)}
        onOpenModal={isExportContactsModalOpen}
      />
    </>
  )
}
