import SelectBannerModal from 'components/SelectBannerModal';
import useDisclosure from 'hooks/useDisclosure';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, ButtonStyles, BannerContainer } from './styles'
import { usePet } from 'contexts/PetContext';
import ButtonPrimaryIcon from 'components/Buttons/ButtonPrimaryIcon';
import { resolveImageUrl } from 'constants/functions';

interface ProfileBannerProps {
}

export function ProfileBannerPet({ }: ProfileBannerProps) {

  const { handleDeleteProfilePetBanner, pet } = usePet();

  const [updatingImage, setUpdatingImage] = useState(false)

  const [removeLoading, setRemoveLoading] = useState(false)
  const bannerModal = useDisclosure(false)
  const [haveBanner, setHaveBanner] = useState(false);
  const [bannerPet, setBannerPet] = useState('');

  const bannerDefault = "/assets/unitok_logo_banner_profile.svg";

  useEffect(() => {
    setBannerPet(pet?.bannerImage);
  }, [pet]);

  useEffect(() => {
    if(bannerPet === null || bannerPet === undefined || bannerPet === bannerDefault) {
      setHaveBanner(false)
    } else {
      setHaveBanner(true)
    }
  }, [bannerPet])

  async function handleRemoveProfileBanner() {
    try {
      setRemoveLoading(true)
      await handleDeleteProfilePetBanner(pet._id);
      setBannerPet(bannerDefault);
      setRemoveLoading(false)
      toast.success("Banner removido com sucesso.")
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <Container>

        <BannerContainer
          background_url={resolveImageUrl(bannerPet, bannerDefault)}
          className='background-container'
          id='bannerUpdatePet'
        >

        </BannerContainer>
        <div className='absolute-div'>
          <ButtonPrimaryIcon styleProp={ButtonStyles} onClick={() => bannerModal.handleOpen()} loading={updatingImage}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.28822 2.67334H2.59183C2.23595 2.67334 1.89465 2.81471 1.64301 3.06635C1.39137 3.31799 1.25 3.65929 1.25 4.01517V13.408C1.25 13.7638 1.39137 14.1051 1.64301 14.3568C1.89465 14.6084 2.23595 14.7498 2.59183 14.7498H11.9846C12.3405 14.7498 12.6818 14.6084 12.9334 14.3568C13.1851 14.1051 13.3264 13.7638 13.3264 13.408V8.71156" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.3205 1.66685C12.5874 1.39995 12.9494 1.25 13.3268 1.25C13.7043 1.25 14.0663 1.39995 14.3332 1.66685C14.6001 1.93376 14.7501 2.29576 14.7501 2.67322C14.7501 3.05068 14.6001 3.41269 14.3332 3.67959L7.95953 10.0533L5.27588 10.7242L5.94679 8.04053L12.3205 1.66685Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ButtonPrimaryIcon>

          {haveBanner && (
            <ButtonPrimaryIcon
              styleProp={ButtonStyles}
              style={{ background: "#FFFF", color: "#FF4C1C" }}
              loading={removeLoading}
              onClick={() => handleRemoveProfileBanner()}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.25055 4.27469H2.75055H14.7505" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.99981 4.27469V2.69969C4.99981 2.28198 5.15785 1.88137 5.43915 1.586C5.72046 1.29063 6.10199 1.12469 6.49981 1.12469H9.4998C9.89763 1.12469 10.2792 1.29063 10.5605 1.586C10.8418 1.88137 10.9998 2.28198 10.9998 2.69969V4.27469M13.2498 4.27469V15.2997C13.2498 15.7174 13.0918 16.118 12.8105 16.4134C12.5292 16.7087 12.1476 16.8747 11.7498 16.8747H4.24981C3.85199 16.8747 3.47046 16.7087 3.18916 16.4134C2.90785 16.118 2.74982 15.7174 2.74982 15.2997V4.27469H13.2498Z" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.50165 8.2121V12.9371" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.49988 8.2121V12.9371" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonPrimaryIcon>
          )}


        </div>

        <SelectBannerModal
          uploadReceiver="PET"
          setBannerPet={setBannerPet}
          pet={pet}
          closeModal={bannerModal.handleClose}
          modalIsOpen={bannerModal.isOpen}
          setUpdatingImage={setUpdatingImage}
        />
      </Container>
    </>
  )
}
