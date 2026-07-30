import styled from 'styled-components'


interface TeamsUser {
  profileColor?: string;
  logoImage?: string;
}

interface ActiveProps {
  teamsUser?: TeamsUser;
}

export const CheckBoxWrapper = styled.span<ActiveProps>`
  margin-top: 2rem;

  .link {
    color: ${props => props.teamsUser ? props.teamsUser?.profileColor : "#ff4c1c"};
    text-decoration: underline;
  }

  ${({ teamsUser }) => teamsUser && `
    background: #F5F5F5;
  `}
`

export const CongratulationsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6.5rem;
`
