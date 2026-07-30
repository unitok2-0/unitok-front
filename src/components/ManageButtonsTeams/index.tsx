import { RiInformationLine } from "react-icons/ri";
import useDisclosure from "hooks/useDisclosure";

import ButtonLink from "components/Buttons/ButtonLink";
import { GenericDropdown, GenericDropdownButton, GenericDropdownHeader } from "components/GenericDropdown";
import { Heading, Text } from "components/Typography";
import { Colors } from "styles/Colors";
import { TeamsGroupProps } from "domain/TeamsGroup";
import { ToggleSwitch } from "components/Buttons/ButtonToggle";

import * as S from './styles'

interface GroupInfo {
  id: string;
  label: string;
  isGroup: boolean;
}

interface ManageButtonsTeamsProps {
  socialButtons?: any[];
  groupsChecked?: GroupInfo[];
  onSocialButtonsChanged: (buttons: any) => void;
  showOnlyButtons: boolean;
  groups?: TeamsGroupProps[];
  onSelectedGroupsChanged?: (groups: GroupInfo[]) => void;
  blockUserSendContacts?: boolean;
  onBlockUserSendContacts?: (item: boolean) => void;
  blockUserSaveContact?: boolean;
  onBlockUserSaveContact?: (item: boolean) => void;
  blockEditProfileInfo?: boolean;
  onBLockEditProfileInfo?: (item: boolean) => void;
}

