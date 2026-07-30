import { MainContainer } from "../../styles/pageStyles/profile/styles";
import { Heading, Text } from "components/Typography";
import { useState, useEffect } from "react";
import { CreateBoxDevice } from "components/BoxDevice";
import { CardDevice } from "components/CardDevice";
import { addNewDevice, getDevices, getQrcode } from "services/user";
import { withSSRAuth } from "utils/withSSRAuth";
import { toast } from "react-toastify";
import { devices as constantsDevices } from 'constants/devices';
import DashbardContainer from "containers/dashboard";
import PulseLoader from 'react-spinners/PulseLoader';

import * as S from "../../styles/pageStyles/profile/mydevices/styles";
import Head from "next/head";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { FiShoppingBag } from "react-icons/fi";
import { InternalActivateDeviceContainer } from "containers/internal-active-device";


/* export type Devices = {
  id: number;
  img: string;
  alt: string;
  name: string;
  blocked: boolean;
}

const exampleDevices: Devices[] = [
  { id: 1, img: '/assets/Unitok_logo_black.png', alt: 'Logo Unitok', name: 'Dispositivo 1', blocked: false },
  { id: 2, img: '/assets/Unitok_sticker_black.png', alt: 'Sticker Unitok', name: 'Dispositivo 2', blocked: false },
  { id: 3, img: '/assets/Unitok_card_roxo.png', alt: 'Cartão Unitok', name: 'Dispositivo 3', blocked: true }
] */


export type IDevice = {
  _id: string;
  blocked: boolean;
  name: string;
  device_type: string;
  apple_pass_file?: string;
}
interface MyDevicesProps {
}

export default function MyDevices() {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [showAddDevice, setShowAddDevice] = useState(false);

  useEffect(() => {
    getDevices({})
      .then(({ data }) => setDevices(data))
      .catch(() => toast.error('Erro ao consultar dispositivos!'))
  }, [])

  if(showAddDevice) {
    return (
      <>
        <Head>
          <title>Meus dispositivos | Adicionar dispositivo</title>
        </Head>
        <InternalActivateDeviceContainer onCloseActivationRequest={() => setShowAddDevice(false)} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Meus dispositivos | Unitok</title>
      </Head>

      <DashbardContainer variant="user-account">
        <Heading as="h1" font="titleMdLight" color="primary">
          Meus dispositivos Unitok
        </Heading>
        <MainContainer>
          {devices.length < 1 && (
            <Text
              fontWeight="500"
            >
              Você ainda não possui nenhum dispositivo Unitok.
            </Text>
          )}
          <S.ButtonsWrapper>
            <ButtonPrimary onClick={() => setShowAddDevice(true)}>Adicionar novo dispositivo</ButtonPrimary>
            <ButtonPrimary
              as="a"
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5508004550800"
              styleProp={{
                marginTop: '1.8rem',
                color: '#01302F'
              }}
              variant="tertiary"
              rightElement={<FiShoppingBag />}
            >
              Adquirir novo dispositivo
            </ButtonPrimary>
          </S.ButtonsWrapper>

          <S.MyProducts>
            <Heading style={{ marginBottom: '2.5rem' }}>Meus dispositivos Unitok</Heading>
            {devices?.map((device, index) => (
              <CardDevice index={index} lastChildren={devices.length === index + 1} key={device?._id} device={device} setDevices={setDevices} myDevices={devices} />
            ))}
          </S.MyProducts>
        </MainContainer>
      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
