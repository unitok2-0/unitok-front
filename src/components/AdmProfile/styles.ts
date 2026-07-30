import styled from 'styled-components'

interface ColorBannerProps {
  background_url: string;
}

export const ColorBanner = styled.div<ColorBannerProps>`
  height: 8.0625rem;
  width: 100%;
  border-radius: 0.5rem;


  background: ${props => `url("${props.background_url}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarContainer = styled.div`
  display: flex;
  margin-top: 9rem;
  margin-left: 28px;
`

export const AdminContainer = styled.div`
  width: 100%;
  max-width: 23.4375rem;
`

export const Wrapper = styled.div`
  display: flex;
  gap: 7.6875rem;


  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .devices {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`

export const ProfileContainer = styled.div`
  border: 1px solid #EFF2F2;
  border-radius: 0.625rem;
`
