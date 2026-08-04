import { useState } from 'react';
import { ModalButtonsPetInputs } from '../ModalButtonsPetInputs';
import { Text } from "components/Typography";
import { toast } from 'react-toastify';
import { usePet } from 'contexts/PetContext';

import useDisclosure from 'hooks/useDisclosure';
import Modal, { Styles } from 'react-modal';
import * as S from './styles';

interface ModalButtonsPetProps {
  tutor: any;
  modalIsOpen: boolean
  afterOpenModal?: () => void
  closeModal: () => void
  customStyles?: Styles;
  setTutors: any;
}

export function ModalButtonsPet({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  tutor,
  setTutors,
}: ModalButtonsPetProps) {
  const modalButtonsPet = useDisclosure();
  const { handleUpdateTutor, pet } = usePet();

  // SMS desativado como canal de aviso (produto passou a notificar só por email/telefone/whatsapp).
  // Item mantido comentado para religar facilmente se voltarmos a oferecer SMS.
  const buttonsData = [
    { type: 'phone', icon: '/assets/icon_telephone_circle.svg', name: 'Ligação', value: tutor?.phone?.value, active: tutor?.phone?.enable },
    { type: 'email', icon: '/assets/icon_circle_email.svg', name: 'E-mail', value: tutor?.email?.value, active: tutor?.email?.enable },
    { type: 'whatsapp', icon: '/assets/icon_circle_whatsapp.svg', name: 'WhatsApp', value: tutor?.whatsapp?.value, active: tutor?.whatsapp?.enable },
    // { type: 'sms', icon: '/assets/icon_circle_sms.svg', name: 'SMS', value: tutor?.sms?.value, active: tutor?.sms?.enable },
  ]

  const [buttons, setButtons] = useState(buttonsData);
  const [buttonIconModal, setButtonIconModal] = useState<string>("");
  const [buttonType, setButtonType] = useState<string>("");
  const [buttonName, setButtonName] = useState<string>("");

  function handleOpenModal(buttonIcon: string, buttonType: string, buttonName: string) {
    setButtonIconModal(buttonIcon);
    setButtonType(buttonType);
    setButtonName(buttonName);
    modalButtonsPet.handleOpen();
  }

  async function toggleActiveButton(index: number, buttonType: any) {
    const newListButtons = [...buttons];
    
    const dataJSON = `{
      "petId": "${pet?._id}", 
      "tutorId": "${tutor?.tutorId?._id}", 
      "${buttonType}": { "enable": ${!newListButtons[index].active}, "value": "${tutor?.[buttonType]?.value ?? ""}" } 
    }`
    const data = JSON.parse(dataJSON);

    try {
      await handleUpdateTutor(data);
      newListButtons[index].active = !newListButtons[index].active;
      setButtons(newListButtons);

      toast.success('Para salvar, clique no botão "Salvar alterações"')
    } catch (error) {
      toast.warning('Erro ao ativar ou desativar o botão')
    }
  }

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.Container>
        <Text style={{ fontWeight: '500', margin: '2rem 0', fontSize: '1.1rem' }}>
          Escolha como quer receber o aviso <br /> caso o pet seja encontrado.
        </Text>

        {buttons.map((button, index) => (
          <S.ContainerButton key={index} isActive={button.active}>

            <div className="icon">
              <img src={button.icon} alt="" />
            </div>

            <div className="name">{button.name}</div>

            <div
              className="toggleActive"
              onClick={() => toggleActiveButton(index, button.type)}
            >
              {button.active ? 'Desativar' : 'Ativar'}
            </div>

            <button
              className="iconEdit"
              disabled={button.active ? false : true}
              onClick={() => handleOpenModal(button.icon, button.type, button.name)}
            >
              <img
                src="/assets/icon_edit_red.svg"
                alt="Botão editar"
              />
            </button>

          </S.ContainerButton>
        ))}

        <ModalButtonsPetInputs
          closeTwoModal={closeModal}
          setButtons={setButtons}
          buttons={buttons}
          tutor={tutor}
          icon={buttonIconModal}
          type={buttonType}
          name={buttonName}
          closeModal={modalButtonsPet.handleClose}
          modalIsOpen={modalButtonsPet.isOpen}
          setTutors={setTutors}
        />

      </S.Container>
    </Modal>
  )
}