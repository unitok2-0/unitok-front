import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ProfileTypes = 'USER' | 'TEAMS_ADMIN' | 'PETS' | 'ADMIN';

type ProfileContextProps = {
  profile: ProfileTypes;
  updateProfile: (profile: ProfileTypes) => void;
}

const ProfileContext = createContext({} as ProfileContextProps);

type ProfileProviderProps = {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfile] = useState<ProfileTypes>('USER');

  useEffect(() => {
    setProfile(() => {
      let profileOnStorage = localStorage.getItem('unitok.profile') as ProfileTypes;

      if(!profileOnStorage)
        profileOnStorage = 'USER';
      
      localStorage.setItem('unitok.profile', profileOnStorage);
      return profileOnStorage;
    })
  }, [])

  function updateProfile(selectedProfile: ProfileTypes) {
    setProfile(selectedProfile)
    localStorage.setItem('unitok.profile', selectedProfile);
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext);