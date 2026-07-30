import { Text } from "components/Typography";
import styled from "styled-components";

export const Wrapper = styled.div`
  > * + * {
    border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  }
`;

export const CardInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const PersonalizationBox = styled.div`
  width: 100%;

  margin-top: 1rem;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.grayLighter};
`;

export const Personalization = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.white};
  width: 100%;

  padding: 2rem;
  display: grid;
  gap: 2rem;
`;

export const AddNameOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
`;

export const PersonaliaztionUpload = styled.div`
  display: grid;
  gap: 3rem;

  p {
    margin-bottom: 1rem;
  }
`;

export const NumberDot = styled(Text)`
  display: grid;
  place-items: center;
  font-weight: 500;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${(props) => props.theme.colors.grayLight};
`;
