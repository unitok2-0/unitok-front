import SpinnerLoader from "components/Loaders/SpinnerLoader";
import MainModal, { MainModalProps } from "components/Modals/MainModal";
import Profile from "components/Profile";
import { UserProps } from "domain/User";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPublicProfileUser } from "services/user";

import * as S from "./styles";

export type ProfileModalProps = MainModalProps & {
  codeId: string;
  bannerChildren?: React.ReactElement;
};

export default function ProfileModal(props: ProfileModalProps) {
  const [user, setUser] = useState<UserProps>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPublicProfileUser(props.codeId);
        setUser(response.user);
      } catch {
        toast.error("Erro ao buscar perfil");
        props.closeModal();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.codeId]);

  return (
    <MainModal {...props}>
      <S.Wrapper className="light-custom-scrollbar">
        {user ? (
          <Profile user={user} bannerChildren={props.bannerChildren} />
        ) : (
          <S.SpinnerContainer>
            <SpinnerLoader colorSpinner="#FF4C1C" sizeSpinner={48} />
          </S.SpinnerContainer>
        )}
      </S.Wrapper>
    </MainModal>
  );
}
