import Modal, { Styles } from "react-modal";
import { Text } from "components/Typography";
import { useEffect, useState } from "react";
import { getImageUrl } from "constants/functions";
import { toast } from "react-toastify";

import * as S from "./styles";
import Input from "components/Inputs/Input";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { getUserTutor } from "services/user";
import { addPetInTutor } from "services/pet";
import { Pet, usePet } from "contexts/PetContext";
import { ContainerTutorCheckbox } from "../ContainerTutorCheckbox";
import { handleCreateInviteTutorNotification } from "services/notification";
import { useAuth } from "contexts/AuthContext";

interface ModalAddTutorProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  onHandleSetTutorsAwait?: () => void;
  pet: Pet;
  setTutors: (parameter: any) => void;
}

export function ModalAddTutor({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  pet,
  onHandleSetTutorsAwait,
  setTutors,
}: ModalAddTutorProps) {
  const [inputPhoneTutor, setInputPhoneTutor] = useState("");

  const [loadingAddTutor, setLoadingAddTutor] = useState(false);
  const [loadingSearchTutor, setLoadingSearchTutor] = useState(false);

  const [listAllTutors, setListAllTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!modalIsOpen) {
      setListAllTutors([]);
      setSelectedTutors([]);
    }
  }, [modalIsOpen]);

  async function searchTutor(phone: string) {
    setLoadingSearchTutor(true);

    try {
      const tutor = await getUserTutor({ phone });

      const tutorIsExist = listAllTutors.find(
        (tutorData) => tutorData._id === tutor._id
      );
      if (tutorIsExist) return toast.warning("Este usuário já foi selecionado");

      const tutorIsExistInPet = pet?.tutors.find(
        (list) => list?.tutorId?._id === tutor._id
      );
      if (tutorIsExistInPet)
        return toast.warning("Este usuário já é tutor do pet");

      if (onHandleSetTutorsAwait) {
        onHandleSetTutorsAwait();
      }

      setListAllTutors([...listAllTutors, tutor]);
    } catch (error) {
      toast.error("Não existe nenhum usuário com este número");
    } finally {
      setInputPhoneTutor("");
      setLoadingSearchTutor(false);
    }
  }

  async function handleAddTutorInPet() {
    setLoadingAddTutor(true);

    try {
      /* const petData = await addPetInTutor({ tutorId: selectedTutors, petId: pet?._id }); */
      await handleCreateInviteTutorNotification({
        petId: pet?._id,
        sender: {
          senderType: "USER",
          senderUser: user?._id,
        },
        receiver: selectedTutors,
        notificationData: {
          typeNotification: "INVITE",
          referenceId: pet?._id,
        },
      });
      toast.success(
        "O convite para ser tutor foi enviado com sucesso para os usuários!"
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingAddTutor(false);
      closeModal();
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
      <S.MainContainer isSelectedTutor={listAllTutors.length >= 1}>
        <S.DividerContainer>
          <Text fontWeight="500" style={{ marginBottom: "2rem" }}>
            Busque e selecione até 4 perfis para <br /> serem tutores
          </Text>

          <Input
            id="addTutor"
            placeholder="Digite o número de celular"
            type="tel"
            value={inputPhoneTutor}
            onPhoneChange={(phone) => setInputPhoneTutor(phone)}
            onChange={(e) => setInputPhoneTutor(e.target.value)}
          />

          <ButtonPrimary
            textButton="Pesquisar"
            onClick={() => searchTutor(inputPhoneTutor)}
            disabled={inputPhoneTutor.length <= 0}
            loading={loadingSearchTutor}
            style={{
              marginTop: "2rem",
              width: "100%",
            }}
          />
        </S.DividerContainer>

        {listAllTutors.length >= 1 && (
          <S.DividerContainer>
            <Text
              fontWeight="500"
              style={{ marginBottom: "1.5rem", marginTop: "2.5rem" }}
            >
              Perfis
            </Text>

            {listAllTutors.map((tutor) => (
              <ContainerTutorCheckbox
                key={tutor?._id}
                tutor={tutor}
                listAllTutors={listAllTutors}
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
              />
            ))}

            <ButtonPrimary
              textButton="Adicionar"
              style={{ width: "100%" }}
              loading={loadingAddTutor}
              onClick={handleAddTutorInPet}
            />
          </S.DividerContainer>
        )}
      </S.MainContainer>
    </Modal>
  );
}
