import Avatar from 'components/Avatar';
import { CloseButton } from 'components/CloseButton';
import Input from 'components/Inputs/Input';
import { Heading, Text } from "components/Typography";
import { getImageUrl } from 'constants/functions';
import { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import Modal, { Styles } from 'react-modal';
import { toast } from 'react-toastify';
import { createTeamsGroup } from 'services/teamsGroup';
import { ModalTeamsAddUserInGroup } from '../ModalTeamsAddUserInGroup';

import * as S from './styles';

interface ISelectedUser {
  _id: string;
  full_name: string;
  occupationArea?: string;
  userImage?: string;
  teamsGroup?: {
    name: string
  }
}

export interface ModalTeamsCreateGroupProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  onRequestListRefresh?: () => {};
}

export function ModalTeamsCreateGroup({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  onRequestListRefresh,
}: ModalTeamsCreateGroupProps) {

  const [newGroupName, setNewGroupName] = useState("")
  const [addUserInGroupeIsOpen, setAddUserInGroupeIsOpen] = useState(false)
  const [listUsersSelected, setListUsersSelected] = useState<ISelectedUser[]>([]);

  async function handleCreateGroup(listUsersSelected: ISelectedUser[]) {
    setAddUserInGroupeIsOpen(false)

    if (!newGroupName)
      return;

    try {
      let body = {
        name: newGroupName,
        membersIds: listUsersSelected.map(user => user._id)
      }

      await createTeamsGroup(body);
      onRequestListRefresh && onRequestListRefresh();
      setAddUserInGroupeIsOpen(false);
      closeModal();
      toast.success('Grupo criado com sucesso!')
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className="Modal"
      style={{
        overlay: {
          zIndex: 999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }
      }}
    >
      <S.Wrapper>
        <S.Section>
          <Input
            id="groupName"
            placeholder="Adicionar aqui um nome para o grupo"
            styleContainer={{ borderBottom: "0", width: '20rem' }}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <S.ButtonCreate 
            disabled={newGroupName.length < 1}
            onClick={() => handleCreateGroup(listUsersSelected)}
          >Criar</S.ButtonCreate>
        </S.Section>
        <S.ButtonContainer onClick={() => setAddUserInGroupeIsOpen(true)}>
          <MdAddCircle color="#FF4C1C" size={64} />
          <Text as="p" extendStyle={"color:#FF4C1C"}>Adicionar usuário</Text>
        </S.ButtonContainer>

        <S.UsersList>
          {listUsersSelected.map(user => (
            <S.UserListItem>
              <Avatar imageUrl={getImageUrl(user.userImage)} size={60}></Avatar>
              <div>
                <Text extendStyle={"font-size: 12px; color: #383D3B"}>{user.full_name}</Text>
                <Text extendStyle={"font-size: 10px; font-weight: 300px"}>{user.occupationArea}</Text>
              </div>
            </S.UserListItem>
          ))}
        </S.UsersList>
      </S.Wrapper>

      <ModalTeamsAddUserInGroup
        modalIsOpen={addUserInGroupeIsOpen}
        closeModal={() => setAddUserInGroupeIsOpen(false)}
        onListUsersSelected={selectedUsers => {
          setListUsersSelected(selectedUsers);
          handleCreateGroup(selectedUsers);
        }}
      />
    </Modal>
  )
}
