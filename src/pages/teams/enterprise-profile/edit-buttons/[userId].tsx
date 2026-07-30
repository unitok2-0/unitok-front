import Head from "next/head";
import styled, { CSSProp } from 'styled-components'
import { parseCookies } from "nookies";
import { FormEvent, useState } from "react";
import { GoChevronLeft } from 'react-icons/go';
import jwt_decode from 'jwt-decode';

import Avatar from "components/Avatar";
import ButtonLink from "components/Buttons/ButtonLink";
import { ManageButtonsTeams } from "components/ManageButtonsTeams";
import { Heading, Text } from "components/Typography";
import DashbardContainer from "containers/dashboard";
import { UserProps } from "domain/User";
import { getUser, updateUser } from "services/user";
import { withSSRAuth } from "utils/withSSRAuth";
import { teamsIconsPatterns } from "utils/IconsPatterns";
import { ToggleSwitch } from "components/Buttons/ButtonToggle";
import { Colors } from 'styles/Colors';
import { useRouter } from "next/router";

import { TeamsGroupProps } from "domain/TeamsGroup";
import { toast } from "react-toastify";
import { getImageUrl } from 'constants/functions';
import { RiInformationLine } from "react-icons/ri";
import Input from "components/Inputs/Input";
import PickerColor from "components/PickerColor";

interface EditButtons {
  extendStyle?: CSSProp;
}

export const Flex = styled.div<EditButtons>`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${(props) => props.extendStyle}
`

export const Form = styled.form`
  > * + * {
    margin-top: 2.875rem;
  }

  @media (max-width: 1119px) {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  @media (max-width: 540px) {
    width: 100%;

    .profileEditSubmitButton {
      width: 100%;
      height: 40px;
    }
  }
`;

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateY(100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;

    img {
      width: 100%;
      height: 100%;
      margin-top: 1rem;
    }
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`;

export const ButtonsLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 1rem;
`

export const ColorExample = styled.div`
  width: 100%;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
`;


interface editButtonsProps {
  user: UserProps;
  admin: UserProps;
  teamsGroup?: TeamsGroupProps;
}

export default function EditButtons({ user }: editButtonsProps) {
  const [allowUserChangeColor, setAllowUserChangeColor] = useState(true)
  const [blockUserSendContacts, setBlockUserSendContacts] = useState(false)
  const [blockUserSaveContact, setBlockUserSaveContacts] = useState(false)
  const [blockEditProfileInfo, setBlockEditProfileInfo] = useState(false)
  const [color, setColor] = useState<string>("#007A78")

  const [socialButtons, setSocialButtons] = useState(() => {
    setColor(user.profileColor)
    setAllowUserChangeColor(user.allowUsersUpdateProfileColor)
    setBlockUserSendContacts(!user.blockSendContacts)
    setBlockUserSaveContacts(!user.blockSaveContact)

    return teamsIconsPatterns
      .map(buttonInfo => {
        let userButtonInfo = user.buttons.find(button => button.name === buttonInfo.value);

        if (!userButtonInfo) {
          userButtonInfo = {
            hide: false,
            name: buttonInfo.value,
            url: '',
            highlighted: false,
            isDirectLink: false
          }
        }

        return {
          ...userButtonInfo,
          icon: buttonInfo.icon,
          label: buttonInfo.name
        }
      })
  });

  const { back } = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await updateUser(user._id, { 
        allowUsersUpdateProfileColor: allowUserChangeColor,
        profileColor: color,
        blockSaveContact: !blockUserSaveContact,
        blockSendContacts: !blockUserSendContacts,
        blockEditProfile: !blockEditProfileInfo,
        buttons: socialButtons 
      });
      back()
      toast.success('Botões atualizados com sucesso!');
    } catch (e) {
      toast.error('Erro ao atualizar botões');
    }
  }

  return (
    <>
      <Head>
        <title>Definir botões | Unitok</title>
      </Head>
      <DashbardContainer variant="teams-admin" title="Usuários">
        <Flex extendStyle={"margin: -3rem 0 2rem 0"}>
          <GoChevronLeft color="#FF4C1C" />
          <ButtonLink
            textButton="Voltar para a lista de usuários"
            variant="tertiary"
            onClick={back}
          />
        </Flex>
        <Heading extendStyle={"margin-bottom: 1rem"}>Usuário</Heading>
        <Flex extendStyle={"gap: 1rem; margin-bottom: 5rem;"}>
          <Avatar imageUrl={getImageUrl(user?.userImage)} />
          <div>
            <Text extendStyle={"font-weight: 500; font-size: 0.875rem"}>{user?.full_name}</Text>
            <Text extendStyle={"color: #909692; font-size: 0.875rem"}>{user?.profession}</Text>
          </div>
        </Flex>

        <Form
          onSubmit={handleSubmit}
        >
          <ManageButtonsTeams
            showOnlyButtons={true}
            socialButtons={socialButtons}
            onSocialButtonsChanged={setSocialButtons}
            blockUserSendContacts={blockUserSendContacts}
            onBlockUserSendContacts={setBlockUserSendContacts}
            blockUserSaveContact={blockUserSaveContact}
            onBlockUserSaveContact={setBlockUserSaveContacts}
            blockEditProfileInfo={blockEditProfileInfo}
              onBLockEditProfileInfo={setBlockEditProfileInfo}
          />
          <Heading>Cor do perfil</Heading>
          <Flex>
            <ToggleSwitch
              switchValue={allowUserChangeColor}
              onChangeValue={setAllowUserChangeColor}
              label="switchColorToggle"
            />
            <Text>Permitir que o usuário altere a cor do perfil</Text>
          </Flex>

          <PickerColor color={color} setColor={setColor} />

          <ColorExample>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: color,
                marginRight: 15,
              }}
            />

            <Input
              id="perfilColorEditor"
              // label={color}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </ColorExample>

          <ButtonLink
            type="submit"
            textButton="salvar"
            styleProp={"width: 20rem"}
          />
        </Form>

      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const codeId = ctx.params.userId

  const user: UserProps = await getUser(String(codeId), ctx);

  return {
    props: { user }
  }
})
