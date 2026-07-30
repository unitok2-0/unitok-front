import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import { IDevice } from 'pages/profile/mydevices';
import * as S from './styles';

interface ModalDeleteDeviceProps {
  isOpenModalDelete: boolean;
  closeModalDelete: () => void;
  setDevices: (devices: IDevice[]) => void;
  onDeleteDevice: () => void;
}

export function ModalDeleteDevice({
  isOpenModalDelete,
  closeModalDelete,
  onDeleteDevice,
}: ModalDeleteDeviceProps) {

  function CloseModal() {
    closeModalDelete();
  }

  return (
    <S.Container openModal={isOpenModalDelete}>

      <S.Title>
        Você tem certeza que deseja apagar <br /> esse dispositivo?
      </S.Title>

      <S.Paragraph>
        Você não perderá acesso ao seu <br /> perfil e poderá ativá-lo novamente <br /> quando quiser.
      </S.Paragraph>

      <S.Buttons>
        <ButtonPrimary textButton='Apagar dispositivo' variant="secondary" onClick={onDeleteDevice} />
        <ButtonPrimary textButton='Cancelar' onClick={CloseModal} />
      </S.Buttons>
    </S.Container>
  )
}