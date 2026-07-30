
import { CloseButton } from 'components/CloseButton';
import ShareContactModal from 'components/ShareContactModal';
import { generateVcardToContact } from 'constants/functions';
import useDisclosure from 'hooks/useDisclosure';
import { Contact } from 'pages/profile/contacts';
import { BsBookmark } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { deleteContact } from 'services/user';

import * as S from './styles'

import { Container } from './styles'


interface ContactMenuProps {
  setIsMenuOpen: (value: boolean) => void;
  contact: Contact;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

export function ContactMenu({ setIsMenuOpen, contact, contacts, setContacts }: ContactMenuProps) {

  const shareContactModal = useDisclosure(false)

  function generateAndDownloadVcard() {
    generateVcardToContact(contact);
  }

  async function handleDeleteContact() {
    try {
      const filteredContacts = contacts.filter(contactData => contactData._id !== contact._id);
      setContacts(filteredContacts);
      const { message } = await deleteContact({contact_ids: [contact._id]});
      setIsMenuOpen(false)
      toast.success(message);
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
      <Container>

        <button onClick={generateAndDownloadVcard}>
          <div className='icon'>
            <BsBookmark size={20} />
          </div>
          <p>Salvar contato na agenda</p>
          <div>
            <IoIosArrowForward size={20} />
          </div>
        </button>

        <button
          onClick={() => shareContactModal.handleOpen()}
        >
          <div className='icon'>
            <FiShare2 size={20} />
          </div>
          <p>Compartilhar contato</p>
          <div>
            <IoIosArrowForward size={20} />
          </div>
        </button>


        <button
          onClick={handleDeleteContact}
        >
          <div className='icon'>
            <IoMdClose size={20} />
          </div>
          <p>Excluir contato</p>
        </button>

      </Container>

      <ShareContactModal
        closeModal={shareContactModal.handleClose}
        modalIsOpen={shareContactModal.isOpen}
        contact={contact}
      />
    </>
  )
}
