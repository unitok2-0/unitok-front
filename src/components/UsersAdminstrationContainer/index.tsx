import { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";

import { GenericDropdown, GenericDropdownButton, GenericDropdownHeader } from "components/GenericDropdown";
import Input from "components/Inputs/Input";
import { Heading, Text } from "components/Typography";
import { UsersInformationContainer } from "components/UsersInformationContainer";
import { UserProps } from "domain/User";
import useDisclosure from "hooks/useDisclosure";
import { getUser, getUsers } from "services/user";
import { TeamsGroupProps } from "domain/TeamsGroup";
import { adminDeleteUsers, getTeamsGroups } from "services/teamsGroup";
import { blockUsers, resetQRCodes } from "services/internManagement";
import { Pagination } from "components/Pagination";

import * as S from './styles'

interface SortDataProps {
  field: 'full_name' | 'group' | 'profileViewsQuantity' | 'createdAt';
  direction: 'ASC' | 'DESC';
}

interface PaginationProps {
  total: number;
  offset?: number;
  limit?: number;
}

interface UsersAdminstrationContainerProps {
  noPagination?: boolean
  admin: UserProps;
  groups: TeamsGroupProps[];
  typeView?: 'leads' | 'views' | 'no-report';
}

export function UsersAdminstrationContainer({ admin, typeView, noPagination}: UsersAdminstrationContainerProps) {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [isActiveSelectedAllUsers, setIsActiveSelectedAllUsers] = useState(false);
  const [listUsersSelected, setListUsersSelected] = useState<any>([]);
  const [users, setUsers] = useState<UserProps[]>([]) // to be fetched and define type
  const [pagination, setPagination] = useState<PaginationProps>({ total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState<TeamsGroupProps[]>([]);

  const [sortData, setSortData] = useState<SortDataProps>({ field: 'createdAt', direction: 'DESC' })

  const itemsPerPage = noPagination ? Infinity : 10;

  const refreshList = useCallback(async () => {
    getUsers({
      administratorId: admin._id,
      search,
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sortBy: sortData.field,
      direction: sortData.direction
    })
      .then(res => {
        setUsers(res.payload)
        setPagination(res.pagination)
      })
      .catch(err => console.error('Erro ao buscar usuários', err))
  }, [admin?._id, itemsPerPage, page, search, sortData.direction, sortData.field])

  useEffect(() => {
    if (!admin?._id)
      return;
    refreshList();
  }, [page, admin?._id, search, refreshList]);

  const refreshGroup = useCallback(async () => {
    try {
      const res = await getTeamsGroups({
        administratorId: admin?._id,
        name: search ? search : undefined
      });
      setGroups(res.payload);
    } catch (e) {
      console.error('Erro ao consultar lista de grupos', e);
    }
  }, [admin?._id, search])

  useEffect(() => {
    if (admin?._id)
      refreshGroup();
  }, [admin?._id, search, refreshGroup])

  const handleToggleSelectedAllUser = async () => {
    setIsActiveSelectedAllUsers(!isActiveSelectedAllUsers)
    const newListUsers = [];

    if (!isActiveSelectedAllUsers) {
      for await (let user of users) {
        newListUsers.push(user._id)
      }

      setListUsersSelected(newListUsers)
    } else {
      setListUsersSelected([])
    }
  }

  const handleUpdateSortBy = (field: 'full_name' | 'group' | 'profileViewsQuantity' | 'createdAt') => {
    let sortInfo: SortDataProps = { field, direction: 'ASC' };
    if(field === 'profileViewsQuantity' || field === "createdAt")
      sortInfo['direction'] = 'DESC'
    setSortData(sortInfo);
  }

  const handleRemoveUserFromTeamsGroup = async () => {
    try {
      await adminDeleteUsers(listUsersSelected)
      toast.success('usuário deletado com sucesso')
      refreshList();
    } catch (e) {
      toast.error('erro ao deletar usuário(s)')
    }
  }

  const resetDevice = async () => {
    try {
      listUsersSelected.map(async user => {
        const fullUser = await getUser(user._id);
        await resetQRCodes({ qrcodes: fullUser?.profileCode, deleteUsers: false })
        refreshList();
      })
      toast.success('Dispositivos resetados com sucesso!');
    } catch (e) {
      toast.error('Erro ao resetar dispositivo');
    }
  }

  const blockUser = async () => {
    try {
      await blockUsers({ usersIds: [listUsersSelected], revert: listUsersSelected.status === "INACTIVE" })
        refreshList();

      toast.success('Usuário bloqueado com sucesso!');
    } catch (e) {
      toast.error('Erro ao alterar usuário');
    }
  }

  return (
    <>
      <S.Flex style={{ justifyContent: "space-between" }}>
        <Input
          id="search"
          label="Pesquise por nome, e-mail, telefone"
          rightElement={<BiSearch />}
          styleContainer={{ width: "100%", maxWidth: "346px" }}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div>
          <GenericDropdown
            minContentWidth='14.375rem'
            shouldShowContent={isOpen}
            onClickOutside={handleClose}
            header={
              <GenericDropdownHeader
                onClick={handleOpen}
                onMouseEnter={handleOpen}
                style={{ padding: "0" }}
              >
                Ordenar por
              </GenericDropdownHeader>
            }
          >
            <GenericDropdownButton
              selected={sortData.field === "full_name"}
              onClick={() => handleUpdateSortBy("full_name")}
            >
              Nome
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortData.field === "group"}
              onClick={() => handleUpdateSortBy("group")}
            >
              Grupo
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortData.field === "profileViewsQuantity"}
              onClick={() => handleUpdateSortBy("profileViewsQuantity")}
            >
              Visualizações de perfil
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortData.field === "createdAt"}
              onClick={() => handleUpdateSortBy("createdAt")}
            >
              Ativações mais recentes
            </GenericDropdownButton>
          </GenericDropdown>
        </div>
      </S.Flex>

      <S.HeaderTable typeView={typeView}>
        {
          typeView === 'no-report' &&
          <S.Checkbox>
          <input type="checkbox"
            checked={isActiveSelectedAllUsers ? isActiveSelectedAllUsers : checkedCheckbox}
            onChange={handleToggleSelectedAllUser}
          />
          </S.Checkbox>
        }
        <Text extendStyle={"padding-right: 3rem"} fontWeight="500">Usuários</Text>
        {typeView === 'no-report' && <Text fontWeight="500">Grupo</Text>}
        {typeView === 'leads' ? <Text fontWeight="500">Leads capturados</Text> : <Text fontWeight="500">Visualizações no perfil</Text>}
      </S.HeaderTable>

      <S.ContentContainer typeView={typeView}>
        {users.map((user: UserProps, index: number) => (
          <UsersInformationContainer
            key={user._id}
            user={user}
            group={{ _id: user.teamsGroup?.groupId, name: user.teamsGroup?.name }}
            groups={groups}
            isAllUsersSelected={isActiveSelectedAllUsers}
            listUsersSelected={listUsersSelected}
            setListUsersSelected={setListUsersSelected}
            onRequestListRefresh={refreshList}
            typeView={typeView}
            isGroupView={false}
            index={index}
          />
        ))}
        <Pagination
          page={page} 
          total={pagination.total} 
          limit={itemsPerPage}
          onPageSelected={setPage}
          containerStyle={{ marginTop: "3rem" }}
        />
      </S.ContentContainer>

      <S.ContainerButtonsOptions isActive={listUsersSelected.length > 0 || isActiveSelectedAllUsers ? true : false}>
        <S.ButtonsExport onClick={blockUser}>
          <p>Bloquear</p>
        </S.ButtonsExport>

        <S.ButtonsExport onClick={resetDevice}>
          <p>Resetar</p>
        </S.ButtonsExport>

        <S.ButtonsExport onClick={handleRemoveUserFromTeamsGroup}>
          <p>Excluir</p>
        </S.ButtonsExport>
      </S.ContainerButtonsOptions>
    </>
  )
}
