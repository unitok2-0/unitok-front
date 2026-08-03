import { ContactMenu } from 'components/ContactMenu';
import { ModalContactInformation } from 'components/Modals/ModalContactInformation';
import useDisclosure from 'hooks/useDisclosure';
import { Contact } from 'pages/profile/contacts';
import { useEffect, useState } from 'react';
import { resolveImageUrl } from 'constants/functions';

import * as S from './styles';

interface ContactInformationContainerProps {
  activeEdit: boolean;
  contact: Contact;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  listContactsSelected: any;
  setListContactsSelected: (parameter: any) => void;
  checkTheInfoModalIsOpen: (parameter: any) => void;
  isSelectedAllContacts: boolean;
}

export function ContactInformationContainer({
  contact,
  contacts,
  setContacts,
  activeEdit,
  listContactsSelected,
  setListContactsSelected,
  isSelectedAllContacts,
  checkTheInfoModalIsOpen,
}: ContactInformationContainerProps) {
  /*   const [isOpenModalContactInformation, setIsOpenModalContactInformation] = useState(false); */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);

  const modalContactInformationDisclosure = useDisclosure();

  const userImageDefault = '/assets/temporary_avatar_img.svg'

  /*   function handleToggleModalContactInformation() {
      setIsOpenModalContactInformation(!isOpenModalContactInformation);
    } */

  function formatFullName(name: string) {
    const splitedName = name.split(' ');

    if (splitedName[0] && splitedName[1]) {
      return `${splitedName[0]} ${splitedName[1]}`
    } else {
      return splitedName[0]
    }
  }

  useEffect(() => {
    if (isSelectedAllContacts) {
      setCheckedCheckbox(false);
    }
  }, [isSelectedAllContacts])

  function toggleSelectedContact(contactId: string) {
    setCheckedCheckbox(!checkedCheckbox);

    if (checkedCheckbox) {
      setListContactsSelected(listContactsSelected.filter((id: string) => contactId !== id))
    } else {
      setListContactsSelected([...listContactsSelected, contactId]);
    }

  }

  useEffect(() => {
    if (!activeEdit) {
      setCheckedCheckbox(false);
    }
  }, [activeEdit])

  useEffect(() => {

    if (modalContactInformationDisclosure.isOpen) {
      checkTheInfoModalIsOpen(true)
    } else {
      checkTheInfoModalIsOpen(false)
    }

  }, [modalContactInformationDisclosure.isOpen])

  return (
    <>

      <ModalContactInformation
        contact={contact}
        contacts={contacts}
        setContacts={setContacts}
        isOpenModal={modalContactInformationDisclosure.isOpen}
        onToggleModalContactInformation={modalContactInformationDisclosure.handleToggle}
        closeModal={modalContactInformationDisclosure.handleClose}
        modalIsOpen={modalContactInformationDisclosure.isOpen}
      />

      <S.Container activeEdit={activeEdit}>

        <S.Checkbox activeEdit={activeEdit}>
          <input type="checkbox"
            checked={isSelectedAllContacts ? isSelectedAllContacts : checkedCheckbox}
            onChange={() => toggleSelectedContact(contact._id)}
          />
        </S.Checkbox>


        <S.ImgContainer
          img_src={resolveImageUrl(contact.img, userImageDefault)}
          onClick={modalContactInformationDisclosure.handleToggle}
        />

        <S.Name
          onClick={modalContactInformationDisclosure.handleToggle}
        >
          <strong>{formatFullName(contact.full_name)}</strong>
          <p>{contact.dayOfTheWeek}, {contact.date}</p>
        </S.Name>

        <S.ButtonOpenModal>
          <img
            src="/assets/iconOpenStand.svg"
            alt=""
            style={{
              cursor: 'pointer',
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <ContactMenu
              setIsMenuOpen={setIsMenuOpen}
              contact={contact}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </S.ButtonOpenModal>


      </S.Container>
    </>
  )
}
