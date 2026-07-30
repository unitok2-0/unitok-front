import styled from "styled-components";

export const PrivacyTopicArea = styled.div`
  padding-right: 4rem;
`;

export const PrivacyUl = styled.ul`
  padding: 2rem 0;
`;

export const PrivacyLi = styled.li`
  list-style: disc outside none;
  display: list-item;
  margin-left: 2rem;
`;

export const PrivacyPrimaryColorText = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;