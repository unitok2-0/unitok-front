import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import Input from 'components/Inputs/Input';
import MapPage from 'components/Map';
import Modal, { Styles } from 'react-modal';
import * as yup from "yup";
import * as S from './styles';

import { Heading, Text } from 'components/Typography';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { useForm, SubmitHandler } from "react-hook-form";
import { Pet, usePet } from 'contexts/PetContext';
import { TutorPetContainer } from '../TutorPetContainer';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendLocationPet } from 'services/pet';
import { toast } from 'react-toastify';
import { useAuth } from 'contexts/AuthContext';
import ButtonLink from 'components/Buttons/ButtonLink';
import { GOOGLE_MAPS_API_KEY } from 'constants/values';

const sendInformationToTutor = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  phone: yup.string().required("Campo obrigatório").min(8, 'Telefone inválido'),
  email: yup.string().email(),
});

interface ModalPetSOSProps {
  modalIsOpen: boolean
  afterOpenModal?: () => void
  closeModal: () => void
  customStyles?: Styles;
  pet: Pet;
}

export function ModalPetSOS({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  pet,
}: ModalPetSOSProps) {

  const [step, setStep] = useState(4);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number }>();

  const [informationData, setInformationData] = useState<any>();
  const [isTutorsIsOwner, setIsTutorsIsOwner] = useState<boolean>();
  const [permissionState, setPermissionState] = useState<String>('denied');
  const [isMobile, setIsMobile] = useState<Boolean>(false)

  const { user } = useAuth();

  useEffect(() => {
    if (!modalIsOpen) {
      setStep(1);
      setInformationData({});
      setValue('phone', '');
      setValue('email', '');
      setValue('name', '');
    }
  }, [modalIsOpen])

  useEffect(() => {
    if (window.screen.width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [])


  useEffect(() => {
    if (navigator.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then(result => {
          if (result.state === 'granted') {
            setPermissionState('granted')
          }
        })
      }
    } else {
      toast.error('Seu navegador não suporta geolocalização!')
    }
  }, []);

  async function TryAgainWithPermission() {
    if (navigator) {
      await navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
          [allowAccessLocalization(), setStep(3)]
        }
      })
    } else {
      toast.error('Seu navegador não suporta geolocalização!')
    }
  }

  const getAddress = async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&key=${GOOGLE_MAPS_API_KEY}`);
    return await response.json();
  }

  async function saveAddress() {

    try {
      const addressData = await getAddress();

      const newInformationData = {
        petId: pet._id,
        name: informationData?.name,
        phone: informationData?.phone,
        email: informationData?.email,
        address: addressData?.results[1]?.formatted_address,
        userId: user?._id
      }

      setInformationData(newInformationData);

      await handleSendLocationPet(newInformationData);
    } catch (error) { }

    const existIsTutorOwner = pet?.tutors?.find(tutor => {
      if (tutor?.isOwner) {
        return true;
      }
    });

    if (existIsTutorOwner) {
      return setStep(4);
    } else {
      return setStep(5);
    }
  }

  async function handleSendLocationPet(informationData: any) {
    try {
      await sendLocationPet(informationData);
    } catch (error) {
      console.error('Erro ao enviar notificações, error');
    }
  }

  const { register, handleSubmit, formState, clearErrors, getValues, setValue } = useForm({
    resolver: yupResolver(sendInformationToTutor),
  });
  const { errors, isSubmitting } = formState;

  function allowAccessLocalization() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCurrentLocation(location);
      });

      setStep(3)
    } else {
      toast.error('Seu navegador não suporta geolocalização!')
    }
  }

  function saveInformationsInState(data) {
    setInformationData(data);
    {
      permissionState === 'granted' || isMobile === true ? [allowAccessLocalization(), setStep(3)] : [allowAccessLocalization(), setStep(2)]
    }
  }

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >

      <S.HeaderModal>

        <S.ImageLogo>
          <img src="/assets/logo_unitok_red.svg" alt="Logo Unitok Vermelha" />
        </S.ImageLogo>

        {step !== 5 &&
          <S.IconsStep step={step}>
            <HiOutlinePhone size={25} className="iconPhone" />
            <BsChevronRight size={15} />
            <HiOutlineLocationMarker size={25} className="iconLocation" />
            <BsChevronRight size={15} />
            <AiOutlineUser size={25} className="iconUser" />
          </S.IconsStep>
        }

      </S.HeaderModal>

      <S.MainModal>

        {step === 1 &&
          <>
            <Heading
              fontWeight='300'
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '2.188rem',
                color: '#FF4C1C',
                marginBottom: '30px'
              }}
            >
              Contatos
            </Heading>

            <Text
              style={{
                textAlign: 'left',
                width: '100%',
                marginBottom: '50px',
                fontWeight: '500',
                fontSize: '1rem',
                color: '#01302F'
              }}
            >
              Envie seus contatos para o tutor
            </Text>

            <S.InputsContact>

              <Input
                id="name"
                placeholder="Digite seu nome"
                {...register("name")}
                errorMessage={errors?.name?.message}
                onClick={() => clearErrors("name")}
              />

              <Input
                id="phone"
                type="tel"
                name="phone"
                {...register("phone")}
                onPhoneChange={(phone) => setValue('phone', phone)}
                errorMessage={errors?.phone?.message}
                onClick={() => clearErrors("phone")}
              />

              <Input
                id="email"
                placeholder="Digite seu e-mail (opcional)"
                {...register("email")}
                errorMessage={errors?.email?.message}
                onClick={() => clearErrors("email")}
              />

              <ButtonPrimary
                style={{
                  marginTop: '3.3rem',
                  maxWidth: '12.188rem',
                  width: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                type="submit"
                textButton="Enviar"
                onClick={handleSubmit(saveInformationsInState)}
              />

              <S.CloseButton onClick={closeModal}>Fechar</S.CloseButton>

            </S.InputsContact>
          </>
        }

        {step === 2 &&
          <>
            <Heading
              fontWeight='300'
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '2.188rem',
                color: '#FF4C1C',
                marginBottom: '30px'
              }}
            >
              Erro ao permitir acesso a localização
            </Heading>

            <div>
              <S.TextModalLocation style={{ marginBottom: '30px' }}>
                <strong>ATENÇÃO!</strong><br />Não foi possível obter sua geolocalização.<br />Favor, habilite manualmente em seu navegador.

              </S.TextModalLocation>

              <S.TextModalLocation style={{ marginBottom: '30px' }}>
                Para que você possa enviar a localização do pet ao dono, é necessário que você permita
                que o seu navegador tenha acesso a sua localização atual.
              </S.TextModalLocation>

              <S.TextModalLocation>
                <strong>AJUDA</strong><br />
                Vá em configurações do seu navegador ➤ Busque por localização ➤ Permitir
              </S.TextModalLocation>
            </div>

            <ButtonPrimary
              style={{
                marginTop: '20px',
                maxWidth: '100%',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textButton="Tentar Novamente"
              onClick={TryAgainWithPermission}
            />
            <ButtonLink
              style={{
                marginTop: '10px',
                maxWidth: '100%',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              variant="secondary"
              textButton="Fechar"
              onClick={closeModal}
            />
          </>
        }

        {step === 3 &&
          <>
            <Heading
              fontWeight='300'
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '2.188rem',
                color: '#FF4C1C',
                marginBottom: '30px'
              }}
            >
              Localização
            </Heading>

            <Text
              style={{
                textAlign: 'left',
                width: '100%',
                marginBottom: '20px',
                fontWeight: '500',
                fontSize: '1rem',
                color: '#01302F'
              }}
            >
              Compartilhe a localização do pet <br /> com o tutor
            </Text>

            <S.Container>

              <div
                style={{
                  // marginTop: '-30px',
                  width: '100%',
                  height: '100%',
                }}
              >

                <MapPage currentLocation={currentLocation} />
                <ButtonPrimary
                  style={{
                    marginTop: '6vh',
                    maxWidth: '12.188rem',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  textButton="Compartilhar"
                  onClick={saveAddress}
                />

              </div>

              <S.CloseButton onClick={closeModal}>Fechar</S.CloseButton>

            </S.Container>
          </>
        }

        {step === 4 &&
          <>
            <Heading
              fontWeight='300'
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '2.188rem',
                color: '#FF4C1C',
                marginBottom: '30px',
              }}
            >
              Tutor
            </Heading>

            <Text
              style={{
                textAlign: 'left',
                width: '100%',
                fontWeight: '500',
                marginBottom: '10px',
                fontSize: '1rem',
                color: '#01302F',
              }}
            >
              O tutor foi avisado com sucesso! Entre em contato para ajudá-lo a encontrar o pet mais rápido
            </Text>

            <S.Container>

              {pet && pet?.tutors?.map(tutor => (
                <>
                  {tutor?.isOwner &&
                    <TutorPetContainer
                      key={tutor?.tutorId?._id}
                      tutor={tutor}
                      isModalSos={true}
                    />

                  }
                </>
              ))}

            </S.Container>

            <ButtonPrimary
              onClick={closeModal}
              style={{
                marginTop: '50px',
                maxWidth: '200px',
                width: '100%'
              }}
            >
              Finalizar
            </ButtonPrimary>

            {/* <S.CloseButton onClick={closeModal} style={{ marginTop: '50px' }}>Fechar</S.CloseButton> */}
          </>
        }

        {step === 5 &&
          <>
            <Heading
              fontWeight='300'
              style={{
                textAlign: 'center',
                width: '100%',
                fontSize: '2.188rem',
                color: '#FF4C1C',
                marginBottom: '30px'
              }}
            >
              O tutor foi avisado com sucesso!
            </Heading>

            <Text
              style={{
                textAlign: 'center',
                width: '100%',
                marginBottom: '50px',
                fontWeight: '500',
                fontSize: '1rem',
                color: '#01302F'
              }}
            >
              Agora fique de olho pois ele deve entrar em contato com você.
            </Text>

            <S.Container>

              <ButtonPrimary
                style={{
                  marginTop: '11.3rem',
                  maxWidth: '12.188rem',
                  width: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                textButton="Ok"
                onClick={closeModal}
              />

            </S.Container>
          </>
        }



      </S.MainModal>
    </Modal>
  )
}
