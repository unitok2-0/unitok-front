import * as S from "./styles";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

import { getFileName } from "constants/functions";
import { useCallback, useEffect, useState } from "react";
import { ProfileBannerPet } from "../ProfileBannerPet";
import { DropzoneProps } from "components/Dropzone/DropzoneComponent";
import { usePet } from "contexts/PetContext";


export type ProfileImageDropzoneAndBannerProps = Pick<
  DropzoneProps,
  "onFileAdded" | "prefix"
> & {
  accept?: string;
  displayImageSrc?: string;
  displayImageAlt?: string;
  pet: any;
  isAddLoading?: boolean;
  isRemoveLoading?: boolean;
  onRemove?: () => void;
  activeRemoveImage: boolean;
};

export default function ProfileImageDropzoneAndBanner(props: ProfileImageDropzoneAndBannerProps) {
  const [isNotHavePhoto, setIsNotHavePhoto] = useState<boolean>();

  useEffect(() => {
    if (props.activeRemoveImage) {
      setIsNotHavePhoto(true)
    } else {
      setIsNotHavePhoto(false)
    }
  }, [props.activeRemoveImage])

  const readUploadFileAsText = async (file) => {
    var oFReader = new FileReader();

    return new Promise<any>((resolve, reject) => {
      oFReader.onload = async function (oFREvent) {
        resolve(oFREvent?.target?.result);
      };

      oFReader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async (file: any) => {
      const name = props.prefix
        ? `files/${props.prefix}/${getFileName(file.name)}`
        : `files/${getFileName(file.name)}`;

      file.path = name;

      let fileTemporary = undefined;
      try {
        fileTemporary = await readUploadFileAsText(file);
        //@ts-ignore
        document.getElementById("imageProfileEdit").style.background = `url(${fileTemporary}) no-repeat center`
        document.getElementById("imageProfileEdit").style.backgroundSize = "cover"
      } catch (error) {
      }

      props.onFileAdded(file, fileTemporary);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onFileAdded]
  );

  return (
    <>
      <S.Wrapper>
        <ProfileBannerPet />
        <S.ProfileAndButtons>
          {!isNotHavePhoto &&
            <S.ImageContainer
              id="imageProfileEdit"
              title="Imagem de perfil"
              img_src={props.displayImageSrc}
            >
            </S.ImageContainer>
          }
          {isNotHavePhoto &&
            <S.ImageContainer
              id="imageProfileEdit"
              title="Imagem de perfil"
              img_src="/assets/icon_default_avatar_pet.png"
            >
            </S.ImageContainer>
          }
          <S.ButtonsGrid>
            {props.isAddLoading ? (
              <ButtonPrimary fullWidth loading={true}></ButtonPrimary>
            ) : (
              <>
                <input
                  type="file"
                  name="fileUpload"
                  id="fileUpload"
                  className="fileUpload"
                  style={{ display: "none" }}
                  onChange={(e) => onDrop(e.target.files[0])}
                ></input>
                <ButtonPrimary fullWidth loading={props.isAddLoading}>
                  <label htmlFor="fileUpload">Editar foto</label>
                </ButtonPrimary>
              </>
            )}

            <ButtonPrimary
              disabled={props.activeRemoveImage}
              variant="tertiary"
              loading={props.isRemoveLoading}
              onClick={props.onRemove}
            >
              Excluir foto
            </ButtonPrimary>
          </S.ButtonsGrid>
        </S.ProfileAndButtons>
      </S.Wrapper>

    </>
  );
}
