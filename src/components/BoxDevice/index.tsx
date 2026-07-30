import { devices } from 'constants/devices';
import * as S from './styles';

interface CreateBoxDeviceProps {
  selectDevice: (nameDevice: string, imgDevice: string) => void;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.4
    }
  }
};

const item = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
};


export function CreateBoxDevice({
  selectDevice
}: CreateBoxDeviceProps) {

  return (
    <>
      <S.Container variants={container} initial="hidden" animate="visible">
        {devices.map((device, index) => (
          <S.Card
            key={index}
            onClick={() => selectDevice(device.name, device.img)}
            variants={item}
          >
            <img src={device.img} alt=""/>
            <span>{device.title}</span>
          </S.Card>
        ))}
      </S.Container>
    </>
  )
}