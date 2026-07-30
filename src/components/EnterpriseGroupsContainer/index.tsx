import ButtonLink from 'components/Buttons/ButtonLink'
import { GroupsInformationContainer } from 'components/GroupsInformationContainer'
import { GroupTeamsContainer } from 'components/GroupsTeamsContainer'
import Input from 'components/Inputs/Input'
import { ModalTeamsCreateGroup } from 'components/Modals/ModalTeamsCreateGroup'
import { TeamsGroupReportInformation } from 'components/TeamsGroupReportInformation'
import { TeamsGroupProps } from 'domain/TeamsGroup'
import { UserProps } from 'domain/User'
import { useCallback, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { getTeamsGroups } from 'services/teamsGroup'
import { Heading, Text } from "components/Typography";
import * as S from './styles'

type IEnterpriseGroupsContainerProps = {
  admin: UserProps
  typeView?: 'leads' | 'views' | 'no-report';
}

export function EnterpriseGroupsContainer({ admin, typeView }: IEnterpriseGroupsContainerProps) {
  const [groups, setGroups] = useState<TeamsGroupProps[]>([]);
  const [search, setSearch] = useState<string>();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false)


  const refreshList = useCallback(async () => {
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
      refreshList();
  }, [admin?._id, search, refreshList])

  return (
    <S.Wrapper>
      <S.InputsContainer>
      <Input
          id="search"
          label="Pesquise por nome"
          rightElement={<BiSearch />}
          styleContainer={{ width: "100%", maxWidth: "346px" }}
          onChange={(event) => setSearch(event.target.value)}
        />
        {
          typeView === 'no-report' &&
          <ButtonLink
          textButton="Criar novo grupo"
          styleProp={"width: 21.625rem"}
          onClick={() => setIsCreateGroupModalOpen(!isCreateGroupModalOpen)}
        >
        </ButtonLink>
        }
      </S.InputsContainer>

      {
        isCreateGroupModalOpen &&
        <ModalTeamsCreateGroup
          modalIsOpen={isCreateGroupModalOpen}
          closeModal={() => setIsCreateGroupModalOpen(false)}
          onRequestListRefresh={() => refreshList()}
        />
      }
      {
        typeView === 'leads' && (
          <S.HeaderTable>
            <Text fontWeight="500">Grupo</Text>
            <Text fontWeight="500">Leads captados</Text>
          </S.HeaderTable>
        )
      }

{
        typeView === 'views' && (
          <S.HeaderTable>
            <Text fontWeight="500">Grupo</Text>
            <Text fontWeight="500">Visualizações no perfil</Text>
          </S.HeaderTable>
        )
      }

      {
        typeView === 'no-report' ? 
        groups.map(group => (
          <GroupTeamsContainer
            key={group._id}
            group={group}
            groups={groups}
            onRequestListRefresh={() => refreshList()}
          />
        )) : 
        groups.map((group, index) => (
          <TeamsGroupReportInformation
            key={group._id}
            group={group}
            groups={groups}
            onRequestListRefresh={() => refreshList()}
            index={index}
            typeView={typeView}
          />
        ))
      }
    </S.Wrapper>
  )
}
