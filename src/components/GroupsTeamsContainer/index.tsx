import Avatar from 'components/Avatar';
import { useState } from 'react'
import { Heading, Text } from "components/Typography";
import Input from 'components/Inputs/Input';
import { GenericDropdown, GenericDropdownButton, GenericDropdownHeader } from 'components/GenericDropdown';
import useDisclosure from 'hooks/useDisclosure';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { UsersInformationContainer } from 'components/UsersInformationContainer';
import { MdAddCircle } from 'react-icons/md';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { deleteTeamsGroup, updateTeamsGroup } from 'services/teamsGroup';
import { toast } from 'react-toastify';
import { ModalTeamsAddUserInGroup } from 'components/Modals/ModalTeamsAddUserInGroup';
import { ModalTeamsCreateGroup } from 'components/Modals/ModalTeamsCreateGroup';

import * as S from './styles'
import { useRouter } from 'next/router';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface GroupInformationContainerProps {
  group: TeamsGroupProps;
  groups: TeamsGroupProps[];
  onRequestListRefresh?: () => {};
}

export function GroupTeamsContainer({ group, groups, onRequestListRefresh }: GroupInformationContainerProps) {
  const [membersGroupModalIsOpen, setMembersGroupModalIsOpen] = useState(false)
  const [editGroupModalIsOpen, setEditGroupModalIsOpen] = useState(false)

  const editGroupModalDisclosure = useDisclosure();
  const router = useRouter()

  const [isActiveSelectedAllUsers, setIsActiveSelectedAllUsers] = useState(false);
  const [listUsersSelected, setListUsersSelected] = useState([]);
  const [addUserGroupIsOpen, setAddUserGroupIsOpen] = useState(false)

  const [groupName, setGroupName] = useState(group.name);
  const [isBeingRenamed, setIsBeingRenamed] = useState(false);

  const handleDeleteGroup = async () => {
    try {
      await deleteTeamsGroup(group._id);
      onRequestListRefresh && onRequestListRefresh();
    } catch (e) {
      toast.error('Erro ao excluir grupo');
    }
  }

  const handleUpdateGroupName = async () => {
    try {
      await updateTeamsGroup(group._id, { name: groupName });
      setIsBeingRenamed(false);
    } catch (e) {
      toast.error('Erro ao renomear grupo');
    }
  }

  return (
    <>
      <S.Wrapper>
        <S.Flex extendStyles={"width: 100%; height: 4.5rem; background: #FAFAFA; padding: 0 1.25rem 0 2rem; justify-content: space-between; border-radius: 4px"}>
          <S.Flex>
            {isBeingRenamed ? (
              <Input
                autoFocus
                id={group._id}
                defaultValue={group.name}
                onChange={e => setGroupName(e.target.value)}
                onBlur={handleUpdateGroupName}
                onKeyPress={e => e.key === "Enter" && handleUpdateGroupName()}
              />
            ) : (
              <Text extendStyle={"margin-right: auto; font-weight: 500;"}>{groupName}</Text>
            )}
          </S.Flex>

          <S.Flex extendStyles={"gap: 1rem"}>
            <Text
              extendStyle={"color:#909692"}
            >
              {group.members.length > 1 ? `${group.members.length} usuários` : `${group.members.length} usuário`}
            </Text>
            <button
              onClick={() => setEditGroupModalIsOpen(!editGroupModalIsOpen)}
            >
              <FiEdit size={20} color="#FF4C1C" />
            </button>

            <button
              onClick={() => setMembersGroupModalIsOpen(!membersGroupModalIsOpen)}
            >
              {membersGroupModalIsOpen === false ? <BsChevronDown size={20} color="#FF4C1C" /> : <BsChevronUp size={20} color="#FF4C1C" />}
            </button>
          </S.Flex>
        </S.Flex>



        {
          membersGroupModalIsOpen &&
          <>
            {/* <S.Backdrop onClick={() => setMembersGroupModalIsOpen(false)}></S.Backdrop> */}
            <S.MembersModal>
              <S.Flex
                onClick={() => setAddUserGroupIsOpen(!addUserGroupIsOpen)}
                extendStyles={"padding-bottom: 0.5rem; border-bottom: 1px solid #EFF2F2; z-index: 9999; gap: 1rem;"}
              >
                <MdAddCircle color="#FF4C1C" size={64} />
                <Text as="strong" extendStyle={"color:#FF4C1C; font-weight: 500"}>Adicionar usuário</Text>
              </S.Flex>
              {
                group.members.map(member => (
                  <UsersInformationContainer
                    key={member._id}
                    user={member}
                    group={{ _id: group._id, name: group.name }}
                    groups={groups}
                    isGroupView={true}
                    isAllUsersSelected={isActiveSelectedAllUsers}
                    listUsersSelected={listUsersSelected}
                    setListUsersSelected={setListUsersSelected}
                    onRequestListRefresh={onRequestListRefresh}
                    typeView="no-report"
                  ></UsersInformationContainer>
                ))
              }
            </S.MembersModal>
          </>
        }
        {
          editGroupModalIsOpen &&
          <>
            <S.Backdrop onClick={() => setEditGroupModalIsOpen(false)}></S.Backdrop>
            <S.EditGroupModal>
              <button
                onClick={() => router.push({
                  pathname: "/teams/enterprise-profile/set-patterns",
                  query: {
                    id: group._id,
                    label: group.name,
                    isGroup: true,
                  },
                })}>
                <FiEdit size={20} />
                <p>Definir botões</p>
              </button>

              <button
                onClick={() => {
                  setIsBeingRenamed(true);
                  editGroupModalDisclosure.handleClose();
                }}
              >
                <FiEdit size={20} />
                <p>Editar nome</p>
              </button>
              <button
                onClick={handleDeleteGroup}
              >
                <RiDeleteBinLine size={20} />
                <p>Excluir grupo</p>
              </button>
            </S.EditGroupModal>
          </>
        }

        <ModalTeamsAddUserInGroup
          onRequestListRefresh={onRequestListRefresh}
          modalIsOpen={addUserGroupIsOpen}
          closeModal={() => setAddUserGroupIsOpen(false)}
          groupId={group._id}
        />
      </S.Wrapper>
    </>
  )
}
