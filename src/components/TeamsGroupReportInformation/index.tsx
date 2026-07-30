import Avatar from 'components/Avatar';
import { useEffect, useState } from 'react'
import { Heading, Text } from "components/Typography";
import * as S from './styles'
import { UserMenu } from 'components/UserMenu';
import { getImageUrl } from 'constants/functions';
import { UserProps } from 'domain/User';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { MdAddCircle } from 'react-icons/md';
import { UsersInformationContainer } from 'components/UsersInformationContainer';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { deleteTeamsGroup, updateTeamsGroup } from 'services/teamsGroup';
import { toast } from 'react-toastify';
import useDisclosure from 'hooks/useDisclosure';
import { RiDeleteBinLine } from 'react-icons/ri';
import Input from 'components/Inputs/Input';
import { getUser } from 'services/user';


interface TeamsGroupReportInformationProps {
  
    group: TeamsGroupProps;
    groups: TeamsGroupProps[];
    onRequestListRefresh?: () => {};
    index?: number;
    typeView?: 'leads' | 'views';
}

export function TeamsGroupReportInformation({
  group,
  index,
  typeView,
  onRequestListRefresh
}: TeamsGroupReportInformationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const editGroupModalDisclosure = useDisclosure();
  const router = useRouter()
  
  const [groupName, setGroupName] = useState(group.name);
  const [isBeingRenamed, setIsBeingRenamed] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);

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

  useEffect(() => {
    let views = 0;
    group.members.map(async(member) => {
     let user = await getUser(member._id)
     views = views + user.profileViewsQuantity
     setTotalViews(views)
   })
  }, [])

  useEffect(() => {
    let leads = 0;
    group.members.map(async(member) => {
     let user = await getUser(member._id)
     leads = leads + user.sharedContactsQuantity
     setTotalLeads(leads)
   })
   
  }, [])
  
  return (
    <S.Wrapper>
      <Text>{String(index + 1).padStart(2, '0')}</Text>
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
      {typeView === 'leads' && <Text>{totalLeads}</Text>}
      {typeView === 'views' && <Text>{totalViews}</Text>}

      <S.ButtonOpenModal>
        <img
          src="/assets/iconOpenStand.svg"
          alt=""
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        </S.ButtonOpenModal>

        {
          isMenuOpen &&
          <>
            <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
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
    </S.Wrapper>
  )
}
