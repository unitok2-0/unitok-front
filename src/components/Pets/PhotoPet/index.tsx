import { getImageUrl } from 'constants/functions';
import { usePet } from 'contexts/PetContext';
import { toast } from 'react-toastify';
import * as S from './styles';

interface PhotoPetProps {
  photo: {
    key: string;
    _id: string;
    location: string;
  };
  allPhotosPet: any;
  setAllPhotosPet: any;
}


function isValidImageURL(str) {
  if (typeof str !== 'string') return false;
  return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp|webp)$/gi);
}

export function PhotoPet({
  photo,
  allPhotosPet,
  setAllPhotosPet,
}: PhotoPetProps) {

  const { handleDeleteImagePetGallery, pet } = usePet();

  async function handleDeleteImage(imageId: string) {
    try {
      const petResponse = await handleDeleteImagePetGallery({ petId: pet._id, imageId });
      setAllPhotosPet(petResponse.gallery)
      toast.success('Imagem deletada com sucesso');
    } catch (error) {
      toast.warning('Houve um erro ao salvar a imagem');
    }
  }

  return (
    isValidImageURL(photo?.location) ?
      <S.Container>
        <S.PhotoPet src={getImageUrl(photo.key)} alt="Pet Picture" height={90} width={90} />
        <S.IconDelete
          src="/assets/icon_trash.svg"
          alt="Botão deletar, icone lixeira"
          onClick={() => handleDeleteImage(photo._id)}
        />
      </S.Container>
    :
      <S.VideoPet>
        <video
          preload='metadata'
          src={getImageUrl(photo?.location)}
        />
        <S.IconDelete
          src="/assets/icon_trash.svg"
          alt="Botão deletar, icone lixeira"
          onClick={() => handleDeleteImage(photo._id)}
        />
      </S.VideoPet>
  )
}
