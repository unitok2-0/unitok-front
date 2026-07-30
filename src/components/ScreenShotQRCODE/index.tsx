import { Scanner } from '@yudiel/react-qr-scanner';
import * as S from './styles';

interface IScreenshootQRCODEProps {
  setQRCODE: (parameter: any) => void;
  setStep: (parameter: number) => void;
}

export default function ScreenshootQRCODE({
  setStep,
  setQRCODE
}: IScreenshootQRCODEProps) {


  async function handleGetQRCODE(qrcodevalue: string) {
    setQRCODE(qrcodevalue)
    setStep(3);
  }

  return(
    <S.ContainerScreenShotQRCode>
    <div className="container-qrcode">
      <img src="/assets/container_QRCODE.png" alt="Moldura do leitor de qrcode" className="iconBourdes" />
      <Scanner
        onScan={(detectedCodes) => {
          const value = detectedCodes[0]?.rawValue;
          if (value) {
            handleGetQRCODE(value)
          }
        }}
        onError={(error) => {
          console.info(error);
        }}
        constraints={{
          facingMode: "environment"
        }}
        classNames={{ container: "qr-reader" }}
      />
    </div>
  </S.ContainerScreenShotQRCode>
  )
}