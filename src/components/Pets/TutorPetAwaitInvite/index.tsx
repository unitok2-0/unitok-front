import { getImageUrl } from "constants/functions";
import { useState } from "react";
import { ModalTutorPet } from "../ModalTutorPet";
import Router from "next/router";

import * as S from "./styles";
import { useAuth } from "contexts/AuthContext";

interface TutorPetContainerProps {
  invite: any;
  tutor?: any;
}

// console.log(tutor.)

export function TutorPetAwaitInvite({ invite, tutor }: TutorPetContainerProps) {
  const [modalTutorPetIsOpen, setModalTutorPetIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <S.Container>
      <S.ImgContainer>
        <img src={getImageUrl(invite?.receiver?.userImage)} alt="" />
      </S.ImgContainer>
      <S.Name>
        <strong>{invite?.receiver?.full_name}</strong>
        <p>Aguardando a confirmação do tutor</p>
      </S.Name>
    </S.Container>
  );
}
