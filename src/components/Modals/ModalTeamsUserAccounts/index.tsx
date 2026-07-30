import Avatar from 'components/Avatar';
import ButtonLink from 'components/Buttons/ButtonLink';
import { Heading, Text } from 'components/Typography';
import { getImageUrl } from 'constants/functions';
import { useProfile } from 'contexts/ProfileContext';
import { UserProps } from 'domain/User';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as S from './styles';

interface ContactMenuProps {
  user: UserProps;
  setIsMenuOpen: (value: boolean) => void;
}

export function ModalTeamsUserAccounts({
  user,
  setIsMenuOpen,
}: ContactMenuProps) {
  const router = useRouter()
  
  const { profile, updateProfile } = useProfile()

  const isTeamsADM = user?.roles?.includes("TEAMS_ADMIN");

  const handleUpdateProfile = (selectedProfile: 'USER' | 'TEAMS_ADMIN' | 'PETS') => {
    updateProfile(selectedProfile);

    if(selectedProfile === "USER")
      router.push('/profile/me')
    else if(selectedProfile === "PETS")
      router.push('/profile/mypets')
    else if(selectedProfile === "TEAMS_ADMIN")
      router.push('/teams/enterprise-profile')
  }

  return (
    <>
      <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
      <S.Container>
        <Heading>Seus perfis Unitok:</Heading>
        <div>
          <S.Flex>
            <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
              <Avatar imageUrl={getImageUrl(user?.imageUrl)} size={64} />
              <div>
                <Text extendStyle={"color: #383D3B; font-size: 0.75rem"}>{user?.full_name}</Text>
                <Text extendStyle={"font-weight: 300; color: #01302F; font-size: 0.625rem"}>Perfil pessoal</Text>
              </div>
            </div>
            {
              profile !== "USER" &&
              <ButtonLink
                textButton="Ir para perfil"
                variant="tertiary"
                onClick={() => handleUpdateProfile("USER")}
              />
            }
          </S.Flex>
        </div>

        {
          isTeamsADM &&
          <div>
            <S.Flex>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Avatar imageUrl={getImageUrl(user?.logoImage)} size={64} />
                <div>
                  <Text extendStyle={"color: #383D3B; font-size: 0.75rem"}>{user?.enterpriseName}</Text>
                  <Text extendStyle={"font-weight: 300; color: #01302F; font-size: 0.625rem"}>Administração</Text>
                </div>
              </div>
              {
                profile !== "TEAMS_ADMIN" &&
                <ButtonLink
                  textButton="Ir para perfil"
                  variant="tertiary"
                  onClick={() => handleUpdateProfile("TEAMS_ADMIN")}
                />
              }
            </S.Flex>
          </div>
        }

        <div>
          <S.Flex>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Avatar 
                imageUrl={user.petProfileImage ? getImageUrl(user.petProfileImage) : "/assets/icon_profile_pet.svg"} 
                size={64} 
              />
              <div>
                <Text extendStyle={"color: #383D3B; font-size: 0.75rem"}>{user.petProfileName ?? "Perfil Pets"}</Text>
                <Text extendStyle={"font-weight: 300; color: #01302F; font-size: 0.625rem"}>Pets</Text>
              </div>
            </div>
            {
              profile !== "PETS" &&
              <ButtonLink
                textButton="Ir para perfil"
                variant="tertiary"
                onClick={() => handleUpdateProfile("PETS")}
              />
            }
          </S.Flex>
        </div>
      </S.Container>

    </>
  )
}
