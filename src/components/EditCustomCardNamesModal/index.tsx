import { ChangeEvent, useState, useEffect } from 'react'

import MainModal, { MainModalProps } from 'components/Modals/MainModal'
import { Heading } from 'components/Typography'
import Input from 'components/Inputs/Input'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import Checkbox from 'components/Checkbox'

import * as S from './styles'
import EditableFlipCard from 'components/EditableFlipCard'
import { CardVariants } from 'constants/cards'
import { composeCardImageSrc } from 'utils/compose-card-image-src'

export type EditCustomCardNamesModalProps = MainModalProps & {
  customNames: string[]
  cardVariant: CardVariants
  quantity: number
  shouldAddCustomName?: boolean
  shouldAllCustomNamesBeTheSame?: boolean
  onSave: (newState: {
    newNamesState: string[]
    shouldAllCustomNamesBeTheSame: boolean
  }) => void
}

export default function EditCustomCardNamesModal(
  props: EditCustomCardNamesModalProps
) {
  const {
    onSave,
    customNames: customNamesProp,
    cardVariant,
    quantity,
    shouldAllCustomNamesBeTheSame: shouldAllCustomNamesBeTheSameProp,
    shouldAddCustomName: shouldAddCustomNameProp,
    ...modalProps
  } = props

  const [customNames, setCustomNames] = useState<string[]>(() => {
    if (customNamesProp.length) {
      if (customNamesProp.length === 1)
        return [...customNamesProp, ...new Array(props.quantity - 1).fill('')]
      else return customNamesProp
    } else {
      return new Array(props.quantity).fill('')
    }
  })

  const [customNamesBackup, setCustomNamesBackup] = useState(customNames)
  const [shouldAddCustomName, setshouldAddCustomName] = useState(
    shouldAddCustomNameProp || Boolean(customNamesProp.length)
  )
  const [
    shouldAllCustomNamesBeTheSame,
    setshouldAllCustomNamesBeTheSame,
  ] = useState(shouldAllCustomNamesBeTheSameProp || false)
  const [nameOnFlipCard, setNameOnFlipCard] = useState(customNames[0] || '')

  const isPersonalizedCard = cardVariant.startsWith('with')

  // const emptyCustomNames = shouldAddCustomName
  //   ? customNames.map((name, index) => !name && index + 1).filter(Boolean)
  //   : null;

  function handleChange(index: number) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const newState = [...customNames]
      newState.splice(index, 1, event.target.value)

      setCustomNames(newState)
      setNameOnFlipCard(event.target.value)
    }
  }

  useEffect(() => {
    if (shouldAllCustomNamesBeTheSame || !shouldAddCustomName) {
      return
    }

    setCustomNamesBackup(customNames)
  }, [customNames, shouldAllCustomNamesBeTheSame, shouldAddCustomName])

  useEffect(() => {
    if (shouldAddCustomName) {
      setCustomNames(customNamesBackup)
    } else {
      setCustomNames(() => [])
      setNameOnFlipCard('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAddCustomName, customNamesProp])

  useEffect(() => {
    if (shouldAllCustomNamesBeTheSame) {
      setCustomNames((state) => [state[0]])
    } else {
      setCustomNames(customNamesBackup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAllCustomNamesBeTheSame, customNamesProp])

  return (
    <MainModal {...modalProps}>
      <S.Wrapper>
        <S.EditableFlipCardContainer>
          {isPersonalizedCard ? (
            <img
              src={composeCardImageSrc(cardVariant)}
              alt={cardVariant}
              style={{ display: 'block', maxWidth: '80%', marginTop: '-5rem' }}
            />
          ) : (
            <EditableFlipCard cardVariant={cardVariant} name={nameOnFlipCard} />
          )}
        </S.EditableFlipCardContainer>
        <S.Form className="white-custom-scrollbar">
          <Heading font="titleXs">Nomes</Heading>

          <Checkbox
            onChange={() => setshouldAddCustomName((state) => !state)}
            checked={shouldAddCustomName}
          >
            Adicionar nome
          </Checkbox>

          {customNames.map((name, index) => (
            <div key={`Nome ${index + 1}`}>
              <Input
                label={`Nome ${index + 1}`}
                id={`Nome ${index + 1}`}
                value={name}
                onChange={handleChange(index)}
              />
              {props.quantity > 1 && index === 0 && (
                <Checkbox
                  checked={shouldAllCustomNamesBeTheSame}
                  onChange={() =>
                    setshouldAllCustomNamesBeTheSame((state) => !state)
                  }
                >
                  Mesmo nome para todos os cartões
                </Checkbox>
              )}
            </div>
          ))}

          <ButtonPrimary
            style={{ position: 'sticky', bottom: 0 }}
            onClick={() =>
              onSave({
                newNamesState: shouldAllCustomNamesBeTheSame
                  ? [customNames[0]]
                  : customNames,
                shouldAllCustomNamesBeTheSame: shouldAddCustomName
                  ? shouldAllCustomNamesBeTheSame
                  : false,
              })
            }
          >
            Salvar alterações
          </ButtonPrimary>
        </S.Form>
      </S.Wrapper>
    </MainModal>
  )
}
