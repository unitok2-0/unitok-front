import { AdmProfile } from 'components/AdmProfile';
import ButtonLink from 'components/Buttons/ButtonLink';
import TransformeButton from 'components/Buttons/TransformeButton';
import { EnterpriseGroupsContainer } from 'components/EnterpriseGroupsContainer';
import { UsersAdminstrationContainer } from 'components/UsersAdminstrationContainer';
import { useAuth } from 'contexts/AuthContext';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { useState } from 'react';
import styled from 'styled-components';
import * as S from './styles'

interface ModalTeamsReportLeadsProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  groups: TeamsGroupProps[];
}

interface ViewButtonProps {
  isActive: boolean;
}

export const Flex = styled.div`
  display: flex;
  margin-top: 4rem;
`

export const ViewButton = styled.button<ViewButtonProps>`
  width: 50%;
  border-bottom: ${props => props.isActive ? "3px solid #FF4C1C" : "3px solid #C4C4C4"};
  color: ${props => props.isActive ? "#FF4C1C" : "#909692"};
  padding-bottom: 0.2rem;
`

export function ModalTeamsReportLeads({modalIsOpen, closeModal, groups}: ModalTeamsReportLeadsProps) {
  const [viewActive, setViewActive] = useState("users")
  const { user } = useAuth()

  const handleClickUsers = () => {
    setViewActive("users")
  }
  
  const handleClickGroups = () => {
    setViewActive("groups")
  }

  return(
    <>
    <S.Backdrop onClick={closeModal}></S.Backdrop>
    <S.Wrapper>
    <button 
      onClick={closeModal}
      className="close_button"
    >
      Fechar
    </button>
    
        <Flex>
          <ViewButton isActive={viewActive === 'users'} onClick={handleClickUsers}>Usuários</ViewButton>
          <ViewButton isActive={viewActive === 'groups'} onClick={handleClickGroups}>Grupos</ViewButton>
        </Flex>

        {viewActive === "users"
          ? <UsersAdminstrationContainer
              admin={user} 
              groups={groups} 
              typeView="leads"
              noPagination={true}
            />
          : <EnterpriseGroupsContainer admin={user} typeView="leads"/>
        }
    </S.Wrapper>
    </>
  )
}