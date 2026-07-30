import { Scanner } from '@yudiel/react-qr-scanner';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import useDisclosure from 'hooks/useDisclosure';
import { ModalBlockedFeatureDevice } from 'components/Modals/ModalBlockedFeatureDevice';

import * as S from './styles';

type IReadQRCodeStepProps = {
  onQRCodeReaded: (result: string) => void;
}

export function ReadQRCodeStep({ onQRCodeReaded }: IReadQRCodeStepProps) {
  const modalBlockedDevice = useDisclosure();
  return (
    <>
    <AiOutlineExclamationCircle
        size={18}
        style={{
          top: '3rem',
          right: '3rem',
          position: 'absolute',
          cursor: 'pointer',
        }}
        onClick={modalBlockedDevice.handleToggle}
        title="Recurso do dispositivo pode estar bloqueado"
      />
    <S.StepsContainer>
      <ModalBlockedFeatureDevice
        closeModal={modalBlockedDevice.handleClose}
        modalIsOpen={modalBlockedDevice.isOpen}
        afterOpenModal={modalBlockedDevice.handleOpen}
      />
      <div className="container-qrcode">
        <img
          src="/assets/container_QRCODE.png"
          alt="Moldura do leitor de qrcode"
          className="iconBourdes"
        />

        <Scanner
          onScan={(detectedCodes) => {
            const value = detectedCodes[0]?.rawValue;
            if (value)
              onQRCodeReaded(value)
          }}
          constraints={{ facingMode: "environment" }}
          classNames={{ container: "qr-reader" }}
        />
      </div>
    </S.StepsContainer>
    </>
  )
}