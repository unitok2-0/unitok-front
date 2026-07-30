import { useState } from "react";
import { toast } from "react-toastify";
import { addNewDevice } from "services/user";
import { useRouter } from 'next/router';

import { ActivationCodeStep } from "./steps/activationCode";
import { CongratulationsStep } from "./steps/congratulations";
import { ReadQRCodeStep } from "./steps/readQRCode/index";
import { WellcomeStep } from "./steps/wellcome";

import * as S from './styles';

type IInternalActivateDeviceContainerProps = {
  deviceType?: "PETS" | "CARD" | "TAG";
  onCloseActivationRequest?: () => void;
}

type IDevice = {
  _id: string;
  blocked: boolean;
  name: string;
  device_type: "PETS" | "CARD" | "TAG";
}

export function InternalActivateDeviceContainer({ deviceType  = "CARD", onCloseActivationRequest }: IInternalActivateDeviceContainerProps) {
  const [step, setStep] = useState(1);
  const [codeId, setCodeId] = useState('');
  const [activatedDevice, setActivatedDevice] = useState<IDevice>();

  const router = useRouter();

  const jumpToNextStep = () => setStep(current => current + 1);

  const jumpToPrevStep = () => setStep(current => current - 1);

  const handleQRCodeReaded = (link: string) => {
    const linkSplited = link.split('/');
    setCodeId(linkSplited.pop());
    jumpToNextStep();
  }

  const handleValidationCodeValidated = async () => {
    try {
      const { data } = await addNewDevice({ qrcode_link: codeId });
      setActivatedDevice(data?.qrcode);
      jumpToNextStep();
    } catch(e) {
      toast.error(e);
      onCloseActivationRequest && onCloseActivationRequest();
    }
  }

  const handlePushToProfileClick = () => {
    console.log('activatedDevice', activatedDevice)
    if(activatedDevice && activatedDevice.device_type === "PETS") 
      router.push(`/profile/pet-edit/${activatedDevice._id}`);
    else 
      router.push(`/profile/edit`);
  }

  return (
    <S.Container backgroundColor={step === 2 && 'white'}>
      <S.Content>
        {step === 1 && <WellcomeStep 
          deviceType={deviceType}
          onNextClick={jumpToNextStep} 
          onBackClick={onCloseActivationRequest}
        />}

        {step === 2 && <ReadQRCodeStep 
          onQRCodeReaded={handleQRCodeReaded} 
        />}

        {step === 3 && <ActivationCodeStep 
          deviceType={deviceType}
          onBackClick={jumpToPrevStep}
          onValidationCodeValidated={handleValidationCodeValidated}
        />}

        {step === 4 && <CongratulationsStep 
          deviceType={activatedDevice?.device_type || deviceType}
          onPushToProfileClick={handlePushToProfileClick}
        />}
      </S.Content>
    </S.Container>
  )
}