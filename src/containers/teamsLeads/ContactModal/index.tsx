import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import { getImageUrl } from 'constants/functions';
import { ContactProps } from 'domain/Contact';

import * as S from './styles';

interface ContactModalProps {
  contact: ContactProps;
  isOpen: boolean;
  onCloseRequest: () => void;
  onSaveContactRequest?: (contact: ContactProps) => void;
  onDeleteContactRequest?: (contact: ContactProps) => void;
}

export default function ContactModal({ contact, isOpen, onCloseRequest, onSaveContactRequest, onDeleteContactRequest }: ContactModalProps) {
  if(!isOpen)
    return <></>

  let formatPhone = (phone: string) => {
    const x = phone.replace(/\D/g, '').match(/(\d{2})(\d{2})(\d{5})(\d{4})/);
    return '+' + x[1] + ' (' + x[2] + ') ' + x[3] + '-' + x[4];
  }



  return (
    <S.Backdrop onClick={onCloseRequest}>
      <S.Container onClick={e => e.stopPropagation()}>
        <Avatar imageUrl={getImageUrl(contact.photo)} />
        <h3>{contact.full_name}</h3>
        <h4>{contact.company}</h4>
        <small>{contact.job}</small>

        <div style={{ width: "85%" }}>
          {contact.phone && (
            <S.Data>
              <label>Telefone</label>
              <strong>{formatPhone(contact.phone)}</strong>
            </S.Data>
          )}
          {contact.email && (
            <S.Data>
              <label>E-mail</label>
              <strong>{contact.email}</strong>
            </S.Data>
          )}
        </div>

        <ButtonPrimary 
          style={{ marginTop: "1.5rem", width: "90%", textOverflow: "ellipsis", whiteSpace: "nowrap" }} 
          onClick={() => onSaveContactRequest && onSaveContactRequest(contact)}
        >
          Salvar este contato na agenda
        </ButtonPrimary>

        <ButtonPrimary 
          variant='secondary'
          style={{ width: "90%", textOverflow: "ellipsis", whiteSpace: "nowrap" }} 
        >
          Compartilhar este contato
        </ButtonPrimary>

        <ButtonPrimary 
          variant='tertiary' 
          style={{ marginTop: "1.5rem", fontSize: ".7rem" }} 
          onClick={() => onDeleteContactRequest && onDeleteContactRequest(contact)}
        >
          Excluir contato
        </ButtonPrimary>
      </S.Container>
    </S.Backdrop>
  )
}
