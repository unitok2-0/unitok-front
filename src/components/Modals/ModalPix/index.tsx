import React, { useState } from 'react'
import MainModal from '../MainModal'
import { BackButton, ButtonWrapper, Content, IconAndTitle, StepOne, StepTwo } from './styles'
import { Text } from 'components/Typography'
import { CloseButton } from 'components/CloseButton'
import Scroll from 'utils/getScreenSize'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import CurrencyInput from 'react-currency-input-field';
import { UserProps } from 'domain/User'
import { getPixQrcode } from 'services/user'
import { QRCodeCanvas } from 'qrcode.react'
import { copyToClipboard } from 'utils/copy-to-clipboard'
import { toast } from 'react-toastify'


export interface ModalQRCODEProps {
  modalIsOpen: boolean
  pixKey: string
  afterOpenModal?: () => void
  closeModal: () => void
  user: UserProps
}

const ModalPix: React.FC<ModalQRCODEProps> = ({
  modalIsOpen,
  pixKey,
  afterOpenModal,
  closeModal,
  user
}) => {

  const [step, setStep] = useState(1);
  const [value, setValue] = useState<string>(null)
  const [screenWidth, setScreenWidth] = useState<number>(null)
  const [qrcodeValue, setQrcodeValue] = useState('')
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingQrcode, setIsGeneratingQrcode] = useState(false)


  async function handleGeneratePixQrcode() {
    let formatedValue
    if (value) {
      formatedValue = value.replaceAll('.', '').replaceAll(',', '.')
      if (Number(formatedValue) <= 0) formatedValue = undefined
    }

    try {
      setIsGeneratingQrcode(true)
      const pixQrcode = await getPixQrcode({
        city: 'PIX',
        key: pixKey,
        name: 'PIX',
        value: formatedValue
      });
      setQrcodeValue(pixQrcode.brcode)
      setStep(2);
    } catch (err) {
      toast.error("Falha ao gerar PIX")
    } finally {
      setIsGeneratingQrcode(false)
    }
  }

  function handleCopyPix() {
    copyToClipboard(qrcodeValue);
    setIsCopied(true)
  }

  function formatPixValue(value: string) {
    if (Number(value) === 0 || !value) {
      return "Sem valor"
    }
    const formatedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(Number(value.replaceAll('.', '').replaceAll(',', '.')))
    return formatedValue
    if (value.length === 1) {
      return `R$ ${value},00`
    } else {
      return `R$ ${value}`

    }
  }

  return (
    <>
      <Scroll setWidth={setScreenWidth} />
      <MainModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        customStyles={{
          content: {
            borderRadius: screenWidth <= 600 ? 0 : '10px',
          }
        }}
      >
        <Content>
          <div className='header'>
          </div>
          {screenWidth >= 600 ? (
            <CloseButton closeModal={closeModal} id="close-btn-desk" />
          ) : (
            <CloseButton closeModal={closeModal} id="close-btn-mobile" withIcon />
          )}
          {step === 2 && (
            <BackButton onClick={() => setStep(1)}>
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10L0.999996 10" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.75 18.75L0.999998 10L9.75 1.25" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </BackButton>
          )}



          <IconAndTitle>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5973 15.2999C14.8127 15.2999 14.0746 14.9943 13.5198 14.4397L10.52 11.4399C10.3094 11.2287 9.94229 11.2293 9.73176 11.4399L6.72102 14.4507C6.16614 15.0053 5.42813 15.3108 4.64347 15.3108H4.05231L7.85163 19.1101C9.03813 20.2966 10.9619 20.2966 12.1485 19.1101L15.9586 15.2999H15.5973Z" fill="#01302F" />
              <path d="M4.6433 4.68908C5.42795 4.68908 6.16597 4.9946 6.72085 5.54921L9.73158 8.56048C9.94841 8.7774 10.3025 8.77821 10.5198 8.56023L13.5196 5.56019C14.0745 5.00558 14.8125 4.70006 15.5971 4.70006H15.9585L12.1484 0.889943C10.9617 -0.296648 9.03796 -0.296648 7.85146 0.889943L4.05231 4.6891L4.6433 4.68908Z" fill="#01302F" />
              <path d="M19.1101 7.85167L16.8077 5.54921C16.757 5.56951 16.7021 5.58218 16.6441 5.58218H15.5973C15.056 5.58218 14.5262 5.80171 14.1438 6.18442L11.1441 9.18419C10.8634 9.46491 10.4945 9.60536 10.126 9.60536C9.75715 9.60536 9.38855 9.46491 9.10792 9.18446L6.09691 6.17346C5.71447 5.79066 5.18466 5.57122 4.64344 5.57122H3.35621C3.3013 5.57122 3.25 5.55828 3.20157 5.54004L0.889942 7.85167C-0.296647 9.03826 -0.296647 10.962 0.889942 12.1486L3.20147 14.4601C3.25 14.4418 3.3013 14.4289 3.35621 14.4289H4.64344C5.18466 14.4289 5.71447 14.2095 6.09691 13.8268L9.10764 10.816C9.65183 10.2723 10.6005 10.2721 11.1441 10.8163L14.1438 13.8158C14.5262 14.1985 15.056 14.418 15.5973 14.418H16.6441C16.7021 14.418 16.757 14.4307 16.8077 14.451L19.1101 12.1485C20.2966 10.9619 20.2966 9.03824 19.1101 7.85165" fill="#01302F" />
            </svg>
            <Text>PIX</Text>
          </IconAndTitle>

          {step === 1 && (
            <StepOne>
              <Text>Digite o valor a transferir:</Text>
              <CurrencyInput
                id="currency-input"
                allowNegativeValue={false}
                value={value}
                onValueChange={(value) => setValue(value)}
                defaultValue={0}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
              />
            </StepOne>
          )}
          {step == 2 && (
            <StepTwo>

              <QRCodeCanvas
                value={qrcodeValue || ''}
                size={200}
                level="M"
                fgColor="#2E3436"
                imageSettings={{
                  src: "/assets/Unitok_qrcode.svg",
                  height: 45,
                  width: 45,
                  excavate: true,
                }}
              />
              <Text className='value' color='primary'>Valor: <span>{formatPixValue(value)}</span></Text>
              <Text className='description'>Abra o App do seu banco e pague através do QRCode ou Pix Copia e Cola</Text>
            </StepTwo>
          )}
          <ButtonWrapper>
            {step === 1 && (
              <ButtonPrimary
                onClick={handleGeneratePixQrcode}
                fullWidth
                loading={isGeneratingQrcode}
              >
                Próximo
              </ButtonPrimary>
            )}
            {step === 2 && (
              <>
                {!isCopied ? (
                  <ButtonPrimary
                    onClick={handleCopyPix}
                    fullWidth
                    rightElement={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.1995 9.30005H11.0995C10.1054 9.30005 9.29956 10.1059 9.29956 11.1V19.2C9.29956 20.1941 10.1054 20.9999 11.0995 20.9999H19.1995C20.1936 20.9999 20.9994 20.1941 20.9994 19.2V11.1C20.9994 10.1059 20.1936 9.30005 19.1995 9.30005Z" stroke="white" strokeWidth="1.49999" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.69973 14.6999H4.79974C4.32235 14.6999 3.86452 14.5102 3.52696 14.1727C3.1894 13.8351 2.99976 13.3773 2.99976 12.8999V4.79998C2.99976 4.3226 3.1894 3.86476 3.52696 3.5272C3.86452 3.18964 4.32235 3 4.79974 3H12.8997C13.377 3 13.8349 3.18964 14.1724 3.5272C14.51 3.86476 14.6996 4.3226 14.6996 4.79998V5.69997" stroke="white" strokeWidth="1.49999" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  >
                    Copiar código PIX
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary rightElement={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="9.99988" r="9.75" fill="white" />
                      <path d="M15.1313 7.43359L8.97298 13.5922L5.38135 10.0007" stroke="#2AC087" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  }
                    fullWidth
                    colorScheme='success'
                  >
                    Copiado
                  </ButtonPrimary>
                )}

              </>

            )}


          </ButtonWrapper>
        </Content>
      </MainModal>
    </>
  )
}
export { ModalPix }
