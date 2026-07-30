import { useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

import { DropzoneProps } from "components/Dropzone/DropzoneComponent";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { getFileName, getUserImageUrl } from "constants/functions";
import { ProfileBanner } from "components/ProfileBanner";
import { useAuth } from "contexts/AuthContext";

import * as S from "./styles";

export type ProfileImageDropzoneProps = Pick<
  DropzoneProps,
  "onFileAdded" | "prefix"
> & {
  accept?: string;
  displayImageSrc?: string;
  displayImageAlt?: string;
  isAddLoading?: boolean;
  isRemoveLoading?: boolean;
  onRemove?: () => void;
  shouldEditBanner?: boolean;
  styleContainer?: CSSProperties;
};

export default function ProfileImageDropzone(props: ProfileImageDropzoneProps) {
  const [haveImageSrc, setHaveImageSrc] = useState(false);

  const shouldEditBanner = props.shouldEditBanner ?? true;

  useEffect(() => {
    switch (props.displayImageSrc) {
      case '/images/image_pet_default.png':
        setHaveImageSrc(false);
        break;
      case 'https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png':
        setHaveImageSrc(false);
        break;
      default:
        setHaveImageSrc(true);
        break;
    }

  }, [props.displayImageSrc])

  const { imageTemporary } = useAuth()

  const readUploadFileAsText = async (file) => {
    var oFReader = new FileReader();

    return new Promise<any>((resolve, reject) => {
      // var url = window.URL.createObjectURL(file);
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
        console.log(error);
      }

      props.onFileAdded(file, fileTemporary);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onFileAdded]
  );
  return (
    <>
      <S.Wrapper style={props.styleContainer}>
        {shouldEditBanner && <ProfileBanner />}
        <S.ProfileAndButtons>
          <S.ImageContainer id="imageProfileEdit" title="Imagem de perfil" img_src={props.displayImageSrc ? getUserImageUrl(props.displayImageSrc) : "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png"}>
          </S.ImageContainer>

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
              disabled={!haveImageSrc}
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
