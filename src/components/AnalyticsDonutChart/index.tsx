import * as S from "./styles";
import DonutChart from "react-donut-chart";
import { useEffect, useMemo, useState } from "react";
import { generateListIndexShade } from "utils/generate-list-index-shade";
import { Heading } from "components/Typography";
import iconsPattern from "utils/IconsPatterns";

export type AnalyticsDonutChartProps = {
  buttons: Array<{ clicks: number; name: string }>;
};

export default function AnalyticsDonutChart(props: AnalyticsDonutChartProps) {
  const descendingOrderedList = useMemo(() => {
    return props?.buttons.sort((a, b) => b.clicks - a.clicks);
  }, [props.buttons]);

  const totalOfClicks = useMemo(() => {
    return props.buttons.reduce((sum, button) => {
      return sum + button?.clicks;
    }, 0);
  }, [props.buttons]);

  const [currentClickStatus, setCurrentClickStatus] = useState({
    name: "GERAL",
    clicks: totalOfClicks,
  });

  const iconPattern = iconsPattern.find(
    (icon) =>
      icon.value.toLocaleLowerCase() ===
      currentClickStatus?.name?.toLocaleLowerCase()
  );

  useEffect(() => {
    setCurrentClickStatus((state) => {
      if (state?.name === "GERAL") {
        return { name: "GERAL", clicks: totalOfClicks };
      } else return props.buttons.find((button) => button?.name === state?.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.buttons]);

  return (
    <S.Wrapper
      onMouseLeave={() =>
        setCurrentClickStatus({ name: "GERAL", clicks: totalOfClicks })
      }
    >
      <DonutChart
        legend={false}
        width={500}
        clickToggle={false}
        onMouseEnter={(item) =>
          setCurrentClickStatus({ name: item.label, clicks: item.value })
        }
        strokeColor="#FFFFFF"
        data={descendingOrderedList.map((button) => ({
          value: button?.clicks,
          label: button?.name,
        }))}
        colors={descendingOrderedList.map((_, index) =>
          generateListIndexShade({
            index,
            listLength: descendingOrderedList.length,
          })
        )}
        innerRadius={0.75}
        selectedOffset={0.04}
      />
      <S.InnerContent>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          <Heading color="primary" as="span" font="titleXs">
            {currentClickStatus?.name}
          </Heading>
          {iconPattern && (
            <div>
              <iconPattern.icon size={32} color="#FF4C1C" />
            </div>
          )}
        </div>
        <div>
          <Heading as="h3" font="titleMd">
            {currentClickStatus?.clicks}
          </Heading>
          <Heading as="span" font="titleXs">
            cliques
          </Heading>
        </div>
      </S.InnerContent>
    </S.Wrapper>
  );
}
