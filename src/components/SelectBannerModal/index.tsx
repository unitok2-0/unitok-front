import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from 'react-dropzone'

import ButtonLink from "components/Buttons/ButtonLink";
import Modal from "components/Modals/MainModal";
import { Text } from "components/Typography";
import { useAuth } from "contexts/AuthContext";
import { usePet } from "contexts/PetContext";
import { handleGetPetIdBanner } from "services/pet";
import ImageCropper from "components/ImageCropper/Cropper";
import getCroppedImg from 'utils/cropImage';

import * as S from "./styles";

export type SelectBannerModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  setUpdatingImage: (value: boolean) => void;
  uploadReceiver: "USER" | "PET";
  pet?: any;
  setBannerPet?: (parameter: string) => void;
};

export default function SelectBannerModal(props: SelectBannerModalProps) {

  const { handleUpdateProfilePetBanner } = usePet();
  const { updateProfileBanner } = useAuth();

  const [cropperImage, setCropperImage] = useState<string | null>();
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [formDataState, setFormDataState] = useState<any>();

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  useEffect(() => {
    if (props.modalIsOpen === false) {
      setShowCropper(false);
      setCropperImage(null);
    }
  }, [props.modalIsOpen])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  async function updateImageCropper() {
    try {
      props.closeModal();
      props.setUpdatingImage(true);

      const croppedImage = await getCroppedImg(
        cropperImage,
        croppedAreaPixels,
      )

      const formData = new FormData();
      formData.append("picture", croppedImage);
      formData.append("prefix", "files/");

      if (props.uploadReceiver === "USER") {
          let fileTemporary = undefined;
          try {
            fileTemporary = await readUploadFileAsText(croppedImage);
            document.getElementById("bannerUpdateProfile").style.background = `url(${fileTemporary}) no-repeat center`
            document.getElementById("bannerUpdateProfile").style.backgroundSize = "cover"
          } catch (error) {
          }

        await updateProfileBanner(formData);
      } else if (props.uploadReceiver === "PET") {
        const pet = await handleUpdateProfilePetBanner({ formData, petId: props.pet?._id });
        props.setBannerPet(pet.bannerImage)
      }

      toast.success("Banner atualizado com sucesso.");
      props.setUpdatingImage(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setShowCropper(false);
    }
  }

  const readUploadFileAsText = async (file) => {
    var oFReader = new FileReader();

    return new Promise<any>((resolve, reject) => {
      oFReader.onload = async function (oFREvent) {
        resolve(oFREvent?.target?.result);
      };

      oFReader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    let file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("prefix", "files/");

    setFormDataState(formData);
    try {
      props.closeModal();
      props.setUpdatingImage(true);

      if (props.uploadReceiver === "USER") {
        let fileTemporary = undefined;
        try {
          fileTemporary = await readUploadFileAsText(file);
          document.getElementById("bannerUpdateProfile").style.background = `url(${fileTemporary}) no-repeat center`
          document.getElementById("bannerUpdateProfile").style.backgroundSize = "cover"
        } catch (error) {
        }

        await updateProfileBanner(formData);
      } else if (props.uploadReceiver === "PET") {

        const url = document.URL.split('/')
        const profileCodePet = url[url.length - 1]

        const idPet = await handleGetPetIdBanner({ profileCodePet: profileCodePet })

        const petData = await handleUpdateProfilePetBanner({
          formData,
          petId: idPet
        });

        let fileTemporary = undefined;
        try {
          fileTemporary = await readUploadFileAsText(file);
          document.getElementById("bannerUpdatePet").style.background = `url(${fileTemporary}) no-repeat center`
          document.getElementById("bannerUpdatePet").style.backgroundSize = "cover"
        } catch (error) {
        }
        props.setBannerPet(petData?.bannerImage)
      }

      toast.success("Banner atualizado com sucesso.");
    } catch (error) {
      toast.error(error);
    } finally {
      setTimeout(() => {
        props.setUpdatingImage(false);
      }, 3000)
    }
  }, [handleUpdateProfilePetBanner, props, updateProfileBanner]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: ["image/jpeg", "image/png", "image/gif", "image/jpg"] })


  return (
    <>
      <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal}>
        <S.Wrapper>
          <ButtonLink
            styleProp={S.CloseButtonStyle}
            variant="tertiary"
            onClick={() => props.closeModal()}
          >
            Fechar
          </ButtonLink>

          <div className="close-btn">
            <ButtonLink
              styleProp={S.CloseButtonWithIcon}
              variant="tertiary"
              onClick={() => props.closeModal()}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.00127 1L17.0003 16.999" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16.9988 1.00049L0.999799 16.9995" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

            </ButtonLink>
          </div>

          <S.Content>
            <div {...getRootProps({
              'aria-label': 'arraste a imagem para a área',
            })} className="dropzone">
              <input {...getInputProps()} />
              <p>Faça upload do arquivo aqui</p>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9999 12.0002V15.3334C16.9999 15.7755 16.8126 16.1994 16.4792 16.5119C16.1458 16.8245 15.6936 17.0001 15.2221 17.0001H2.77768C2.30619 17.0001 1.854 16.8245 1.52061 16.5119C1.18721 16.1994 0.999908 15.7755 0.999908 15.3334V12.0002" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.4435 5.16772L8.99904 1.00115L4.5546 5.16772" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.99783 1.00004L8.99783 10.9998" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <Text className="sizes-text">Tamanho recomendado: 600px de largura ou mais.</Text>
          </S.Content>
        </S.Wrapper>
      </Modal >
      <Modal modalIsOpen={showCropper} closeModal={props.closeModal}>
        <S.CropperWrapper style={{ background: "#7f7f7f" }}>
          <ButtonLink
            styleProp={S.CloseButtonStyle}
            variant="tertiary"
            onClick={() => props.closeModal()}
          >
            Fechar
          </ButtonLink>

          <ImageCropper
            yourImage={cropperImage}
            onCropComplete={onCropComplete}
          />

          <S.ButtonsWrapper>
            <ButtonLink
              textButton="Voltar"
              styleProp={{ 
                background: 'white', 
                color: '#FF4C1C',
                fontWeight: '500',
              }}
              onClick={() => setShowCropper(false)}
            />

            <ButtonLink
              textButton="Salvar"
              onClick={updateImageCropper}
            />
          </S.ButtonsWrapper>
        </S.CropperWrapper>
      </Modal>
    </>
  );
}
