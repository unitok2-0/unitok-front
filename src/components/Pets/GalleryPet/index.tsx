import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import SpinnerLoader from 'components/Loaders/SpinnerLoader';
import { getFileName, getImageUrl } from 'constants/functions';
import { useCallback, useState } from 'react';
import { PhotoPet } from '../PhotoPet';
import * as S from './styles';

interface GalleryPetProps {
  prefix?: any;
  onFileAdded?: any;
  petPhotos?: any;
  setPetPhotos?: (parameter: any) => void;
}

export default function GalleryPet({
  prefix,
  onFileAdded,
  petPhotos,
  setPetPhotos
}: GalleryPetProps) {
  const [isLoadingUpdatedImage, setIsLoadingUpdatedImage] = useState(false);

  const readUploadFileAsText = async (file) => {
    var oFReader = new FileReader();

    return new Promise<any>((resolve, reject) => {
      // var url = window.URL.createObjectURL(file);
      oFReader.onload = async function (oFREvent) {
        resolve(oFREvent?.target?.result);
      };

      oFReader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async (file: any) => {
      setIsLoadingUpdatedImage(true);

      const name = prefix
        ? `files/${prefix}/${getFileName(file.name)}`
        : `files/${getFileName(file.name)}`;

      file.path = name;

      let fileTemporary = undefined;
      try {
        fileTemporary = await readUploadFileAsText(file);
        /* //@ts-ignore
        document.getElementById("imageProfileEdit").style.background = `url(${fileTemporary}) no-repeat center`
        document.getElementById("imageProfileEdit").style.backgroundSize = "cover" */
      } catch (error) {

      }

      onFileAdded(file, fileTemporary);
      setTimeout(() => {
        setIsLoadingUpdatedImage(false);
      }, 4000)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onFileAdded]
  );

  return (
    <S.MainContainerPhotoPet>

      {!isLoadingUpdatedImage &&
        <S.ButtonAddImagePet>
          <input
            type="file"
            name="fileUploadGallery"
            id="fileUploadGallery"
            className="fileUploadGallery"
            style={{ display: "none" }}
            onChange={(e) => onDrop(e.target.files[0])}
          />
          <label htmlFor="fileUploadGallery">
            <img
              src="/assets/add_image_circle.svg"
              alt="Adicionar foto"
              style={{ cursor: 'pointer' }}
            />
          </label>
        </S.ButtonAddImagePet>
      }

      {isLoadingUpdatedImage &&
        <div
          className="buttonUpdatedLoading"
        >
          <SpinnerLoader
            colorSpinner="white"
            loading={isLoadingUpdatedImage}
            sizeSpinner={20}
          />
        </div>
      }

      {petPhotos?.length >= 1 &&
        petPhotos?.map((photo: { _id: string, key: string, location: string }, index: number) => (
          <PhotoPet
            key={index}
            photo={photo}
            allPhotosPet={petPhotos}
            setAllPhotosPet={setPetPhotos}
          />
        ))
      }
    </S.MainContainerPhotoPet>
  )
}
