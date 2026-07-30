import {
  BsTrash,
  BsPlusCircle,
  BsXCircle,
  BsPencilSquare,
  BsCheckCircleFill,
} from 'react-icons/bs'

import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Text } from 'components/Typography'
import QuantityInput from 'components/Inputs/QuantityInput'
import { DropzoneFile } from 'components/Dropzone/DropzoneComponent'
import { CardVariants } from 'constants/cards'
import { getWidthScreen } from 'utils/getWidthScreen'

import * as S from './styles'
import { composeCardImageSrc } from 'utils/compose-card-image-src'

export type CartItemProps = {
  variant: CardVariants
  cardName: string
  shouldBeStatic?: boolean
  shouldAllCustomNamesBeTheSame?: boolean
  defaultQuantity: number
  formattedUnitPrice: string
  formattedItemTotalPrice: string
  formattedPricePerCustomName?: string
  customNames: string[]
  customNamesFile?: DropzoneFile | null
  customNamesFileUrl?: string
  customArtOrLogoFile?: DropzoneFile | null
  customArtOrLogoFileUrl?: string
  onDeleteItemClick?: () => void
  onAddCustomNameClick?: () => void
  onEditCustomNamesClick?: () => void
  onEditCustomArtOrLogoFileClick?: () => void
  onQuantityChange?: (quantity: number) => void
}

export default function CartItem(props: CartItemProps) {
  const hasCustomNames =
    props.customNamesFileUrl ||
    props.customNamesFile ||
    props.customNames.some(Boolean)

  const maxQuantity = hasCustomNames
    ? props.customNamesFile
      ? undefined
      : 10
    : undefined

  const minQuantity = hasCustomNames
    ? props.customNamesFile || props.customNamesFileUrl
      ? 11
      : 1
    : 1

  const cardNumbers = new Array(props.defaultQuantity)
    .fill(null)
    .map((_, index) => index + 1)

  const namesList = props.customNamesFileUrl ? (
    <Text
      as="a"
      target="_blank"
      rel="noreferrer"
      color="grayDark"
      href={props.customNamesFileUrl}
      style={{ textDecoration: 'underline' }}
    >
      Baixar planilha
    </Text>
  ) : props.customNamesFile ? (
    <Text as="li" color="grayDark" style={{ textDecoration: 'underline' }}>
      {props.customNamesFile.originalFileName}
    </Text>
  ) : props.shouldAllCustomNamesBeTheSame ? (
    <Text as="li" color="grayDark">
      {cardNumbers.join(', ')} - {props.customNames[0]}
    </Text>
  ) : (
    props.customNames.map((name, index) => (
      <Text as="li" key={name + index} color="grayDark">
        {index + 1} - {name || '(sem nome)'}
      </Text>
    ))
  )

  const Wrapper = props.shouldBeStatic ? S.StaticWrapper : S.Wrapper

  return (
    <Wrapper>
      {!props.shouldBeStatic && (
        <ButtonPrimary
          variant="tertiary"
          title="Remover item"
          onClick={props.onDeleteItemClick}
        >
          <BsTrash />
        </ButtonPrimary>
      )}
      <S.CardBox>
        <Text fontWeight="500">{props.cardName}</Text>
        <img
          src={composeCardImageSrc(props.variant)}
          alt={props.cardName}
          title={props.cardName}
          style={{ width: '5.25rem' }}
        />
      </S.CardBox>

      <S.CustomNamesBox>
        {(props.customArtOrLogoFile || props.customArtOrLogoFileUrl) && (
          <div>
            <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ width: '24px' }}></span>
              Logotipo ou arte:
            </Text>
            <S.CustomInfoBox style={{ paddingLeft: '1.5rem' }}>
              {props.customArtOrLogoFileUrl ? (
                <Text
                  as="a"
                  target="_blank"
                  rel="noreferrer"
                  color="grayDark"
                  href={props.customArtOrLogoFileUrl}
                  style={{ textDecoration: 'underline' }}
                >
                  Baixar arquivo
                </Text>
              ) : (
                <Text color="grayDark" style={{ textDecoration: 'underline' }}>
                  {props.customArtOrLogoFile?.originalFileName}
                </Text>
              )}
              {!props.shouldBeStatic && (
                <ButtonPrimary
                  variant="tertiary"
                  rightElement={<BsPencilSquare />}
                  onClick={props.onEditCustomArtOrLogoFileClick}
                >
                  Editar
                </ButtonPrimary>
              )}
            </S.CustomInfoBox>
          </div>
        )}
        {hasCustomNames ? (
          <div>
            <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
              <BsCheckCircleFill size={16} style={{ marginRight: '0.5rem' }} />
              Nome:
            </Text>
            <S.CustomInfoBox style={{ paddingLeft: '1.5rem' }}>
              <ul style={{ listStyle: 'none' }}>
                {/* TODO */}
                {namesList}
              </ul>
              {!props.shouldBeStatic && (
                <ButtonPrimary
                  variant="tertiary"
                  rightElement={<BsPencilSquare />}
                  onClick={props.onEditCustomNamesClick}
                >
                  Editar
                </ButtonPrimary>
              )}
            </S.CustomInfoBox>
          </div>
        ) : (
          <div>
            {/* <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
              <BsXCircle size={16} style={{ marginRight: '0.5rem' }} />
              Sem nome
            </Text> */}
            {!props.shouldBeStatic && (
              <S.CustomInfoBox style={{ paddingLeft: '1.5rem' }}>
                {/*  <ButtonPrimary
                  variant="tertiary"
                  rightElement={<BsPlusCircle />}
                  onClick={props.onAddCustomNameClick}
                >
                  Adicionar nome
                </ButtonPrimary> */}
              </S.CustomInfoBox>
            )}
          </div>
        )}
      </S.CustomNamesBox>
      <S.UnitPriceBox>
        {props.shouldBeStatic ? (
          <Text>x{props.defaultQuantity}</Text>
        ) : (
          <>
            <Text style={{ fontWeight: 500 }}>{props.formattedUnitPrice}</Text>
            {hasCustomNames && (
              <Text font="bodySm" color="grayDark">
                + {props.formattedPricePerCustomName || 'R$10'} por nome
              </Text>
            )}
          </>
        )}
      </S.UnitPriceBox>
      {!props.shouldBeStatic && (
        <S.PlaceItemsCenter className="quantity">
          <QuantityInput
            defaultQuantity={props.defaultQuantity}
            min={minQuantity}
            max={maxQuantity}
            onChange={props.onQuantityChange}
          />
        </S.PlaceItemsCenter>
      )}
      <S.PlaceItemsCenter className="total-price">
        {props.shouldBeStatic ? (
          <Text>{props.formattedItemTotalPrice}</Text>
        ) : (
          <Text font="bodyLg" style={{ fontWeight: 500 }}>
            {props.formattedItemTotalPrice}
          </Text>
        )}
      </S.PlaceItemsCenter>
    </Wrapper>
  )
}
