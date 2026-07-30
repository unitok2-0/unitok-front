import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'

import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import Checkbox from 'components/Checkbox'
import { DropzoneFile } from 'components/Dropzone/DropzoneComponent'
import FileDropzone from 'components/FileDropzone'
import Input from 'components/Inputs/Input'
import QuantityInput from 'components/Inputs/QuantityInput'
import { Text } from 'components/Typography'
import { BsDownload } from 'react-icons/bs'
import * as S from './styles'

export type PersonalizationState = {
  customNames: string[]
  nameOnFlipCard: string
  shouldAddCustomName: boolean
  shouldAllCustomNamesBeTheSame: boolean
  quantity: number
  customNamesFile: DropzoneFile
  customArtOrLogoFile: DropzoneFile
  isCardQuantityOver10: boolean
  personalizationAmount: number
  emptyCustomNames: number[]
  isCustomNamesFileEmpty: boolean
  isCustomArtOrLogoFileEmpty: boolean
}

export type PersonalizationProps = {
  onStateChange: (state: PersonalizationState) => void
  shouldShowArtSection?: boolean
  shouldShowLogoSection?: boolean
}

const GABARITO_LINK =
  'https://drive.google.com/file/d/19HJSpZm7_jfVdIRB3LzHqH0c4aOeXT6i/view'

