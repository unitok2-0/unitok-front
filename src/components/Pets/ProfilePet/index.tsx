import Router from 'next/router';
import Avatar from 'components/Avatar';
import ShareProfilePetModal from '../ShareProfilePet';
import useDisclosure from 'hooks/useDisclosure';
import * as S from './styles';

import { useEffect, useMemo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import { getLuminosity } from 'utils/getLuminosity';
import { Heading, Text } from 'components/Typography';
import { FooterClean } from 'components/FooterClean';
import { useAuth } from 'contexts/AuthContext';
import { ModalPetSOS } from '../ModalPetSOS';
import { Pet } from 'contexts/PetContext';
import { getColorByLuminosity } from 'utils/get-color-by-luminosity';
import { ColorExtractor } from 'react-color-extractor'
import { ModalPhotoPet } from '../ModalPhotoPet';
import moment from "moment";
import { getImageUrl } from 'constants/functions';
import { ShareIconPetBanner } from 'components/ShareIconPetBanner';
import { ProfileIconPetBanner } from 'components/ProfileIconPetBanner';

interface ProfilePetProps {
  pet: Pet
}

export function ProfilePet({
  pet
}: ProfilePetProps) {
  const { user } = useAuth();
  const [imageLuminosity, setImageLuminosity] = useState(0)
  const [colors, setColors] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const shareProfilePetModal = useDisclosure();
  const SOSModal = useDisclosure();
  const modalPhotoPet = useDisclosure();

  useEffect(() => {
    const sum = colors.reduce((prev, curr) => {
      return getLuminosity(curr) + prev
    }, 0)

    const media = sum / colors.length
    setImageLuminosity(media)

    if (!colors || !colors[0]) {
      setImageLuminosity(255)
    }
  }, [pet, colors])


  const birthDateNotExists = pet?.birth === 'Invalid date' || pet?.birth === '' || typeof pet?.birth === 'undefined' || pet?.birth === null
  const ObservationNotExists = pet?.observation === '' || typeof pet?.observation === 'undefined' || pet?.observation === null
  const ColorNotExists = pet?.color === '' || typeof pet?.color === 'undefined' || pet?.color === null

  function isValidImageURL(str) {
    if (typeof str !== 'string') return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
  }

  return (
    <>
      {pet.bannerImage && (
        <ColorExtractor src={pet.bannerImage} getColors={(colors) => setColors(colors)} />
      )}
      <S.Wrapper>
        <S.ColorBanner background_url={pet?.bannerImage} style={{ background: pet?.bannerImage ?? "#F9FAFA" }}>
          <div className="banner">
            <div
              id="share-icon"
              style={{
                position: 'absolute',
                zIndex: '5',
                top: '32px',
                left: '15px',
                cursor: 'pointer',
              }}
              onClick={shareProfilePetModal.handleOpen}
            >
              <ShareIconPetBanner color={user?.profileColor} />
            </div>
            {user?._id &&
              <div
                id="profile-icon"
                style={{
                  position: 'absolute',
                  zIndex: '5',
                  top: '32px',
                  right: '15px',
                  cursor: 'pointer',
                }}
                onClick={() => Router.push('/profile/mypets')}
              >
                <ProfileIconPetBanner color={user?.profileColor} />
              </div>
            }
          </div>
        </S.ColorBanner>

        <S.Content>
          <S.PetContainer>
            <Avatar imageUrl={pet?.avatarImage} />
            <Heading
              font="titleSm"
              style={{ marginTop: "0.5rem", textAlign: "center", color: "#383D3B" }}
            >
              {pet?.name}
            </Heading>
            <Text color="grayDarkest">{pet?.species}</Text>
            <Text color="grayDark">{pet?.race}</Text>
          </S.PetContainer>

          <S.SOS onClick={SOSModal.handleOpen}>
            <div className="textSOS">
              Aperte o botão para avisar meus tutores que você me achou
            </div>

            <div className="buttonSOS">
              SOS
            </div>
          </S.SOS>

          <Heading>
            Informações gerais
          </Heading>

          <S.PetInformation>
            <S.TextContainer>
              <S.SmallText>Sexo</S.SmallText>
              <S.BigText>{pet?.sex}</S.BigText>
            </S.TextContainer>

            {
              !ColorNotExists &&
              <S.TextContainer>
                <S.SmallText>Cor</S.SmallText>
                <S.BigText>{pet?.color}</S.BigText>
              </S.TextContainer>
            }

            {
              !birthDateNotExists &&
              <S.TextContainer>
                <S.SmallText>Idade</S.SmallText>
                <S.BigText>{pet?.birth}</S.BigText>
              </S.TextContainer>
            }

            {
              !ObservationNotExists &&
              <S.TextContainer>
                <S.SmallText>Observação</S.SmallText>
                <S.BigText>{pet?.observation}</S.BigText>
              </S.TextContainer>
            }

          </S.PetInformation>

          <Heading>
            Galeria
          </Heading>

          <S.PetPhotos>
            {pet?.gallery?.map(photo => (
              isValidImageURL(photo?.location) ?
                <S.SquarePhoto
                  //@ts-ignnore
                  onClick={() => { setCurrentPhoto(pet?.gallery.indexOf(photo)); modalPhotoPet.handleOpen() }}
                  key={photo?.key}
                  src={getImageUrl(photo?.location)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/temporary_avatar_img.svg';
                  }}
                />
                :
                <S.ContainerVideo>
                  <img src="/assets/icon_video.svg" alt="video icon" />
                  <S.SquareVideo
                    preload='metadata'
                    src={getImageUrl(photo?.location)}
                    onClick={() => { setCurrentPhoto(pet?.gallery.indexOf(photo)); modalPhotoPet.handleOpen() }}
                    key={photo?.key}
                  >
                  </S.SquareVideo>
                </S.ContainerVideo>
            ))}

            <ModalPhotoPet
              currentPhoto={currentPhoto}
              allPhotos={pet?.gallery}
              modalIsOpen={modalPhotoPet.isOpen}
              closeModal={modalPhotoPet.handleClose}
            />

          </S.PetPhotos>

        </S.Content>

        <FooterClean />

        <ShareProfilePetModal
          closeModal={shareProfilePetModal.handleClose}
          modalIsOpen={shareProfilePetModal.isOpen}
          codeId={pet?.profileName ?? pet?.profileCode}
        />

        <ModalPetSOS
          pet={pet}
          closeModal={SOSModal.handleClose}
          modalIsOpen={SOSModal.isOpen}
        />

      </S.Wrapper>
    </>
  )
}
