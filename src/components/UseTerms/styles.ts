import styled from "styled-components";

export const TermsTopicArea = styled.div`
  padding-right: 4rem;
`;

export const TermsUl = styled.ul`
  padding-top: 2rem;
`;

export const TermsLi = styled.li`
  list-style: disc outside none;
  display: list-item;
  margin-left: 2rem;
`;

export const TermsPrimaryColorText = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;