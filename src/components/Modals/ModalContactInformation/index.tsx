import { Contact } from "pages/profile/contacts";
import { AiOutlineClose } from "react-icons/ai";
import { ProfileImageContacts } from "components/ProfileImageContacts";
import { formatPhoneNumber } from "utils/conarh2022/formatPhoneNumber";
import { generateVcardToContact } from "constants/functions";
import { deleteContact } from "services/user";
import { toast } from "react-toastify";
import Modal, { Styles } from 'react-modal'

import Input from "components/Inputs/Input";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import * as S from './styles';
import ShareProfileModal from "../ModalShareContact";
import useDisclosure from "hooks/useDisclosure";
import { useEffect, useState } from "react";

interface ModalContactInformationProps {
  contact: Contact;
  isOpenModal: boolean;
  onToggleModalContactInformation: () => void;
  contacts: Contact[];
  setContacts: (parameter: any) => void;
  modalIsOpen: boolean
  afterOpenModal?: () => void
  closeModal: () => void
}

export function ModalContactInformation({
  isOpenModal,
  contact,
  contacts,
  setContacts,
  onToggleModalContactInformation,
  closeModal,
  modalIsOpen,
  afterOpenModal,
}: ModalContactInformationProps) {
  const [isModalMobile, setIsModalMobile] = useState(false);
  const shareProfileModal = useDisclosure();

  {console.log(contact)}

  function generateAndDownloadVcard() {
    generateVcardToContact(contact);
  }

  async function handleDeleteContact() {
    try {
      const filteredContacts = contacts.filter(contactData => contactData._id !== contact._id);
      const { message } = await deleteContact({ contact_ids: [contact._id] });

      setContacts(filteredContacts);
      toast.success(message);

      onToggleModalContactInformation();
    } catch (error) {
      toast.error(error)
    }
  }

  function openModalShareContact() {
    shareProfileModal.handleOpen()
  }

  useEffect(() => {

    if(window.innerWidth <= 768) {
      setIsModalMobile(true);
    } else {
      setIsModalMobile(false);
    }

  }, [])

  return (
    <>
      {!isModalMobile &&
        <Modal
          ariaHideApp={modalIsOpen}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <ShareProfileModal
            modalIsOpen={shareProfileModal.isOpen}
            closeModal={shareProfileModal.handleClose}
            email={contact?.email}
            phone={contact?.phone}
          />

          {isOpenModal &&
            <S.CloseButtonMobile
              onClick={onToggleModalContactInformation}
            >
              Voltar
            </S.CloseButtonMobile>
          }

          <S.ContainerModal isOpenModal={isOpenModal}>
            <S.ContainerControllerModal>
              <AiOutlineClose
                className="close-icon"
                onClick={onToggleModalContactInformation}
              />
            </S.ContainerControllerModal>

            <S.ContainerBody>

              <S.PositionProfileImage>
                <ProfileImageContacts
                  img={contact?.img}
                  name={`${contact?.full_name}`}
                  company={contact?.company}
                  job={contact?.job}
                />
              </S.PositionProfileImage>

              <S.InputsInformations>

                <Input
                  id="contact-phone"
                  label="Telefone"
                  value={contact?.phone ? formatPhoneNumber(contact?.phone) : "(xx) xxxxx-xxxx"}
                />

                <Input
                  id="contact-email"
                  label="E-mail"
                  value={contact?.email ?? ""}
                />

              </S.InputsInformations>

              <S.ContainerButtons>

                <ButtonPrimary
                  textButton="Salvar este contato na agenda"
                  onClick={generateAndDownloadVcard}
                  styleProp={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                />

                <ButtonPrimary
                  textButton="Compartilhar contato"
                  variant="secondary"
                  onClick={openModalShareContact}
                  styleProp={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                />

                <S.ButtonDeleteContact
                  onClick={handleDeleteContact}
                >
                  Excluir contato
                </S.ButtonDeleteContact>

              </S.ContainerButtons>
            </S.ContainerBody>
          </S.ContainerModal>
        </Modal>
      }
      {isModalMobile &&
        <>
          <ShareProfileModal
            modalIsOpen={shareProfileModal.isOpen}
            closeModal={shareProfileModal.handleClose}
            email={contact?.email}
            phone={contact?.phone}
          />

          {isOpenModal &&
            <S.CloseButtonMobile
              onClick={onToggleModalContactInformation}
            >
              Voltar
            </S.CloseButtonMobile>
          }

          <S.ContainerModal isOpenModal={isOpenModal}>
            <S.ContainerControllerModal>
              <AiOutlineClose
                className="close-icon"
                onClick={onToggleModalContactInformation}
              />
            </S.ContainerControllerModal>

            <S.ContainerBody>

              <S.PositionProfileImage>
                <ProfileImageContacts
                  img={contact?.img}
                  name={`${contact?.full_name}`}
                  company={contact?.company}
                  job={contact?.job}
                />
              </S.PositionProfileImage>

              <S.InputsInformations>

                <Input
                  id="contact-phone"
                  label="Telefone"
                  value={contact?.phone ? formatPhoneNumber(contact?.phone) : "(xx) xxxxx-xxxx"}
                />

                <Input
                  id="contact-email"
                  label="E-mail"
                  value={contact?.email ?? ""}
                />

              </S.InputsInformations>

              <S.ContainerButtons>

                <ButtonPrimary
                  textButton="Salvar este contato na agenda"
                  onClick={generateAndDownloadVcard}
                  styleProp={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                />

                <ButtonPrimary
                  textButton="Compartilhar contato"
                  variant="secondary"
                  onClick={openModalShareContact}
                  styleProp={{
                    maxWidth: '400px',
                    width: '100%'
                  }}
                />

                <S.ButtonDeleteContact
                  onClick={handleDeleteContact}
                >
                  Excluir contato
                </S.ButtonDeleteContact>

              </S.ContainerButtons>
            </S.ContainerBody>
          </S.ContainerModal>
        </>
      }
    </>
  )
}