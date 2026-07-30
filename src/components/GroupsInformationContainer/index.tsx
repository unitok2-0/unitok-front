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

interface GroupInformationContainerProps {
  group: TeamsGroupProps;
  groups: TeamsGroupProps[];
  onRequestListRefresh?: () => {};
}

export function GroupsInformationContainer({ group, groups, onRequestListRefresh }: GroupInformationContainerProps) {
  const dropdownDisclosure = useDisclosure();
  const editGroupModalDisclosure = useDisclosure();
  const router = useRouter()

  const [isShowingMembers, setIsShowingMembers] = useState(false)

  const [isActiveSelectedAllUsers, setIsActiveSelectedAllUsers] = useState(false);
  const [listUsersSelected, setListUsersSelected] = useState([]);
  const [createUserGroupIsOpen, setCreateAddUserGroupIsOpen] = useState(false)
  const [addUserGroupIsOpen, setAddUserGroupIsOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("Grupo_1")

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

        <div>
          <GenericDropdown
            maxContentHeight='100vh'
            minContentWidth='100%'
            shouldShowContent={dropdownDisclosure.isOpen}
            isGroupView={true}
            onClickOutside={dropdownDisclosure.handleClose}
            header={
              <GenericDropdownHeader
                onClick={dropdownDisclosure.handleToggle}
                onMouseEnter={dropdownDisclosure.handleToggle}
                style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", backgroundColor: "#FAFAFA", padding: "2rem", position: 'relative' }}
              >
                <S.HeaderGroups>
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

                  <Text as="p" extendStyle={"color: #909692; font-size: 0.75rem"}>{`${group.members.length} usuários`}</Text>
                  <button
                    onClick={(e) => {
                      dropdownDisclosure.handleClose()
                      e.stopPropagation();
                      editGroupModalDisclosure.handleOpen()
                    }}>
                    <div className='icon' style={{ pointerEvents: "none" }}>
                      <FiEdit size={20} color="#FF4C1C" />
                    </div>
                  </button>
                </S.HeaderGroups>
              </GenericDropdownHeader>
            }
          >
            <GenericDropdownButton isGroupView={true}>
              <S.Flex onClick={() => setAddUserGroupIsOpen(!addUserGroupIsOpen)}>
                <MdAddCircle color="#FF4C1C" size={64} />
                <Text as="strong" extendStyle={"color:#FF4C1C"}>Adicionar usuário</Text>
              </S.Flex>
            </GenericDropdownButton>

            {group.members.map(user => (
              <GenericDropdownButton isGroupView={true}
                style={{position: 'relative'}}
                onClick={() => setIsShowingMembers(!isShowingMembers)}
              >
                <UsersInformationContainer
                  user={user}
                  group={{ _id: group._id, name: group.name }}
                  groups={groups}
                  isGroupView={true}
                  isAllUsersSelected={isActiveSelectedAllUsers}
                  listUsersSelected={listUsersSelected}
                  setListUsersSelected={setListUsersSelected}
                  onRequestListRefresh={onRequestListRefresh}
                ></UsersInformationContainer>
              </GenericDropdownButton>
            ))}
          </GenericDropdown>
        </div>
        {editGroupModalDisclosure.isOpen && (
          <>
            <S.Backdrop onClick={editGroupModalDisclosure.handleClose} />
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
        )}

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
