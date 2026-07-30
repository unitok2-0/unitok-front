import { useState } from 'react';
import Router from 'next/router';
import { ModalOptions } from 'components/Modals/ModalOptionsDevice';
import { IDevice } from 'pages/profile/mydevices';
import { ModalDeleteDevice } from 'components/Modals/ModalDeleteDevice';

import IconOptions from '/public/assets/iconOpenStand.svg';
import * as S from './styles';
import Input from 'components/Inputs/Input';
import { DeleteDevice, generateAppleWalletPass, UpdateDevice } from 'services/user';
import { toast } from 'react-toastify';
import { FILES_URL } from 'constants/values';

interface CardDeviceProps {
  device: IDevice;
  setDevices: (devices: IDevice[]) => void;
  myDevices: IDevice[];
  index: number;
  lastChildren?: boolean;
}

const DeviceInfo = {
  "CARD": {
    img: "/assets/icon_svg_card_small.svg",
    width: 58,
    alt: "Cartão Unitok"
  },
  "TAG": {
    img: "/assets/icon_svg_tag_small.svg",
    width: 45,
    alt: "Tag redonda com logo no centro"
  },
  "PETS": {
    img: "/assets/icon_svg_pets_small.svg",
    width: 57,
    alt: "Tag redonda com chaveiro",
  },
  "STICKER": {
    img: "/assets/icon_svg_tag_small.svg", // Ainda não tem
    width: 57,
    alt: "Tag redonda com logo no centro e um celular do lado",
  },
  "UNKNOW": {
    img: "/assets/icon_svg_unitok_small.svg",
    width: 39,
    alt: "Logo unitok",
  }
}

export function CardDevice({
  device,
  setDevices,
  myDevices,
  index,
  lastChildren
}: CardDeviceProps) {

  const deviceType = DeviceInfo[device?.device_type || "UNKNOW"]

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isBeignRenamed, setIsBeignRenamed] = useState(false);
  const [deviceName, setDeviceName] = useState(device?.name)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function ToggleModalDelete() {
    setOpenModalDelete(!openModalDelete)
  }

  async function handleUpdateNameDevice(qrcode_id: string, name: string) {
    setIsBeignRenamed(true);

    try {
      const { data: deviceUpdated } = await UpdateDevice({ qrcode_id, name });
      const newArray = myDevices.filter((device) => device._id !== qrcode_id);

      newArray.push(deviceUpdated);
      setDevices(newArray);

      toast.success('Nome do dispositivo atualizado');
    } catch (error) {
      toast.error(error)
    } finally {
      setIsBeignRenamed(false)
    }
  }

  async function handleUpdateBlockedDevice(qrcode_id: string, blocked: boolean) {
    let textActiveOrBlocked: string;

    if (blocked) {
      textActiveOrBlocked = 'bloqueado'
    } else { textActiveOrBlocked = 'desbloqueado' }

    try {
      const { data: deviceUpdated } = await UpdateDevice({ qrcode_id, blocked });
      const newArray = myDevices.filter((device) => device._id !== qrcode_id);

      newArray.push(deviceUpdated);
      setDevices(newArray);

      toast.success(`Dispositivo ${textActiveOrBlocked} com sucesso`);
    } catch (error) {
      toast.error(error)
    } finally {
    }
  }

  async function handleDeleteDevice(deviceId: string) {
    try {
      await DeleteDevice({ qrcode_id: deviceId });
      toast.success("Dispositivo deletado com sucesso!");

      const newArrayDevices = myDevices.filter((device) => device._id !== deviceId);
      setDevices(newArrayDevices);

      ToggleModalDelete();
    } catch (error) {
      toast.error(error);
      ToggleModalDelete();
    }
  }

  async function handleAddToAppleWallet(device: IDevice) {
    const response = await generateAppleWalletPass(device._id);
    console.log('response', response);
    Router.push(`${FILES_URL}${response.apple_pass_file}`);
  }

  return (
    <S.Container lastChildren={lastChildren} index={index} blocked={device?.blocked} className="card-device-container">

      <div className="image-and-name">
        <img src={deviceType.img} alt={deviceType.alt} style={{ width: deviceType.width }} />

        <span className="name">
          {isBeignRenamed ? (
            <Input
              autoFocus
              defaultValue={deviceName || "Dispositivo 1"}
              onChange={(e) => setDeviceName(e.target.value)}
              onBlur={() => {

                handleUpdateNameDevice(device._id, deviceName)
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleUpdateNameDevice(device._id, deviceName)
                }
              }}
              id={`device-name-${device._id}`}
            />
          ) : (
            <>
              {device?.name || "Dispositivo 1"}

            </>
          )}
        </span>

      </div>

      <div className="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <IconOptions />
        {isMenuOpen &&
          <ModalOptions
            device={device}
            setIsMenuOpen={setIsMenuOpen}
            blocked={device?.blocked}
            openModalDelete={ToggleModalDelete}
            setIsBeignRenamed={setIsBeignRenamed}
            onUpdateBlockedDevice={() => handleUpdateBlockedDevice(device?._id, !device.blocked)}
            onAddToAppleWallet={() => handleAddToAppleWallet(device)}
          />
        }
      </div>

      <ModalDeleteDevice
        isOpenModalDelete={openModalDelete}
        closeModalDelete={ToggleModalDelete}
        setDevices={setDevices}
        onDeleteDevice={() => handleDeleteDevice(device?._id)}
      />

    </S.Container>
  )
}