export function ManageButtonsTeams({
  socialButtons,
  groupsChecked = [],
  onSocialButtonsChanged,
  onSelectedGroupsChanged,
  showOnlyButtons,
  groups = [],
  blockUserSendContacts,
  onBlockUserSendContacts,
  blockUserSaveContact,
  onBlockUserSaveContact,
  blockEditProfileInfo,
  onBLockEditProfileInfo
}: ManageButtonsTeamsProps) {

  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const createdGroupsInfo = groups.map(group => ({ id: group._id, label: group.name, isGroup: true }));

  let groupsInfo: GroupInfo[] = [
    { id: 'ALL_USERS', label: 'Todos os usuários', isGroup: false },
    ...createdGroupsInfo,
    { id: 'ALL_WITHOUT_GROUP', label: 'Usuários sem grupo', isGroup: false }
  ];

  function toggleSelectedGroup(selectedGroup: GroupInfo) {
    const isGroupSelected = groupsChecked.some(group => group.id === selectedGroup.id);
    let updatedSelectedGroups: GroupInfo[];

    if (isGroupSelected)
      updatedSelectedGroups = groupsChecked.filter(group => group.id !== selectedGroup.id);
    else
      updatedSelectedGroups = [...groupsChecked, selectedGroup];

    onSelectedGroupsChanged && onSelectedGroupsChanged(updatedSelectedGroups);
  }

  function handleButtonClicked(button: any, index: number) {
    let buttonsCopy = [...socialButtons];
    buttonsCopy[index] = { ...button, hide: !button.hide };
    onSocialButtonsChanged(buttonsCopy);
  }

  return (
    <>
      <S.Flex style={{ marginTop: "5rem" }}>
        <Heading>Botões do perfil</Heading>
        <S.HelpCircle
          onMouseEnter={(e) => {
            e.currentTarget.classList.toggle("active");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.toggle("active");
          }}
        >
          <RiInformationLine size={18} />
          <div>
            <Text as="span" color="secondary">
              Você pode escolher um padrão de botões para todos os usuários da empresa e/ou para cada grupo e/ou para usuários sem grupo. Caso queira alterar os botões de algum usuário específico, você pode ir na lista de usuários e mudar por lá. Os botões ativos, irão aparecer no perfil do usuário, onde ele poderá editá-los.
            </Text>
          </div>
        </S.HelpCircle>
      </S.Flex>

      {!showOnlyButtons && (
        <>
          <Text as="p" extendStyle={"font-size: 0.75rem; margin: -2rem 0 -3rem 0;"}>Padrão para</Text>
          <div>
            <GenericDropdown
              isGroupView={true}
              minContentWidth='100%'
              shouldShowContent={isOpen}
              onClickOutside={handleClose}
              header={
                <GenericDropdownHeader
                  onClick={handleOpen}
                  onMouseEnter={handleOpen}
                  style={{ width: "100%", padding: "0", fontWeight: '400', borderBottom: `1.5px solid ${Colors.primaryGreen}`, borderRadius: "0", color: `${Colors.primaryGreen}` }}
                >
                  {groupsChecked.length > 0 ? groupsChecked.map(group => group.label).join(', ') : 'Selecione um grupo'}
                </GenericDropdownHeader>
              }
            >
              {groupsInfo.map(group => (
                <GenericDropdownButton
                  key={group.id}
                  onClick={() => toggleSelectedGroup(group)}
                >
                  <S.Flex>
                    <S.Checkbox>
                      <input type="checkbox"
                        checked={groupsChecked.map(group => group.id).includes(group.id)}
                        onChange={() => toggleSelectedGroup(group)}
                      />
                    </S.Checkbox>
                    {group.label}
                    <Text extendStyle={"font-size: 0.625rem; color: #909692"}>{group.isGroup && 'Grupo'}</Text>
                  </S.Flex>
                </GenericDropdownButton>
              ))}
            </GenericDropdown>
          </div>
        </>
      )}
      <div style={showOnlyButtons ? { marginTop: "2rem" } : {}}>
        {socialButtons.map((button, index) => {
          return (
            <S.SocialButtons key={button.name}  hidden={button.hide}>
              <S.Flex>
                <S.Icon>{<button.icon />}</S.Icon>
                <Text>{button.label}</Text>
              </S.Flex>
              <ButtonLink
                type="button"
                onClick={() => handleButtonClicked(button, index)}
                variant="tertiary"
                styleProp={"font-size: 0.75rem; color: #01302F; text-underline-offset: 2px; font-weight: 500"}
              >
                {button.hide ? <Text extendStyle={"font-size: 0.75rem; color: #FF4C1C; text-decoration: underline; font-weight: 500"}>Desbloquear</Text> : 'Bloquear'}
              </ButtonLink>
            </S.SocialButtons>
          )
        })}
      </div>
      <div>
        <S.Flex style={{ marginBottom: '2rem' }}>
          <Heading>Outras funções</Heading>
          <S.HelpCircle
            onMouseEnter={(e) => {
              e.currentTarget.classList.toggle("active");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.toggle("active");
            }}
          >
            <RiInformationLine size={18} />
            <div>
              <Text as="span" color="secondary">
                O usuário pode salvar um lead na agenda dele e o lead pode salvar o contato do usuário na agenda dele.<br />
                <span style={{ fontWeight: '500' }}>Exemplo:</span>
              </Text>
              {/* <img src="/assets/blockContactExample.svg" alt="block contact example"></img> */}
            </div>
          </S.HelpCircle>
        </S.Flex>

        <S.ToggleButtonsContainer>
          <S.Flex>
            <ToggleSwitch
              switchValue={blockUserSaveContact}
              onChangeValue={onBlockUserSaveContact}
              label="switchBlockSaveContactToggle"
            />
            <Text>Permitir que o contato do usuário seja salvo por leads</Text>
          </S.Flex>

          <S.Flex>
            <ToggleSwitch
              switchValue={blockUserSendContacts}
              onChangeValue={onBlockUserSendContacts}
              label="switchBlockSendContactToggle"
            />
            <Text>Permitir que o usuário salve os contatos de leads</Text>
          </S.Flex>

          <S.Flex>
            <ToggleSwitch
              switchValue={blockEditProfileInfo}
              onChangeValue={onBLockEditProfileInfo}
              label="switchblockEditProfileInfoToggle"
            />
            <Text>Permitir edição dos campos de texto do perfil</Text>
          </S.Flex>
        </S.ToggleButtonsContainer>

      </div>
    </>
  )
}
