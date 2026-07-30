import { ContactInformationContainer } from "components/ContactInformationContainer";
import { withSSRAuth } from "utils/withSSRAuth";
import { deleteContact, getAllContactsUserPagination } from "services/user";
import { getImageUrl } from "constants/functions";
import { useEffect, useState } from "react";
import { Heading, Text } from "components/Typography";
import { toast } from "react-toastify";
import { ModalExportContactsButton } from "components/Modals/ModalExportContacts";
import { formatedDayOfTheWeek } from "utils/formatedDayOfTheWeek";

import DashbardContainer from "containers/dashboard";
import moment from "moment";
import Head from 'next/head'
import * as S from '../../styles/pageStyles/profile/contacts/styles';

export interface Contact {
  _id: string;
  img?: string;
  full_name: string;
  job?: string;
  company?: string;
  phone: string;
  email: string;
  date: string;
  dayOfTheWeek: string;
}

interface ContactsProps {
  contacts: Contact[];
  contactsLength: number;
}

interface IFormatedContacts {
  ctx?: any;
  skip?: number; 
}

export async function getContactsAndformated({
  ctx,
  skip
}: IFormatedContacts) {
  const responseData = await getAllContactsUserPagination({ ctx, skip });

  const contacts = await responseData?.contacts?.map(contact => {
    return {
      _id: contact._id || null,
      email: contact.email || null,
      img: getImageUrl(contact.photo) || null,
      full_name: contact.full_name || null,
      phone: contact.phone || null,
      job: contact.job || null,
      company: contact.company || null,
      date: moment(contact.createdAt).format('DD/MM') || null,
      dayOfTheWeek: formatedDayOfTheWeek(moment(contact.createdAt).format('dddd')) || null,
    }
  });

  const data = {
    contactsLength: responseData.contactsLength,
    contacts: contacts
  }

  return data;
}

export default function Contacts({
  contacts: data,
  contactsLength,
}: ContactsProps) {
  const [contacts, setContacts] = useState(data);
  const [disableButton, setDisableButton] = useState(false);
  const [skip, setSkip] = useState(2);
  const [activeEdit, setActiveEdit] = useState(false);
  const [listContactsSelected, setListContactsSelected] = useState([]);
  const [activeSelectedAllContacts, setActiveSelectedAllContacts] = useState(false);
  const [isOpenModalExportButton, setIsOpenModalExportButton] = useState(false);
  const [theInformationModalIsOpen, setTheInformationModalIsOpen] = useState(false);

  useEffect(() => {
    if (contacts.length >= contactsLength) {
      setDisableButton(true);
    }
  }, [contacts.length])

  async function handleCallPagingContacts() {
    setSkip(skip + 1);

    const data = await getContactsAndformated({skip});

    setContacts([...contacts, ...data.contacts]);
  }

  function handleToggleActiveEdit() {
    setActiveEdit(!activeEdit)

    if (activeEdit) {
      setListContactsSelected([]);
      setIsOpenModalExportButton(false);
      setActiveSelectedAllContacts(false);
    }
  }

  async function handleSelectAllContacts() {
    setActiveSelectedAllContacts(!activeSelectedAllContacts);
    const newListContacts = [];

    if (!activeSelectedAllContacts) {

      for await (let contact of contacts) {
        newListContacts.push(contact._id)
      } 

      setListContactsSelected(newListContacts)
    } else {
      setListContactsSelected([])
    }
  }

  function handleOpenModalExport() {
    setIsOpenModalExportButton(!isOpenModalExportButton)
  }

  async function handleDeleteListContacts() {
    try {
      const newListContacts = contacts.filter(contact => !listContactsSelected.includes(contact._id));

      setContacts(newListContacts);
      const { message } = await deleteContact({ contact_ids: listContactsSelected });

      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setActiveEdit(false);
    }
  }

  function hideEditAndModalExport() {
    setActiveEdit(false);
    setIsOpenModalExportButton(false);
    setActiveSelectedAllContacts(false);
    setListContactsSelected([]); 
  }

  return (
    <>
      <Head>
        <title>Contatos | Unitok</title>
      </Head>

      <DashbardContainer variant="user-account" title="Contatos compartilhados comigo">

        {contacts.length > 0 &&
          <S.ContainerSelectAndEditContacts>

            {activeEdit &&
              <S.ButtonSelectAllContacts onClick={handleSelectAllContacts}>
                {activeSelectedAllContacts ? 'Desmarcar todos os contatos' : 'Selecionar todos os contatos'}
              </S.ButtonSelectAllContacts>
            }

            {!theInformationModalIsOpen &&
              <S.EditButton
                onClick={handleToggleActiveEdit}
              >
                {activeEdit ? 'Fechar' : 'Editar'}
              </S.EditButton>
            }
          </S.ContainerSelectAndEditContacts>
        }

        <S.Container>
          {contacts.length < 1 && (
            <>
              <Heading>Você ainda não possui nenhum contato salvo.</Heading>
              <Text fontWeight="400" color="grayDark">Compartilhe seu perfil Unitok com as pessoas para poder receber as informações de contato delas.</Text>
            </>
          )}
          {contacts?.map(contact => (
            <ContactInformationContainer
              activeEdit={activeEdit}
              key={contact._id}
              contact={contact}
              contacts={contacts}
              setContacts={setContacts}
              listContactsSelected={listContactsSelected}
              setListContactsSelected={setListContactsSelected}
              isSelectedAllContacts={activeSelectedAllContacts}
              checkTheInfoModalIsOpen={setTheInformationModalIsOpen}
            />
          ))}
        </S.Container>

        {contacts.length > 0 &&
          <S.ButtonPagination
            onClick={handleCallPagingContacts}
            disabled={disableButton}
          >
            Ver mais...
          </S.ButtonPagination>
        }

        <ModalExportContactsButton
          listContactsSelected={listContactsSelected}
          onCloseModal={hideEditAndModalExport}
          onOpenModal={isOpenModalExportButton}
          contacts={contacts}
        />

        <S.ContainerButtonsExport activeEdit={activeEdit}>

          <S.ButtonsExport>
            <p onClick={handleOpenModalExport}>Exportar em</p>
          </S.ButtonsExport>

          <S.ButtonsExport>
            <p onClick={handleDeleteListContacts}>Remover</p>
          </S.ButtonsExport>

        </S.ContainerButtonsExport>

      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const data = await getContactsAndformated({ctx, skip: 1});

    return {
      props: {
        contacts: data.contacts || null,
        contactsLength: data.contactsLength || null,
      },
    };
  });
