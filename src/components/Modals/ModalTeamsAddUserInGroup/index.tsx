import ButtonLink from 'components/Buttons/ButtonLink';
import { CloseButton } from 'components/CloseButton';
import Input from 'components/Inputs/Input';
import { Heading, Text } from "components/Typography";
import { UsersInformationContainer } from 'components/UsersInformationContainer';
import { useAuth } from 'contexts/AuthContext';
import { UserProps } from 'domain/User';
import { FormEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdAddCircle } from 'react-icons/md';
import Modal, { Styles } from 'react-modal';
import { toast } from 'react-toastify';
import { addUsersToTeamsGroup, createTeamsGroup } from 'services/teamsGroup';
import { getUser, getUsers } from 'services/user';

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

export interface ModalTeamsAddUserInGroupProps {
  onListUsersSelected?: (users: ISelectedUser[]) => void;
  groupId?: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  onRequestListRefresh?: () => {};
}

export function ModalTeamsAddUserInGroup({
  modalIsOpen,
  closeModal,
  onListUsersSelected,
  groupId,
  onRequestListRefresh
}: ModalTeamsAddUserInGroupProps) {

  const [users, setUsers] = useState<UserProps[]>([])
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'all' | 'full_name' | 'group' | 'profileViewsQuantity' | 'createdAt'>()
  const [isActiveSelectedAllUsers, setIsActiveSelectedAllUsers] = useState(false);
  const [listUsersSelected, setListUsersSelected] = useState<ISelectedUser[] | any>([]);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
  const { user: admin } = useAuth()

  useEffect(() => {
    if (!admin?._id)
      return;

    getUsers({
      administratorId: admin._id,
      search,
      limit: 10,
      skip: (page - 1) * 10,
      sortBy,
      direction: sortBy === 'profileViewsQuantity' ? "DESC" : "ASC"
    })
      .then(res => setUsers(res.payload))
      .catch(err => console.error('Erro ao buscar usuários', err))
  }, [page, admin?._id, sortBy, search])

  const handleToggleSelectedAllUser = async () => {
    setIsActiveSelectedAllUsers(!isActiveSelectedAllUsers)
    const newListUsers = [];

    if (!isActiveSelectedAllUsers) {
      for await (let user of users) {
        newListUsers.push(user)
      }

      setListUsersSelected(newListUsers)
    } else {
      setListUsersSelected([])
    }
  }

  const searchUsers = (searchValue: string) => {
    setSearch(searchValue)
    users.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
    })
  }

  async function checkIfUserAlreadyHasAGroup(userData: ISelectedUser) {
    const user = await getUser(userData._id)
    if(user.teamsGroup) {
      setListUsersSelected([])
      closeModal();
      toast.error(`o usuario ${user.full_name} já é membro de um grupo`)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!listUsersSelected)
      return

    if (groupId) {
      listUsersSelected.map(async (id) => checkIfUserAlreadyHasAGroup(id))
      try {
        let body = {
          groupId,
          membersIds: listUsersSelected.map(user => user._id)
        }

        await addUsersToTeamsGroup(body)
        onRequestListRefresh && onRequestListRefresh();
        setListUsersSelected([])
        closeModal();
      } catch (error) {
        toast.error(error);
        onRequestListRefresh && onRequestListRefresh();
      }
      return
    }
    onListUsersSelected && onListUsersSelected(listUsersSelected)
  }

  useEffect(() => {
    setFilteredUsers(users.filter(user => !user.teamsGroup))
  },[users])

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="Modal"
      style={{
        overlay: {
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }
      }}
    >
      <CloseButton closeModal={closeModal} />
      <S.Form onSubmit={handleSubmit}>
        <S.Section>
          <Input
            id="search"
            label="Pesquise por nome, e-mail, telefone"
            rightElement={<BiSearch />}
            style={{ minWidth: "20rem" }}
            onChange={(event) => searchUsers(event.target.value)}
          />
        </S.Section>
        <div>
          {search === '' && (
            <S.Flex>
              <S.Checkbox>
                <input type="checkbox"
                  checked={isActiveSelectedAllUsers ? isActiveSelectedAllUsers : checkedCheckbox}
                  onClick={handleToggleSelectedAllUser}
                />
              </S.Checkbox>

              <Text extendStyle={"color: #383D3B; font-weight: 500"}>Todos</Text>
            </S.Flex>
          )}
          {filteredUsers.map((user: UserProps) => (
            <UsersInformationContainer
              key={user._id}
              user={user}
              group={{ _id: user.teamsGroup?.groupId, name: user.teamsGroup?.name }}
              isAddGroupView={true}
              isGroupView={false}
              isAllUsersSelected={isActiveSelectedAllUsers}
              listUsersSelected={listUsersSelected}
              setListUsersSelected={setListUsersSelected}
              typeView="no-report"
            />
          ))}
        </div>

        <ButtonLink
          textButton='Adicionar'
          type="submit"
          styleProp={"width: 20rem; text-align: center"}
        ></ButtonLink>
      </S.Form>
    </Modal>
  )
}
