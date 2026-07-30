import { useCallback, useState } from "react";
import { Text } from "components/Typography";
import { BsPlus, BsDash } from "react-icons/bs";
import * as S from "./styles";

export type AccordionListProps = {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
};

export function AccordionList(props: AccordionListProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  function openAccordion(index: number) {
    return () => {
      if (selectedIndexes.includes(index)) {
        setSelectedIndexes((state) =>
          state.filter((selectedIndex) => selectedIndex !== index)
        );
      } else {
        setSelectedIndexes((state) => [...state, index]);
      }
    };
  }

  return (
    <S.Wrapper>
      {props.items.map((item, index) => {
        const isItemOpen = selectedIndexes.includes(index);
        const isContentString = typeof item.content === "string";

        const buttonTitle = isItemOpen
          ? "Clique para esconder resposta"
          : "Clique para mostrar resposta";

        return (
          <S.Item key={index}>
            <S.ItemHeader>
              <Text as="p" fontWeight="500" className='TextTitleList'>
                {item.title}
              </Text>

              <S.TemporaryIconButton
                asIconButton
                variant="secondary"
                onClick={openAccordion(index)}
                title={buttonTitle}
              >
                {isItemOpen ? <BsDash size={35} /> : <BsPlus size={35} />}
              </S.TemporaryIconButton>
            </S.ItemHeader>

            {isItemOpen && (
              <S.ItemContent>
                {isContentString ? (
                  <Text as="p">{item.content}</Text>
                ) : (
                  item.content
                )}
              </S.ItemContent>
            )}
          </S.Item>
        );
      })}
    </S.Wrapper>
  );
}
