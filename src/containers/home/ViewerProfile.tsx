import React, { useState } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

import {
  Content,
  styleContainerAvatar,
  BoxPrimary,
  BoxSecundary,
  ButtonPrimaryColorStyle,
  ButtonWhiteStyle,
  RowBox,
  DescriptionModoOffline
} from '../../styles/pageStyles/publicProfile/styles';
import Avatar from '../../components/Avatar';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import QrcodEexemple from '../../../public/assets/qrcodeexemple.svg';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import IconsPatterns from '../../utils/IconsPatterns';
import { Colors } from '../../styles/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { UserProps } from '../../domain/User';
import { useRouter } from 'next/router';
import { generateVcard } from '../../constants/functions';
import ModalQRCODE from '../../components/Modals/ModalQRCODE';

type ViewerProfileProps = {
  theme?: DefaultTheme,
  colorPreview?: string
}

const ViewerProfile: React.FC<ViewerProfileProps> = ({ theme, colorPreview }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState('');
  const { user = {} as UserProps } = useAuth();

  function openModal() {
    const card = generateVcard(user, 'string')
    setCard(card)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const {
    buttons = [],
    full_name: fullName,
    name,
    profession,
    phone,
    address = {}
  } = user

  const { canShow } = address
  const { colors } = useTheme()

  const phoneButton = {
    _id: 'phone',
    name: 'PHONE',
    url: phone,
    realUrl: `tel:+${phone}`,
  }

  function handleOpenMap() {
    const { street, number, district, city, state, postalCode, complement } = address
    let query = ``
    query = street ? `${street}, ` : query
    query = number ? `${query}${number} ` : query
    query = complement ? `, ${query}${complement}, ` : query
    query = district ? ` ${query}${district}, ` : query
    query = city ? `${query}${city} ` : query
    query = state ? `${query}${state}, ` : query
    query = postalCode ? `${query}${postalCode}` : query

    const linkMap = `https://maps.google.com/?q=${query}`
    window.location.href = linkMap
  }

  return (
    <Content theme={theme}>
      <Avatar
        styleContainer={styleContainerAvatar}
        imageUrl={user.imageUrl}
      />

      <h1>{fullName || name}</h1>
      {!!profession && <span>{profession}</span>}

      <BoxPrimary>
        <RowBox>
          <ButtonPrimary
            textButton="Salvar contato"
            styleProp={ButtonPrimaryColorStyle}
            colorBackground={colorPreview}
            onClick={() => generateVcard(user)}
          />
          <ButtonPrimary
            textButton="QR Code"
            styleProp={ButtonPrimaryColorStyle}
            colorBackground={colorPreview}
            leftElement={<QrcodEexemple style={{ width: '2rem' }} />}
            onClick={() => openModal()}
          />
        </RowBox>

        <RowBox>
          <ButtonPrimary
            textButton="Compartilhar"
            styleProp={ButtonWhiteStyle}
            colorBackground={colorPreview}
          />

          {
            canShow &&
            <ButtonPrimary
              textButton="Localização"
              styleProp={ButtonWhiteStyle}
              colorBackground={colorPreview}
              onClick={() => handleOpenMap()}
            />
          }
        </RowBox>
      </BoxPrimary>


      {buttons.length > 0 && <p>Links</p>}

      <BoxSecundary>
        {
          [phoneButton, ...buttons].map(button => {
            const iconReturn = IconsPatterns.find(ic => ic.value === button.name)
            if (!iconReturn) return
            const color = iconReturn.withRoundBackground ? Colors.white : colorPreview || colors.profileColor
            const sizeIcon = iconReturn.withRoundBackground ? 17 : 26
            return (
              <ButtonWithIcon
                key={button._id}
                textButton={iconReturn.name}
                Icon={iconReturn.icon}
                styleProp={ButtonWhiteStyle}
                colorBackground={colorPreview}
                sizeIcon={sizeIcon}
                colorIcon={color}
                backgroundRound={colorPreview}
                withRoundBackground={iconReturn.withRoundBackground}
                onClick={() => window.location.href = button.realUrl}
              />
            )
          }).filter(Boolean)
        }
      </BoxSecundary>

      <ModalQRCODE
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        valueQRCODE={card}
        topElement={
          <DescriptionModoOffline>Mire com a câmera de celular no QRCode para salvar contato na agenda</DescriptionModoOffline>
        }
      />
    </Content>
  )
}

export default ViewerProfile;