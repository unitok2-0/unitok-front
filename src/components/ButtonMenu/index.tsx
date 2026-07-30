import Router from 'next/router';

import { CloseButton } from 'components/CloseButton';
import { Pet } from 'contexts/PetContext';
import { Dispatch, SetStateAction } from 'react';
import { FiEdit, FiEye, FiStar, FiExternalLink, FiTrash } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { DeletePet, deleteTutorInPet } from 'services/pet';
import { Container } from './styles'
import { MdPets } from 'react-icons/md';
import { useAuth } from 'contexts/AuthContext';
import { IoPawOutline } from "react-icons/io5";
import { DeleteDevice } from 'services/user';

import * as S from './styles'
import { ButtonsProps } from 'domain/User';
import { AiFillStar } from 'react-icons/ai';

interface ButtonMenuProps {
  onBackdropClicked: () => void;
  socialButtons: ButtonsProps[];
  onButtonsUpdated: (value: ButtonsProps[]) => void;
  index: number;
}

export function ButtonMenu({
  onBackdropClicked,
  socialButtons,
  onButtonsUpdated,
  index
}: ButtonMenuProps) {
  const { user } = useAuth();
  const isTeamUser = !!user.administrator;
  const currentButton = socialButtons[index];

  function handleHide(buttonIndex: number) {
    const oldValue = [...socialButtons];

    oldValue[buttonIndex].hide = !socialButtons[buttonIndex].hide;

    onButtonsUpdated(oldValue);
  }

  function handleisHightligh(buttonIndex: number) {
    const oldValue = [...socialButtons];

    oldValue[buttonIndex].highlighted = !socialButtons[buttonIndex].highlighted;

    onButtonsUpdated(oldValue);
  }

  function handleDeleteButton(buttonIndex: number) {
    const buttons = [...socialButtons];

    buttons.splice(buttonIndex, 1)

    onButtonsUpdated(buttons)
  }

  function handleDirectButton(buttonIndex: number) {
    const buttons = [...socialButtons];

    if (buttons[index].isDirectLink === true) {
      buttons[index].isDirectLink = false
      buttons.map(button => button.hide = false)

      onButtonsUpdated(buttons)
      onBackdropClicked()
    } else {
      buttons.map(button => button.isDirectLink = false)
      buttons.map(button => button.hide = true)

      buttons[index].isDirectLink = true
      buttons[index].hide = false

      onButtonsUpdated(buttons)
      onBackdropClicked()

      console.dir(socialButtons)
    }
  }

  const isHiddenButton = socialButtons[index].hide
  const isHightlightButton = socialButtons[index].highlighted
  const isDirectLinkButton = socialButtons[index].isDirectLink

  return (
    <>
      <S.Backdrop onClick={onBackdropClicked}></S.Backdrop>
      <Container>
        <button
          onClick={() => handleHide(index)}
          disabled={isTeamUser}
        >
          <div className='icon'>
            <FiEye color='#01302F' />
          </div>
          <p>{isHiddenButton ? `Mostrar botão` : `Ocultar botão`}</p>
        </button>

        <button 
          onClick={() => handleisHightligh(index)}
          disabled={isTeamUser}
        >
          <div className='icon'>
            {isHightlightButton ?
              <AiFillStar color='#01302F' /> :
              <FiStar color='#01302F' />
            }
          </div>
          <p>Destacar botão</p>
        </button>

        <button 
          onClick={() => handleDirectButton(index)}
          disabled={currentButton.name === "PIX"}
        >
          <div className='icon'>
            <FiExternalLink color='#01302F' size={18} />
          </div>
          <p>{isDirectLinkButton ? 'Desabilitar link direto' : 'Habilitar link direto'}</p>
        </button>

        <button
          onClick={() => handleDeleteButton(index)}
          disabled={isTeamUser}
        >
          <div className='icon'>
            <FiTrash color='#01302F' size={18} />
          </div>
          <p>Excluir botão</p>
        </button>
      </Container>
    </>
  )
}
