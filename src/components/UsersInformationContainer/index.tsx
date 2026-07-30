import Avatar from 'components/Avatar';
import { useState } from 'react'
import { Heading, Text } from "components/Typography";
import * as S from './styles'
import { UserMenu } from 'components/UserMenu';
import { getImageUrl } from 'constants/functions';
import { UserProps } from 'domain/User';
import { TeamsGroupProps } from 'domain/TeamsGroup';

interface ISelectedUser {
  _id: string;
  full_name: string;
  occupationArea?: string;
  userImage?: string;
  teamsGroup?: {
    name: string
  }
}

interface UsersInformationContainerProps {
  isAllUsersSelected: boolean;
  listUsersSelected: ISelectedUser[];
  setListUsersSelected: (users: ISelectedUser[]) => void;
  isGroupView?: boolean;
  isAddGroupView?: boolean;
  typeView?: 'leads' | 'views' | 'no-report';
  index?: number;
  user: {
    _id: string;
    full_name: string;
    name?: string;
    occupationArea?: string;
    userImage?: string;
    profileViewsQuantity?: number;
    sharedContactsQuantity?: number;
    status: "ACTIVE" | "INACTIVE";
    teamsGroup?: {
      name: string
    }
  };
  group: {
    _id: string;
    name: string;
  };
  groups?: TeamsGroupProps[];
  onRequestListRefresh?: () => {};
}

export function UsersInformationContainer({
  isAllUsersSelected,
  listUsersSelected,
  setListUsersSelected,
  user,
  group,
  groups,
  onRequestListRefresh,
  isAddGroupView,
  isGroupView,
  typeView,
  index
}: UsersInformationContainerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);

  function toggleSelectedUser(selectedUser: ISelectedUser) {
    setCheckedCheckbox(!checkedCheckbox);
    if (checkedCheckbox) {
      setListUsersSelected(listUsersSelected.filter(user => selectedUser._id !== user._id))
    } else {
      setListUsersSelected([...listUsersSelected, selectedUser]);
    }
    setCheckedCheckbox(!checkedCheckbox);
  }

  return (
    <S.Wrapper 
    isGroupView={isGroupView} 
    isAddGroupView={isAddGroupView}
    typeView={typeView}
    >
      {!isGroupView && typeView === 'no-report' &&
        <S.Checkbox>
          <input type="checkbox"
            checked={isAllUsersSelected ? isAllUsersSelected : checkedCheckbox}
            onChange={() => toggleSelectedUser(user)}
          />
        </S.Checkbox>
      }

      {
        typeView !== 'no-report' &&
        <Text>{String(index + 1).padStart(2, '0')}</Text>
      }

      <Avatar imageUrl={getImageUrl(user.userImage)} size={60}></Avatar>
      <div>
        <Text extendStyle={"font-size: 12px; color: #383D3B"}>{user.full_name}</Text>
        <Text extendStyle={"font-size: 10px; font-weight: 300px"}>{user.occupationArea}</Text>
      </div>
      {!isGroupView && !isAddGroupView &&
        <>
        {typeView === 'no-report' && <Text>{user.teamsGroup?.name}</Text>}
        {typeView === 'leads' ? <Text>{user.sharedContactsQuantity}</Text>: <Text>{user.profileViewsQuantity ?? 0}</Text>}
        </>
      }
      {!isAddGroupView && (
        <S.ButtonOpenModal>
          <img
            src="/assets/iconOpenStand.svg"
            alt=""
            style={{
              cursor: 'pointer',
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />

          {isMenuOpen && (
            <UserMenu
              user={user}
              group={group}
              groups={groups}
              setIsMenuOpen={setIsMenuOpen}
              isGroupView={isGroupView}
              typeView={typeView}
              onRequestListRefresh={onRequestListRefresh}
            />
          )}
        </S.ButtonOpenModal>
      )}
    </S.Wrapper>
  )
}