function Personalization(props: PersonalizationProps) {
  const { onStateChange } = props

  const [customNames, setCustomNames] = useState<string[]>([])
  const [customNamesBackup, setCustomNamesBackup] = useState<string[]>([])
  const [nameOnFlipCard, setNameOnFlipCard] = useState('')
  const [shouldAddCustomName, setShouldAddCustomName] = useState(false)
  const [
    shouldAllCustomNamesBeTheSame,
    setShouldAllCustomNamesBeTheSame,
  ] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [customNamesFile, setCustomNamesFile] = useState<DropzoneFile | null>(
    null
  )
  const [
    customArtOrLogoFile,
    setCustomArtOrLogoFile,
  ] = useState<DropzoneFile | null>(null)

  const isCardQuantityOver10 = quantity > 10

  const personalizationAmount = isCardQuantityOver10
    ? customNamesFile
      ? quantity
      : 0
    : shouldAllCustomNamesBeTheSame
    ? customNames.filter(Boolean).length && quantity
    : customNames.filter(Boolean).length

  const emptyCustomNames = shouldAddCustomName
    ? customNames.map((name, index) => !name && index + 1).filter(Boolean)
    : null

  const isCustomNamesFileEmpty =
    shouldAddCustomName && isCardQuantityOver10 && !customNamesFile

  const isCustomArtOrLogoFileEmpty =
    (props.shouldShowArtSection || props.shouldShowLogoSection) &&
    !customArtOrLogoFile

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      setQuantity(quantity)

      if (shouldAllCustomNamesBeTheSame) return

      if (quantity > customNames.length) {
        setCustomNames((state) => [...state, ''])
      } else if (quantity < customNames.length) {
        setCustomNames((state) => state.slice(0, -1))
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customNames.length, shouldAllCustomNamesBeTheSame]
  )

  function handleNameChange(index: number) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setCustomNames((state) => {
        const newState = [...state]
        newState.splice(index, 1, event.target.value)
        return newState
      })
      setNameOnFlipCard(event.target.value)
    }
  }

  function handleShouldAddCustomName() {
    setShouldAddCustomName((state) => !state)
  }

  useEffect(() => {
    if (quantity > customNamesBackup.length) {
      setCustomNamesBackup((state) => [...state, ''])
    } else if (quantity < customNamesBackup.length) {
      setCustomNamesBackup((state) => state.slice(0, -1))
    }

    if (shouldAllCustomNamesBeTheSame || !shouldAddCustomName) {
      return
    }

    setCustomNamesBackup(customNames)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldAddCustomName,
    shouldAllCustomNamesBeTheSame,
    customNames,
    quantity,
  ])

  useEffect(() => {
    if (!shouldAddCustomName) {
      setCustomNames([])
      setShouldAllCustomNamesBeTheSame(false)
      return
    }

    if (shouldAddCustomName && quantity) {
      setCustomNames(customNamesBackup)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAddCustomName])

  useEffect(() => {
    if (shouldAllCustomNamesBeTheSame && quantity) {
      setCustomNames((state) => [state[0]])
      return
    }
    setCustomNames(customNamesBackup)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAllCustomNamesBeTheSame])

  useEffect(() => {
    onStateChange({
      customNames,
      nameOnFlipCard,
      shouldAddCustomName,
      shouldAllCustomNamesBeTheSame,
      quantity,
      customNamesFile,
      customArtOrLogoFile,
      isCardQuantityOver10,
      personalizationAmount,
      emptyCustomNames,
      isCustomNamesFileEmpty,
      isCustomArtOrLogoFileEmpty,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customNames,
    nameOnFlipCard,
    shouldAddCustomName,
    shouldAllCustomNamesBeTheSame,
    quantity,
    customNamesFile,
    customArtOrLogoFile,
    isCardQuantityOver10,
    personalizationAmount,
    emptyCustomNames,
    isCustomNamesFileEmpty,
    isCustomArtOrLogoFileEmpty,
  ])

  return (
    <S.Wrapper>
      <S.CardInput>
        <Text>Quantidade: </Text>

        <QuantityInput
          min={1}
          defaultQuantity={quantity}
          onChange={handleQuantityChange}
        />
      </S.CardInput>

      <S.CardInput>
        {/* <Text>Personalização: </Text> */}

        {props.shouldShowArtSection && (
          <S.PersonalizationBox>
            <S.AddNameOption>
              <Text>Aplicar a minha arte</Text>
            </S.AddNameOption>
            <S.Personalization>
              <S.PersonaliaztionUpload>
                <div>
                  <S.NumberDot>1</S.NumberDot>
                  <Text>
                    Baixe nosso template e crie a arte do seu cartão de acordo
                    com as nossas instruções.
                  </Text>

                  <ButtonPrimary
                    as="a"
                    href={GABARITO_LINK}
                    target="_blank"
                    rel="noopener"
                    rightElement={<BsDownload />}
                    style={{ width: 'max-content' }}
                  >
                    Baixar gabarito
                  </ButtonPrimary>
                </div>
                <div>
                  <S.NumberDot>2</S.NumberDot>
                  <Text>
                    Nos envie o arquivo da arte pronta para podermos produzir
                    seus cartões Unitok personalizados.
                    <Text font="bodySm" color="grayDark">
                      Formato do arquivo permitido: PDF.{' '}
                    </Text>
                  </Text>
                  <FileDropzone
                    accept=".pdf"
                    onFileChange={setCustomArtOrLogoFile}
                  />
                </div>
              </S.PersonaliaztionUpload>
            </S.Personalization>
          </S.PersonalizationBox>
        )}

        {props.shouldShowLogoSection && (
          <S.PersonalizationBox>
            <S.AddNameOption>
              <Text>Adicionar logotipo</Text>
            </S.AddNameOption>

            <S.Personalization>
              <S.PersonaliaztionUpload>
                <div>
                  <Text style={{ marginBottom: 0 }}>
                    É importante garantir que o arquivo esteja em alta
                    qualidade, com fundo transparente e que a cor do logotipo
                    tenha um bom contraste com a cor escolhida para o fundo do
                    cartão.
                  </Text>
                  <Text font="bodySm" color="grayDark">
                    Formatos permitidos: PNG, TIFF, EPS e PDF (com fundo
                    transparente).
                  </Text>
                </div>
                <div>
                  <FileDropzone
                    accept=".pdf,.tiff,.eps,.png"
                    onFileChange={setCustomArtOrLogoFile}
                  />
                </div>
              </S.PersonaliaztionUpload>
            </S.Personalization>
          </S.PersonalizationBox>
        )}

        <S.PersonalizationBox style={{ width: '100%' }}>
          {/* <S.AddNameOption>
            <Checkbox
              checked={shouldAddCustomName}
              onChange={handleShouldAddCustomName}
            >
              Adicionar nome
            </Checkbox>
            <Text font="bodySm" color="grayDark">
              +R$10 por cartão
            </Text>
          </S.AddNameOption> */}

          {shouldAddCustomName && (
            <S.Personalization>
              {!isCardQuantityOver10 ? (
                customNames.map((field, index) => {
                  return (
                    <div key={index}>
                      <Input
                        label={
                          shouldAllCustomNamesBeTheSame
                            ? 'Digite o nome aqui'
                            : `Nome ${index + 1}`
                        }
                        id={`Nome ${index + 1}`}
                        value={field}
                        onChange={handleNameChange(index)}
                        maxLength={24}
                      />
                      {quantity > 1 && index === 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <Checkbox
                            checked={shouldAllCustomNamesBeTheSame}
                            onChange={() =>
                              setShouldAllCustomNamesBeTheSame(
                                (state) => !state
                              )
                            }
                          >
                            Mesmo nome para todos os cartões
                          </Checkbox>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <S.PersonaliaztionUpload>
                  <div>
                    <S.NumberDot>1</S.NumberDot>
                    <Text>
                      Baixe nossa planilha e preencha com os nomes que gostaria
                      de colocar em cada cartão Unitok.
                    </Text>
                    <ButtonPrimary rightElement={<BsDownload />}>
                      Baixar planilha
                    </ButtonPrimary>
                  </div>
                  <div>
                    <S.NumberDot>2</S.NumberDot>
                    <Text>
                      Nos envie a planilha preenchida para podermos personalizar
                      seus cartões Unitok.
                    </Text>
                    <FileDropzone
                      accept=".xls"
                      onFileChange={setCustomNamesFile}
                    />
                  </div>
                </S.PersonaliaztionUpload>
              )}
            </S.Personalization>
          )}
        </S.PersonalizationBox>
      </S.CardInput>
    </S.Wrapper>
  )
}

export default memo(Personalization)
