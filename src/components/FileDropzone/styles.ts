import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1.125rem;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px dashed ${(props) => props.theme.colors.grayDark};
  text-align: center;
  border-radius: 10px;

  > * + * {
    margin-top: 1rem;
  }
`;

export const UploadOrangeText = styled.span`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
`;
export const UploadIcon = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 1rem;
`;

export const OriginalFileNameBox = styled.li`
  display: flex;
  justify-content: space-between;
`;

export const OriginalFileName = styled.span`
  color: ${(props) => props.theme.colors.grayDark};
  font: ${(props) => props.theme.fonts.bodySm};
  padding: 0.75rem 0;
  text-decoration: underline;
`;
