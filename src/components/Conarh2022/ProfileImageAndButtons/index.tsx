import { useAuthConarh } from "contexts/AuthConarhContext";
import { ChangeEvent, useEffect, useState } from "react";
import { EventType } from "react-hook-form";
import { toast } from "react-toastify";
import { deleteExhibitorImage, updateExhibitorImage } from "services/exhibitor";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";

import { InformationUser, ProfileImage, SendImageInputStyles } from "./styles";

interface ProfileImageAndButtonsProps {
  src: string;
}

export default function ProfileImageAndButtons({ src }: ProfileImageAndButtonsProps) {

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<any>()
  const [loadingBtnImage, setLoadingBtnImage] = useState(false);
  const [loadingDeleteImage, setLoadingDeleteImage] = useState(false);
  const { user, handleUpdateImage } = useAuthConarh();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    try {
      setLoadingBtnImage(true)
      await updateExhibitorImage({ exhibitorId: user._id, file: e.target.files[0] });
      toast.success('Clique no botão "Salvar Alterações" para salvar a imagem');
    } catch (error) {
      toast.error("Falha ao atualizar imagem.");
    } finally {
      setLoadingBtnImage(false);
    }

    setSelectedFile(e.target.files[0])
  }

  const deleteProfileImage = async () => {
    try {
      setLoadingDeleteImage(true);
      await deleteExhibitorImage({ exhibitorId: user._id });
      handleUpdateImage('https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png');
      toast.success("Imagem excluida");
    } catch (error) {
      toast.error("Falha ao excluir imagem.");
    } finally {
      setLoadingDeleteImage(false);
    }
  }

  return (
    <InformationUser>
      <ProfileImage img_src={preview || src}>

      </ProfileImage>

      <div>
        <ButtonPrimary
          as="label"
          formTarget=""
          styleProp={SendImageInputStyles}
          loading={loadingBtnImage}
        >
          <input type="file" onChange={onSelectFile} accept="image/*" />
          Editar imagem
        </ButtonPrimary>
        <ButtonPrimary
          onClick={deleteProfileImage}
          loading={loadingDeleteImage}
          textButton={"Excluir imagem"}
          styleProp={{
            background: '#FFFFFF',
            color: '#FF4C1C',
            border: '1px solid #FF4C1C',
            width: '12.188rem',
            height: '2.5rem',
            fontSize: '0.938rem'
          }}
        />
      </div>
    </InformationUser>
  )
}