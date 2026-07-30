import { useState } from 'react';
import { useRouter } from 'next/router';
import { Scanner } from '@yudiel/react-qr-scanner';
import PulseLoader from 'react-spinners/PulseLoader';

import { addNewDevice } from 'services/user';

import * as S from './styles';
import { toast } from 'react-toastify';

export type IDevice = {
  _id: string;
  blocked: boolean;
  name: string;
  device_type: string;
}

type IDeviceQRCodeReaderProps = {
  onDeviceAdded?: (device: IDevice) => {};
}

export function DeviceQRCodeReader({ onDeviceAdded }: IDeviceQRCodeReaderProps) {
  const [step, setStep] = useState<number>(1);
  const [finishedActiveDevice, setFinishedActiveDevice] = useState(false);

  const router = useRouter();

  async function handleActivateNewDevice(qrcodevalue: string) {
    try {
      setStep(2);
      const { data: newDevice } = await addNewDevice({ qrcode_link: qrcodevalue });
      onDeviceAdded(newDevice);
      setFinishedActiveDevice(true);
    } catch (err) {
      if (err.error) {
        toast.error(err.error)
      } else {
        toast.error(err)
      }
    } finally {
      setTimeout(() => {
        router.back();
      }, 2000)
    }
  }

  return (
    <>
      {step === 1 &&
        <S.ContainerScreenShotQRCode>
          <div className="container-qrcode">
            <img src="/assets/container_QRCODE.png" alt="Moldura do leitor de qrcode" className="iconBourdes" />

            <Scanner
              onScan={(detectedCodes) => {
                const value = detectedCodes[0]?.rawValue;
                if (value) {
                  handleActivateNewDevice(value)
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
      }

      {step === 2 &&
        <S.ModalActiveDevice>
          <S.CircularDevice>
            <S.CircularContainer>
              <img src="/assets/icon_svg_card_big.svg" alt="Cartão Unitok" width={100} />

              <S.Text finishActiveDevice={finishedActiveDevice}>
                {finishedActiveDevice ? (
                  'Pronto!'
                ) : (
                  'Ativando'
                )}
              </S.Text>

              <S.Span>
                {finishedActiveDevice ? (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="13" fill="#01302F" />
                    <path d="M22.8416 12.5784L14.6304 20.7898L9.84155 16.0012" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <PulseLoader size={6} color={'#FF4C1C'} margin={4} />
                )}
              </S.Span>
            </S.CircularContainer>
          </S.CircularDevice>
        </S.ModalActiveDevice>
      }
    </>
  )
}