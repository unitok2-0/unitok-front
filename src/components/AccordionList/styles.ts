import * as ButtonStyles from "components/Buttons/ButtonPrimary/styles";
import styled from "styled-components";

export const Wrapper = styled.ul`
  > * + * {
    border-top: 1px solid ${(props) => props.theme.colors.gray};
  }
`;

export const Item = styled.li``;

export const ItemHeader = styled.div`
  padding: 1rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > * + * {
    margin-left: 1rem;
  }

  .TextTitleList {
    max-width: 74%;
  }
`;

export const ItemContent = styled.div`
  padding: 1rem 0;
`;

export const TemporaryIconButton = styled(ButtonStyles.Container)`
  height: 3rem;
  width: 3rem;
`;
