import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import Input from 'components/Inputs/Input';
import Modal, { Styles } from 'react-modal';
import * as S from './styles';
import * as yup from "yup";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { usePet } from 'contexts/PetContext';
import { toast } from 'react-toastify';

interface ModalButtonsPetInputsProps {
  modalIsOpen: boolean
  afterOpenModal?: () => void
  closeModal: () => void
  customStyles?: Styles;
  icon: string;
  type: string;
  name: string;
  tutor: any;
  buttons: Array<{
    type: string;
    value: string;
  }>
  setButtons: (parameter: any) => void;
  closeTwoModal: () => void;
  setTutors: any;
}

export function ModalButtonsPetInputs({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  icon,
  type,
  name,
  tutor,
  buttons,
  setButtons,
  closeTwoModal,
  setTutors,
}: ModalButtonsPetInputsProps) {
  const { handleUpdateTutor, pet } = usePet();

  const [SMS, setSMS] = useState<string>(tutor?.sms?.value);
  const [email, setEmail] = useState<string>(tutor?.email?.value);
  const [phone, setPhone] = useState<string>(tutor?.phone?.value);
  const [whatsapp, setWhatsApp] = useState<string>(tutor?.whatsapp?.value);

  const [loading, setIsLoading] = useState<boolean>(false);
  const [inputMain, setInputMain] = useState<any>();
  
  function returnInput(type: string) {
    if (type === 'sms') {
      return <Input
        id="sms"
        type="tel"
        placeholder="(27) 99999-9999"
        style={{ width: '100%' }}
        styleContainer={{ width: '100%' }}
        onPhoneChange={(phone) => {
          setSMS(phone)
          setInputMain(phone)
        }}
        value={SMS}
        onChange={(e) => {
          setSMS(e.target.value)
          setInputMain(e.target.value)
        }}
      />
    }

    if (type === 'whatsapp') {
      return <Input
        id="whatsapp"
        type="tel"
        placeholder="(27) 99999-9999"
        onPhoneChange={(phone) => {
          setWhatsApp(phone)
          setInputMain(phone)
        }}
        style={{ width: '100%' }}
        styleContainer={{ width: '100%' }}
        value={whatsapp}
        onChange={(e) => {
          setWhatsApp(e.target.value)
          setInputMain(e.target.value)
        }}
      />
    }

    if (type === 'phone') {
      return <Input
        id="phone"
        type="tel"
        placeholder="(27) 99999-9999"
        style={{ width: '100%' }}
        styleContainer={{ width: '100%' }}
        value={phone}
        onPhoneChange={(phone) => {
          setPhone(phone)
          setInputMain(phone)
        }}
        onChange={(e) => {
          setPhone(e.target.value)
          setInputMain(e.target.value)
        }}
      />
    }

    if (type === 'email') {
      return <Input
        id="email"
        placeholder="example@example.com"
        style={{ width: '100%' }}
        styleContainer={{ width: '100%' }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setInputMain(e.target.value)
        }}
      />
    }
  }

  async function updatedButtonValue() {
    setIsLoading(true) 

    const data: any = {
      petId: pet?._id,
      tutorId: tutor?.tutorId?._id
    }

    data[type] = { enable: true, value: inputMain ?? tutor[type]?.value };

    try {
      const response = await handleUpdateTutor(data);
      setTutors(response.tutors);
      toast.success('Para salvar, clique no botão "Salvar alterações"')
      closeModal();
     /*  closeTwoModal(); */
    } catch (error) {
      toast.warning(error)
    }

    setIsLoading(false)
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

      <S.MainModal>
        <S.Container>

          <S.Icon>
            <img src={icon} alt="" />
            {name}
          </S.Icon>


          {returnInput(type)}


          <S.ContainerButtons>
            <ButtonPrimary
              styleProp={{
                maxWidth: '300px',
                width: '100%'
              }}
              loading={loading}
              onClick={updatedButtonValue}
            >
              Salvar
            </ButtonPrimary>

            {/* <S.ButtonDisabled>Desativar botão</S.ButtonDisabled> */}
          </S.ContainerButtons>

        </S.Container>
      </S.MainModal>
    </Modal>
  )
}