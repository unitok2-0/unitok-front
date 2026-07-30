import { toast } from 'react-toastify';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FiUser, FiEdit, FiUsers } from 'react-icons/fi'
import { BiLockAlt } from 'react-icons/bi'
import { GrPowerCycle } from 'react-icons/gr'

import { getUser } from 'services/user';
import { generateVcard } from 'constants/functions';
import { blockUsers, resetQRCodes } from 'services/internManagement';
import { ModalTeamsGroupSelect } from 'components/Modals/ModalTeamsGroupSelect';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { addUserToTeamsGroup, removeUserFromTeamsGroup, updateUserTeamsGroup } from 'services/teamsGroup';
import IconChangeGroup from '../../../public/assets/icon_svg_change.svg';

import * as S from './styles';
import { RiDeleteBinLine } from 'react-icons/ri';
import { HiOutlineRefresh } from 'react-icons/hi';

type IUser = {
  name?: string
  _id: string;
  full_name: string;
  userImage?: string;
  status: "ACTIVE" | "INACTIVE";
  teamsGroup?: {
    name: string;
  }
}

interface ContactMenuProps {
  user: IUser;
  group: {
    _id: string;
    name: string;
  };
  groups: TeamsGroupProps[];
  setIsMenuOpen: (value: boolean) => void;
  isGroupView?: boolean;
  onRequestListRefresh?: () => {};
  typeView?: string;
}

export function UserMenu({
  user,
  group,
  groups,
  setIsMenuOpen,
  isGroupView = false,
  onRequestListRefresh,
  typeView
}: ContactMenuProps) {
  const [isAddToGroupOpen, setIsAddToGroupOpen] = useState(false)
  const router = useRouter()

  const blockUser = async () => {
    try {
      await blockUsers({ usersIds: [user._id], revert: user.status === "INACTIVE" })
      onRequestListRefresh && onRequestListRefresh();
    } catch (e) {
      toast.error('Erro ao alterar usuário');
    }
  }

  const resetDevice = async () => {
    try {
      const fullUser = await getUser(user._id);
      await resetQRCodes({ qrcodes: fullUser?.profileCode, deleteUsers: false })
      toast.success('Usuário resetado com sucesso!');
    } catch (e) {
      toast.error('Erro ao resetar usuário');
    }
  }

  const handleGroupSelected = async (group: TeamsGroupProps) => {
    try {
      const selectedFunction = (user.teamsGroup || isGroupView)
        ? updateUserTeamsGroup
        : addUserToTeamsGroup;

      await selectedFunction({ userId: user._id, groupId: group._id });
      toast.success('Usuário adicionado com sucesso!');
      onRequestListRefresh && onRequestListRefresh();
    } catch (e) {
      console.error('Erro ao adicionar usuário', e);
      toast.error('Erro ao adicionar usuário ao grupo');
    } finally {
      setIsAddToGroupOpen(false);
      setIsMenuOpen(false);
    }
  }

  const handleRemoveUserFromGroup = async () => {
    try {
      await removeUserFromTeamsGroup({ userId: user._id, groupId: group._id })
      onRequestListRefresh && onRequestListRefresh();
    } catch (e) {
      toast.error('Erro ao remover usuário do grupo');
    }
  }

  return (
    <>
      <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
      <S.Container typeView={typeView}>
        <button onClick={() => window.open(`/${user?.name}`, '_blank')}>
          <div className='icon'>
            <FiUser size={20} />
          </div>
          <p>Ver perfil público</p>
        </button>

        <button onClick={() => Router.push(`/teams/enterprise-profile/edit-buttons/${user?._id}`)}>
          <div className='icon'>
            <FiEdit size={20} />
          </div>
          <p>Editar botões</p>
        </button>

        <button onClick={blockUser}>
          <div className='icon'>
            <BiLockAlt size={20} />
          </div>
          <p>{user.status === "INACTIVE" ? "Desbloquear" : "Bloquear"}</p>
        </button>

        <button onClick={resetDevice}>
          <div className='icon'>
            <HiOutlineRefresh size={20} />
          </div>
          <p>Resetar dispositivo</p>
        </button>

        <button onClick={() => setIsAddToGroupOpen(true)}>
          <div className='icon'>
            {(user.teamsGroup || isGroupView)
              ? <IconChangeGroup size={20} />
              : <FiUsers size={20} />
            }
          </div>
          <p>{(user.teamsGroup || isGroupView) ? 'Mudar de grupo' : 'Adicionar a um grupo'}</p>
        </button>
        {isGroupView && (
          <button onClick={handleRemoveUserFromGroup}>
            <div className='icon'>
              <RiDeleteBinLine size={20} />
            </div>
            <p>Excluir do grupo</p>
          </button>
        )}
      </S.Container>

      {isAddToGroupOpen && (
        <ModalTeamsGroupSelect
          groups={groups}
          closeModal={() => setIsAddToGroupOpen(false)}
          onGroupSelected={handleGroupSelected}
        />
      )}
    </>
  )
}
