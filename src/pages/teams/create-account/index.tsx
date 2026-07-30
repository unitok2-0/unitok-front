import { useEffect, useState } from "react";
import styled from 'styled-components'

import ProfileColor from "containers/createEnterprise/profile-color";
import SignUp from "containers/createEnterprise/signup";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";
import { createTeamsAdminUser, createUserWithPetAndActive } from "services/user";

interface AdmUserProps {
  phone?: string;
  email?: string;
  enterpriseName?: string;
  password?: string;
  passwordConfirmation?: string;
  profileColor?: string;
  logoImage?: string;
}

const Wrapper = styled.div`
  background-color: #F5F5F5;
`

export default function CreateAccount() {
  const [step, setStep] = useState(1)
  const [adminUserForms, setAdminUserForms] = useState<AdmUserProps>({})
  const [userDesign, setUserDesign] = useState<AdmUserProps>({
    profileColor: "#00ff8c",
    // logoImage: ""
  })
  const { signIn } = useAuth();

  const { password } = adminUserForms


  const formatPassword = password?.trim();

  const handleNextButton = async () => {
    return setStep((current) => {
      return current + 1;
    })
  }

  const handlePrevButton = async () => {
    return setStep((current) => {
      return current - 1;
    })
  }
  return (
    <Wrapper>
      {
        step === 1 &&
        <SignUp
          setAdminUser={setAdminUserForms}
          handleNextButton={handleNextButton}
        />
      }
      {
        step === 2 &&
        <ProfileColor
          setUserDesign={setUserDesign}
          adminUserForms={adminUserForms}
          handleNextButton={handleNextButton}
          handlePrevButton={handlePrevButton}
        />
      }
    </Wrapper>
  )
}
