import React, { useState } from 'react'
import { TeamsGroupProps } from 'domain/TeamsGroup'
import Input from "components/Inputs/Input";
import Radio from 'components/Radio'

import * as S from './styles'
import { BiSearch } from 'react-icons/bi'
import ButtonLink from 'components/Buttons/ButtonLink';

export interface ModalTeamsGroupSelectProps {
  closeModal: () => void
  groups: TeamsGroupProps[];
  onGroupSelected?: (group: TeamsGroupProps) => void;
}

const ModalTeamsGroupSelect: React.FC<ModalTeamsGroupSelectProps> = ({
  closeModal,
  groups,
  onGroupSelected
}) => {
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [selectedGroup, setSelectedGroup] = useState<TeamsGroupProps>();

  const handleFilterGroups = (text: string) => {
    if(!text)
      return setFilteredGroups(groups);

    const updatedList = groups.filter(group => group.name.toLowerCase().includes(text.toLocaleLowerCase()));
    setFilteredGroups(updatedList);
  }

  const handleAddUser = () => {
    if(!selectedGroup)
      return;

    onGroupSelected && onGroupSelected(selectedGroup);
  }

  return (
    <>
      <S.Backdrop onClick={closeModal}></S.Backdrop>
      <S.Container>
        <Input
          id="search"
          label="Pesquise por nome"
          rightElement={<BiSearch />}
          onChange={(event) => handleFilterGroups(event.target.value)}
        />
        <S.List>
          {filteredGroups.map(group => (
            <Radio 
              checked={group._id === selectedGroup?._id}
              onClick={() => setSelectedGroup(group)}
            >{group.name}</Radio>
          ))}
        </S.List>

        <ButtonLink
          textButton="Adicionar"
          onClick={handleAddUser}
        />
      </S.Container>
    </>
  )
}

export { ModalTeamsGroupSelect }
