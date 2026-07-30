import { mapPet } from "domain/Pet";
import moment from "moment";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { addImagePetGallery, deleteProfileBannerPet, deleteProfileImagePet, removeImagePetGallery, updateProfileImagePet, updateProfilePetBanner, updateTutor } from "services/pet";
import { deleteProfileBannerUser } from "services/user";


export type TutorsButtons = {
  enable: boolean;
  value: string;
}

export type Tutors = {
  email: TutorsButtons,
  phone: TutorsButtons,
  sms: TutorsButtons,
  whatsapp: TutorsButtons
  isOwner: boolean;
  tutorId: any;
}

export type Pet = {
  _id: string;
  name: string;
  avatarImage: string;
  bannerImage: string;
  profileCode: string;
  profileName: string;
  species: string;
  race: string;
  sex: string;
  color: string;
  birth: string;
  observation: string;
  gallery: Array<{ key: string, location: string, _id: string }>;
  tutors?: Tutors[];
  userId: string;
}

interface UpdateProfilePetBannerData {
  petId: string;
  formData: FormData | string
}

interface UpdateProfilePetImageData{
  petId: string;
  formData: FormData | string
}

interface DeleteProfilePetImageData {
  form: any;
  petId: string;
}

interface AddImagePetGallery {
  formData: any;
  petId: string;
}

interface DeleteImagePetGallery {
  petId: string;
  imageId: string;
}

interface UpdateTutorData {
  petId: string;
  tutorId: string;
  isOwner?: boolean;
  email?: TutorsButtons;
  phone?: TutorsButtons;
  sms?: TutorsButtons;
  whatsapp?: TutorsButtons;
}

type PetContextData = {
  pet: Pet,
  setPet: (pet: Pet) => void;
  myPets: any;
  setMyPets: any;
  handleUpdateProfilePetBanner: (data: UpdateProfilePetBannerData) => Promise<Pet>;
  handleDeleteProfilePetBanner: (petId: string) => Promise<Pet>;
  handleUpdateProfilePetImage: (data: UpdateProfilePetImageData) => Promise<Pet>;
  handleDeleteProfilePetImage: (data:DeleteProfilePetImageData) => Promise<any>;
  handleAddImagePetGallery: (data: AddImagePetGallery) => Promise<Pet>;
  handleDeleteImagePetGallery: (data: DeleteImagePetGallery) => Promise<Pet>;
  handleUpdateTutor: (data: UpdateTutorData) => Promise<Pet>;
};

type PetProviderProps = {
  children: ReactNode;
}

export const PetContext = createContext({} as PetContextData);

export function PetProvider({ children }: PetProviderProps) {
  const [pet, setPet] = useState<Pet>();
  const [myPets, setMyPets] = useState([]);

  async function handleUpdateProfilePetBanner({ formData, petId }: UpdateProfilePetBannerData) {

    try {
      const data = await updateProfilePetBanner({ formData, petId });
      
      const formatPet = mapPet(data.pet);
      setPet(formatPet);

      return formatPet;
    } catch (error) {
      return error
    }
  }

  async function handleDeleteProfilePetBanner(petId: string) {
    try {
      const data = await deleteProfileBannerPet(petId);
    
      const formatPet =  mapPet(data.pet);
      setPet(formatPet)

      return pet;
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdateProfilePetImage({formData, petId}: UpdateProfilePetImageData) {
    try {
      const response = await updateProfileImagePet({formData, petId});
      return response;
    } catch (error) {
      throw error
    }
  }

  async function handleDeleteProfilePetImage({ form, petId }: DeleteProfilePetImageData) {
    try {
      const response = await deleteProfileImagePet({form, petId});
      return response;
    } catch (error) {
      throw error
    }
  }

  async function handleAddImagePetGallery({formData, petId}: AddImagePetGallery) {
    try {
      const response = await addImagePetGallery({formData, petId});
      return response;
    } catch (error) {
      throw error
    }
  }

  async function handleDeleteImagePetGallery({petId, imageId}: DeleteImagePetGallery) {
    try {
      const response = await removeImagePetGallery({petId, imageId});
      return response;
    } catch (error) {
      throw error
    }
  }

  async function handleUpdateTutor(data: UpdateTutorData) {
    try {
      const response = await updateTutor(data);
      return response;
    } catch (error) {
      throw error
    }
  }

  return (
    <PetContext.Provider
      value={{
        pet,
        setPet,
        myPets,
        setMyPets,
        handleUpdateProfilePetBanner,
        handleDeleteProfilePetBanner,
        handleUpdateProfilePetImage,
        handleDeleteProfilePetImage,
        handleAddImagePetGallery,
        handleDeleteImagePetGallery,
        handleUpdateTutor,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}

export const usePet = () => useContext(PetContext);