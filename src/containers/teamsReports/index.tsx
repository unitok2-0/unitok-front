import moment from 'moment';
import 'moment/locale/pt-br';
import { useEffect, useState } from 'react';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi'
import ButtonLink from 'components/Buttons/ButtonLink';

import TeamsReportsGraph from './graph';
import { GenericDropdown, GenericDropdownButton, GenericDropdownHeader } from 'components/GenericDropdown';
import useDisclosure from 'hooks/useDisclosure';
import { adminGetContactsGroupedByDate } from 'services/user';

import * as S from './styles';
import { ModalTeamsReportLeads } from 'components/Modals/ModalTeamsReportLeads';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { ModalTeamsReportViews } from 'components/Modals/ModalTeamsReportViews';

moment.locale('pt-br');

const periodsLabelsMap = {
  DAYS: "Dias",
  MONTHS: "Meses",
  YEARS: "Anos"
}

interface GroupedData {
  _id: string;
  count: number
}

interface ITeamsReportsContainerProps {
  groups: TeamsGroupProps[];
  groupedContacts: GroupedData[];
  groupedAnalytics: GroupedData[];
}

export default function TeamsReportsContainer({ groupedAnalytics, groupedContacts: currentGroupedContacts, groups }: ITeamsReportsContainerProps) {
  const dropdownDisclosure = useDisclosure()

  const [sortBy, setSortBy] = useState<"DAYS" | "MONTHS" | "YEARS">("DAYS");

  const [groupedContacts, setGroupedContacts] = useState(currentGroupedContacts);
  const [modalTeamsReportLeadsIsOpen, setModalTeamsReportLeadsIsOpen] = useState(false)
  const [modalTeamsReportViewsIsOpen, setModalTeamsReportViewsIsOpen] = useState(false)

  useEffect(() => {
    adminGetContactsGroupedByDate({ groupedBy: sortBy })
      .then(res => setGroupedContacts(res))
      .catch(e => console.error('Erro ao consultar contatos', e));
  }, [sortBy])

  const contactsQnt = groupedContacts.reduce((total: number, group: { count: number }) => total + group.count, 0)
  const contactsAddedToday = currentGroupedContacts.filter(group => group._id === moment().format('YYYY-MM-DD')).length ?? 0;

  const viewsQuantity = groupedAnalytics.reduce((total: number, group: { count: number }) => total + group.count, 0)
  const todayViews = groupedAnalytics.filter(group => group._id === moment().format('YYYY-MM-DD')).length ?? 0;

  const { length, format, label } = extractGraphDataParams(sortBy);

  const contactsGraphData = new Array(length)
    .fill({ dateString: '', count: 0 })
    .map((_, index) => {
      const dateString = moment().subtract(index, label).format(format);
      const count = groupedContacts.find(group => group._id === dateString)?.count ?? 0
  
      return { dateString, count };
    })
    .reverse();
  
  const graphLabels = contactsGraphData.map(item => getPeriodReadableString(item.dateString, sortBy));
  const graphValues = contactsGraphData.map(item => item.count);
    
  return (
    <S.Container>
      <S.Quantities>
        <S.QuantitiesBox >
          <S.TotalLeads>Total de leads</S.TotalLeads>
          <S.Quantity>
            <h1>{contactsQnt}</h1>
            {contactsAddedToday > 0 
              ? <HiArrowUp size={20} color="#2AC087" />
              : <HiArrowDown size={20} color="red" />
            }
          </S.Quantity>
          <small>{contactsAddedToday} leads captados hoje</small>
          <ButtonLink variant='tertiary' onClick={() => setModalTeamsReportLeadsIsOpen(!modalTeamsReportLeadsIsOpen)}>Ver detalhes</ButtonLink>
        </S.QuantitiesBox>

        <S.QuantitiesBox>
          <span>Total de visualizações de perfis</span>
          <S.Quantity>
            <h1>{viewsQuantity}</h1>
            {todayViews > 0 
              ? <HiArrowUp size={20} color="#2AC087" />
              : <HiArrowDown size={20} color="red" />
            }
          </S.Quantity>
          <small>{todayViews} perfis visualizados hoje</small>
          <ButtonLink variant='tertiary' onClick={() => setModalTeamsReportViewsIsOpen(!modalTeamsReportViewsIsOpen)}>Ver detalhes</ButtonLink>
        </S.QuantitiesBox>
      </S.Quantities>

      <S.SortContent>
        <span style={{ width: "100%" }}>Captação de leads por: </span> 
        <GenericDropdown
            shouldShowContent={dropdownDisclosure.isOpen}
            onClickOutside={dropdownDisclosure.handleClose}
            header={
              <GenericDropdownHeader
                onClick={dropdownDisclosure.handleOpen}
                onMouseEnter={dropdownDisclosure.handleOpen}
                style={{ padding: "0", width: "5rem" }}
              >
                {periodsLabelsMap[sortBy]}
              </GenericDropdownHeader>
            }
          >
            <GenericDropdownButton
              selected={sortBy === "DAYS"}
              onClick={() => setSortBy("DAYS")}
            >
              Dias
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortBy === "MONTHS"}
              onClick={() => setSortBy("MONTHS")}
            >
              Meses
            </GenericDropdownButton>
            <GenericDropdownButton
              selected={sortBy === "YEARS"}
              onClick={() => setSortBy("YEARS")}
            >
              Anos
            </GenericDropdownButton>
          </GenericDropdown>
      </S.SortContent>

      <div>
        <TeamsReportsGraph labels={graphLabels} values={graphValues} />
      </div>
        {
          modalTeamsReportViewsIsOpen &&
          <ModalTeamsReportViews
          modalIsOpen={modalTeamsReportViewsIsOpen} 
          closeModal={() => setModalTeamsReportViewsIsOpen(false)}
          groups={groups}
          ></ModalTeamsReportViews>
         }

        {
          modalTeamsReportLeadsIsOpen &&
          <ModalTeamsReportLeads
          modalIsOpen={modalTeamsReportViewsIsOpen} 
          closeModal={() => setModalTeamsReportLeadsIsOpen(false)}
          groups={groups}
          ></ModalTeamsReportLeads>
         }
    </S.Container>
  )
}

type IExtractGraphDataParams = {
  length: number;
  label: "days" | "months" | "years",
  format: "YYYY-MM-DD" | "YYYY-MM" | "YYYY"
}

function extractGraphDataParams(type: "DAYS" | "MONTHS" | "YEARS"): IExtractGraphDataParams {
  switch (type) {
    case "DAYS":
      return { length: 7, label: "days", format: "YYYY-MM-DD" }
    case "MONTHS":
      return { length: 12, label: "months", format: "YYYY-MM" }
    case "YEARS":
      return { length: 6, label: "years", format: "YYYY" }
  }
}

function getPeriodReadableString(value: string, type: "DAYS" | "MONTHS" | "YEARS") {
  const date = moment(value);

  let readableValue: string = date.format('ddd');

  if(type === "YEARS")
    readableValue = String(date.year());
  if(type === "MONTHS")
    readableValue = date.format('MMM');

  return readableValue.charAt(0).toUpperCase() + readableValue.slice(1);
}
