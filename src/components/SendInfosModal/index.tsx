import Modal, { MainModalProps } from "components/Modals/MainModal";
import * as S from "./styles";
import { Heading } from "components/Typography";
import Input from "components/Inputs/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { CloseButton } from "components/CloseButton";
import { sendContact } from "services/user";
import { toast } from "react-toastify";
import { useState } from "react";
import { formatUrlWeb, getFileName } from "constants/functions";
import Screen from 'utils/getScreenSize'
import IconAddCircle from '/public/assets/add_circle.svg';
import LogoUnitok from '/public/assets/logo_unitok_red.svg';


export type SendInfoModalProps = MainModalProps & {
  userName: string;
  codeId: string;
};


type FormData = {
  full_name: string;
  email: string;
  phone: string;
  job?: string;
  company?: string;
  file?: any;
  linkedin?: string;
  instagram?: string;
}

const schema = yup.object({
  full_name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  job: yup.string(),
  company: yup.string(),
  note: yup.string(),
  linkedin: yup.string(),
  instagram: yup.string()
})

export function SendInfosModal(props: SendInfoModalProps) {
  const [screenWidth, setScreenWidth] = useState<number>()
  const [showMoreInputs, setShowMoreInputs] = useState(false);
  const { register, handleSubmit, clearErrors, formState, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });



  const { errors, isSubmitting } = formState


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

  const sendLead = handleSubmit(async (data: any) => {

    try {
      const formData = new FormData();

      if (data?.file) {
        let file = data.file;
        const name = `files/${getFileName(file.name)}`;
        file.path = name;
        formData.append("picture", file);
      }
      //TODO
      /* if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.longitude);
          console.log(position.coords.latitude);
          
        });
      } */

      formData.append("userId", props.codeId);
      formData.append("prefix", "files/");
      formData.append("email", data.email);
      formData.append("full_name", data.full_name);
      formData.append("phone", data.phone);
      formData.append("job", data.job);
      formData.append("company", data.company);
      /* formData.append("instagram", formatUrlWeb(data.instagram, 'instagram.com'));
      formData.append("linkedin", formatUrlWeb(data.linkedin, 'linkedin.com/in')); */


      const response = await sendContact(formData);
      props.closeModal()
      toast.success(response.message);
      setShowMoreInputs(false)
      reset()
    } catch (error) {
      toast.error(error.error)
    }

  })

  async function onDropImage(file: any) {
    try {
      setValue('file', file);
      const fileTemporary = await readUploadFileAsText(file);
      document.getElementById("contact-image").setAttribute('src', fileTemporary)

    } catch (error) {
      console.log(error)
    }
  }

  function removeImage() {
    setValue('file', undefined);
    document.getElementById("contact-image").setAttribute('src', "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png")
  }

  return (
    <>
      <Screen setWidth={setScreenWidth} />
      <Modal
        modalIsOpen={props.modalIsOpen}
        closeModal={props.closeModal}
        customStyles={{
          overlay: {
            padding: screenWidth <= 600 ? 0 : '2rem',
            /* alignItems: screenWidth <= 600 ? 'flex-end' : 'center', */

          },
          content: {
            borderRadius: screenWidth <= 600 ? 0 : '10px',
          }
        }}
      >

        <S.Wrapper>


          <CloseButton closeModal={props.closeModal} id="close-btn-desktop" />
          {screenWidth <= 600 && (
            <div className="close-container">
              <CloseButton closeModal={props.closeModal} id="close-btn-mobile" withIcon />
            </div>

          )}
          <Heading
            style={{
              color: '#FF4C1C',
              fontWeight: '500',
              fontSize: '1.2rem',
            }}
          >
            Envie seus contatos para {props.userName}
          </Heading>
          <S.FormWrapper onSubmit={sendLead} id="lead-form">
            <S.ProfileImage>
              <img src="https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png" id="contact-image" alt="" />
              <input onChange={(e) => onDropImage(e.target.files[0])} name="file" type="file" id="contact-image-input" style={{ display: 'none' }} />
              <div className="buttons-wrapper">
                <ButtonPrimary type="button">
                  <label htmlFor="contact-image-input">Selecionar Foto</label>
                </ButtonPrimary>
                <ButtonPrimary onClick={removeImage} type="button" variant="tertiary">
                  Excluir foto
                </ButtonPrimary>
              </div>
            </S.ProfileImage>
            <Input
              id="full_name"
              label="Nome completo"
              name="full_name"
              onClick={() => clearErrors('full_name')}
              errorMessage={errors.full_name?.message}
              {...register('full_name')}
            />
            <Input
              id="email"
              label="Digite seu e-mail"
              name="email"
              onClick={() => clearErrors('email')}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Telefone"
              type="tel"
              name="phone"
              id="phone"
              autoFocus={true}
              {...register("phone")}
              onPhoneChange={(phone) => setValue('phone', phone)}
              errorMessage={errors?.phone?.message}
              onClick={() => clearErrors("phone")}
            />
            <Input
              id="company"
              label="Digite o nome da empresa (opcional)"
              name="company"
              onClick={() => clearErrors('company')}
              errorMessage={errors.company?.message}
              {...register('company')}
            />
            <Input
              id="job"
              label="Digite seu cargo (opcional)"
              name="job"
              onClick={() => clearErrors('job')}
              errorMessage={errors.job?.message}
              {...register('job')}
            />

            {showMoreInputs && (
              <>
                <Input
                  id="linkedin"
                  label="Linkedin"
                  name="Linkedin"
                  onClick={() => clearErrors('linkedin')}
                  errorMessage={errors.linkedin?.message}
                  {...register('linkedin')}
                />
                <Input
                  id="instagram"
                  label="Instagram"
                  name="instagram"
                  onClick={() => clearErrors('instagram')}
                  errorMessage={errors.instagram?.message}
                  {...register('instagram')}
                />

              </>
            )}


            {/* {!showMoreInputs && (
              <ButtonPrimary
                variant="tertiary"
                type="button"
                style={{
                  margin: 'auto',
                  marginTop: '1rem',
                  maxWidth: '200px',
                  width: '100%',
                }}
                onClick={() => setShowMoreInputs(!showMoreInputs)}
              >
                Adicionar mais
              </ButtonPrimary>
            )} */}

            <ButtonPrimary
              type="submit"
              style={{
                margin: 'auto',
                marginTop: '1rem',
                maxWidth: '200px',
                width: '100%',
              }}
              loading={isSubmitting}
            >
              Enviar
            </ButtonPrimary>
          </S.FormWrapper>
        </S.Wrapper>
      </Modal>
    </>
  );
}
