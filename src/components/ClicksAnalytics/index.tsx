import dynamic from "next/dynamic";
import { useState } from "react";
import AnalyticsClicksList from "components/AnalyticsClicksList";
import Radio from "components/Radio";
import {
  GenericDropdown,
  GenericDropdownHeader,
} from "components/GenericDropdown";
import { Heading, Text } from "components/Typography";
import useDisclosure from "hooks/useDisclosure";
import { GetUserAnalyticsFilters } from "services/analytics";
import * as S from "./styles";

import AnalyticsDonutChart from 'components/AnalyticsDonutChart';

// const AnalyticsDonutChart = dynamic(
//   () => import("components/AnalyticsDonutChart")
// );

const filterLabels: Record<GetUserAnalyticsFilters, string> = {
  TODAY: "Hoje",
  YESTERDAY: "Ontem",
  LAST_7_DAYS: "Últimos 7 dias",
  LAST_30_DAYS: "Últimos 30 dias",
};

export type ClicksAnalyticsProps = {
  buttons: Array<{
    name: string;
    clicks: number;
  }>;
  initialFilterState?: GetUserAnalyticsFilters;
  onFilterChange?: (
    filter: GetUserAnalyticsFilters,
    dateRange?: any
  ) => Promise<void>;
};

export default function ClicksAnalytics(props: ClicksAnalyticsProps) {
  const [filter, setFilter] = useState<GetUserAnalyticsFilters>(
    props.initialFilterState || "TODAY"
  );

  function handleFilter(filter: GetUserAnalyticsFilters) {
    setFilter(filter);
    props.onFilterChange?.(filter);
  }

  return (
    <S.Wrapper>
      <div>
        <Heading font="titleSm" fontWeight="500">
          Total de cliques
        </Heading>
        <div style={{ width: "max-content" }}>
          <GenericDropdown
            header={
              <GenericDropdownHeader>
                {filterLabels[filter]}
              </GenericDropdownHeader>
            }
          >
            <div
              style={{
                padding: "1rem",
                width: "max-content",
                display: "grid",
                gap: "0.5rem",
              }}
            >
              {Object.entries(filterLabels).map(([key, label]) => (
                <Radio
                  key={key}
                  checked={filter === key}
                  onChange={() => {
                    handleFilter(key as GetUserAnalyticsFilters);
                  }}
                  name="analytics_period"
                >
                  {label}
                </Radio>
              ))}
            </div>
          </GenericDropdown>
        </div>
      </div>

      <S.ChartGrid>
        <S.ChartContainer>
          <AnalyticsDonutChart buttons={props.buttons} />
          <Text font="bodySm">
            Passe o mouse pelo gráfico para ver os cliques de cada botão
          </Text>
        </S.ChartContainer>

        <AnalyticsClicksList buttons={props.buttons} />
      </S.ChartGrid>
    </S.Wrapper>
  );
}
