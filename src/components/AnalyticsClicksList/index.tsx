import { Text } from "components/Typography";
import { useMemo } from "react";
import * as S from "./styles";
import { generateListIndexShade } from "utils/generate-list-index-shade";

export type AnalyticsClicksListProps = {
  buttons: Array<{
    clicks: number;
    name: string;
  }>;
};

export default function AnalyticsClicksList(props: AnalyticsClicksListProps) {
  const descendingOrderedButtonsList = useMemo(() => {
    return props.buttons.sort((a, b) => b.clicks - a.clicks);
  }, [props.buttons]);

  return (
    <S.Wrapper>
      {descendingOrderedButtonsList.map((button, index) => (
        <S.ListItem key={button?.name}>
          <div>
            <span
              className="circle"
              style={{
                background: generateListIndexShade({
                  index,
                  listLength: props?.buttons.length,
                }),
              }}
            />
            {
              button?.name &&
              <Text as="strong">
              {
                button?.name[0] + button?.name.slice(1).toLocaleLowerCase()
              }
            </Text>
            }
          </div>
          <Text as="span" fontWeight="500" title="Contagem de cliques">
            {button?.clicks}
          </Text>
        </S.ListItem>
      ))}
    </S.Wrapper>
  );
}
