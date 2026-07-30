import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";

import { useAuth } from "../../contexts/AuthContext";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { useRouter } from "next/router";
import AuthContainer from "containers/auth";
import {
  Form,
  ButtonsContainer,
  Heading,
  Text,
  InputContainer,
} from "containers/auth/styles";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";
import { addNewDevice, getQrcode, getUser } from "services/user";
import { GetServerSidePropsContext } from "next";
import { useProfile } from "contexts/ProfileContext";

type SignInFormData = {
  phone: string;
  password: string;
};

export type IDevice = {
  _id: string;
  blocked: boolean;
  name: string;
  device_type: string;
}
interface MyDevicesProps {
  list_devices: IDevice[]
}

const signInFormSchema = yup.object().shape({
  phone: yup.string().required("Digite seu telefone cadastrado").min(8, 'Telefone inválido'),
  password: yup.string().required("Digite sua senha"),
});

export default function Login({ teamsUser }) {
  const { register, handleSubmit, formState, clearErrors, setValue, getValues } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const isTeamsUser = teamsUser !== null ? true : false

  const { signIn } = useAuth();
  const { updateProfile } = useProfile();
  const { push } = useRouter();
  const { errors, isSubmitting } = formState;

  const router = useRouter()
  const { codeId } = router.query

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      const user = await signIn(values)
      const isTeamsADM = user?.roles?.includes("TEAMS_ADMIN")
      if (codeId) {
        addNewDevice({ qrcode_link: String(codeId) }).then(({ data }) => {
          const newDevice = data?.qrcode;
          if (newDevice && newDevice.device_type === "PETS")
            return router.push('/profile/pet-edit/' + newDevice._id)
          else
            return router.push('/profile/mydevices')
        }).catch(err => {
          console.error('Erro ao ativar dispositivo', err);
          return toast.error(`Erro ao ativar dispositivo. ${err}`);
        })
      } else if (isTeamsADM) {
        updateProfile('TEAMS_ADMIN')
        push('/teams/enterprise-profile')
      } else {
        updateProfile('USER')
        push('/profile/me')
      }

    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login | Unitok</title>
      </Head>

      <AuthContainer imageSrc="/images/login-image.jpg" teamsUser={teamsUser}>
        <Form onSubmit={handleSubmit(handleSignIn)}>
          <Heading>Fazer Login</Heading>
          <Text>Informe seu telefone e senha para entrar na sua conta</Text>

          <InputContainer>
            <Input
              label="Telefone"
              type="tel"
              name="phone"
              id="Email"
              autoFocus={true}
              {...register("phone")}
              onPhoneChange={(phone) => setValue('phone', phone)}
              errorMessage={errors?.phone?.message}
              onClick={() => clearErrors("phone")}
              isWhiteMode={!isTeamsUser}
            />

            <PasswordInput
              label="Senha"
              name="password"
              id="password"
              {...register("password")}
              errorMessage={errors?.password?.message}
              onClick={() => clearErrors("password")}
              isWhiteMode={!isTeamsUser}
            />
          </InputContainer>

          <ButtonsContainer>
            <ButtonPrimary
              textButton="Entrar"
              loading={isSubmitting}
              type="submit"
            />

            <ButtonPrimary
              variant="tertiary"
              type="button"
              textButton="Esqueci a senha"
              onClick={() => push("/reset/sms")}
            />
          </ButtonsContainer>
        </Form>
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (context: GetServerSidePropsContext) => {
  const { codeId } = context.query;

  let teamsUser = null

  if (codeId) {
    const qrcode = await getQrcode(String(codeId));
    if (qrcode.hasOwnProperty('administratorId')) {
      try {
        teamsUser = await getUser(qrcode.administratorId, context);
      } catch (error) {
        console.log(error)
      }
    }
  }
  return {
    props: {
      teamsUser
    },
  };
});
