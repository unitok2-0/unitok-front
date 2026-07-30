import { ADD_IMAGE_PET_GALLERY, ADD_TUTOR_PET, CREATE_PET, DELETE_PET, DELETE_PET_BANNER, DELETE_PET_IMAGE, DELETE_TUTOR_IN_PET, DELETE_TUTOR_IN_PET_KICKOUT, GET_ID_ONE_PET, GET_MYPETS, GET_ONE_PET, GET_ONE_PET_USER, REMOVE_IMAGE_PET_GALLERY, SEND_LOCATION_PET, SEND_LOCATION_PET_CALL, SEND_LOCATION_PET_WPP, UPDATE_PET, UPDATE_PET_BANNER, UPDATE_PET_IMAGE, UPDATE_TUTOR, VERIFY_UNIQUE_PETNAME } from "constants/routes";
import { BASE_URL_BACKEND } from "constants/values";
import { TutorsButtons } from "contexts/PetContext";
import { mapPet } from "domain/Pet";
import { parseCookies } from "nookies";
import { api } from "./api";
import { getAPIClient } from "./axios";

interface ICreatePetData {
  qrcode: string;
}

export async function createPet({ qrcode }: ICreatePetData) {
  try {
    const response = await api.post(CREATE_PET, { qrcode });
    console.log(response.data)
    return response.data
  } catch (error) {
    return false;
  }
}

interface IGetMyPets {
  ctx?: any;
}

export async function getMyPets({ ctx }: IGetMyPets) {

  if (ctx) {
    const api = getAPIClient(ctx);
    try {
      const response = await api.get(GET_MYPETS);
      return response.data
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  try {
    const response = await api.get(GET_MYPETS);
    return response.data
  } catch (error) {
    return false;
  }
}

interface IGetOnePetUser {
  ctx?: any;
  profileCodePet: any;
}

export async function getOnePetUser({ ctx, profileCodePet }: IGetOnePetUser) {

  if (ctx) {
    const api = getAPIClient(ctx);
    try {
      const response = await api.get(GET_ONE_PET_USER(profileCodePet));
      return response.data
    } catch (error) {
      return false;
    }
  }

  try {
    const response = await api.get(GET_ONE_PET_USER(profileCodePet));
    return response.data
  } catch (error) {
    return false;
  }
}

interface IGetOnePet {
  ctx: any;
  profileCodePet: any;
}

export async function getOnePet({ ctx, profileCodePet }: IGetOnePet) {

  if (ctx) {
    const api = getAPIClient(ctx);
    try {
      const response = await api.get(GET_ONE_PET(profileCodePet));
      return response.data
    } catch (error) {
      return false;
    }
  }

  try {
    const response = await api.get(GET_ONE_PET(profileCodePet));
    return response.data
  } catch (error) {
    return false;
  }
}

interface IUpdatePetData {
  petId?: string;
  name?: string;
  petColor?: string;
  birth?: string;
  observation?: string;
  race?: string;
  sex?: string;
  species?: string;
  profileName?: string;
}

export async function UpdatePet(data: IUpdatePetData) {
  try {
    console.log(data)
    const response = await api.put(UPDATE_PET, data);
    return response.data
  } catch (error) {
    return false;
  }
}

interface IDeletePetData {
  petId: string;
}

export async function DeletePet({ petId }: IDeletePetData) {
  try {
    const response = await api.delete(DELETE_PET(petId));
    return response.data;
  } catch (error) {
    return false;
  }
}


interface UpdateProfilePetBannerData {
  petId: string;
  formData: FormData | string
}

export async function updateProfilePetBanner({ formData, petId }: UpdateProfilePetBannerData) {
  try {
    const response = await api.put(UPDATE_PET_BANNER(petId), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProfileBannerPet(petId: string) {
  try {
    const response = await api.delete(DELETE_PET_BANNER(petId));
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface UpdateProfilePetImageData {
  petId: string;
  formData: FormData | string
}

export async function updateProfileImagePet({ formData, petId }: UpdateProfilePetImageData) {
  try {
    const response = await api.put(UPDATE_PET_IMAGE(petId), formData);
    return response.data
  } catch (error) {
    throw error;
  }
}

interface DeleteProfileImagePet {
  form: any;
  petId: string;
}

export async function deleteProfileImagePet({ petId }: DeleteProfileImagePet) {
  try {
    const response = await api.delete(DELETE_PET_IMAGE(petId));
    return response.data
  } catch (error) {
    throw error;
  }
}

export async function verifyUniquePetName(name: string, petId: string) {

  const requestData = {
    name,
    petId,
  }

  try {
    const response = await api.post(VERIFY_UNIQUE_PETNAME, requestData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface addImagePetGallery {
  formData: any;
  petId: string;
}

export async function addImagePetGallery({ formData, petId }: addImagePetGallery) {
  try {
    const response = await api.post(ADD_IMAGE_PET_GALLERY(petId), formData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface removeImagePetGallery {
  petId: string;
  imageId: string;
}

export async function removeImagePetGallery({ petId, imageId }: removeImagePetGallery) {
  try {
    const response = await api.delete(REMOVE_IMAGE_PET_GALLERY(petId, imageId));
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface UpdateTutorData {
  petId: string;
  isOwner?: boolean;
  email?: TutorsButtons;
  phone?: TutorsButtons;
  sms?: TutorsButtons;
  whatsapp?: TutorsButtons;
}

export async function updateTutor(updateData: UpdateTutorData) {
  console.log(updateData)
  try {
    const response = await api.put(UPDATE_TUTOR, updateData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface addPetInTutor {
  petId: string;
  tutorId: string | string[];
}

export async function addPetInTutor(addTutorData: addPetInTutor) {
  try {
    const response = await api.post(ADD_TUTOR_PET, addTutorData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface sendLocationPet {
  petId: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  userId?: string;
}

export async function sendLocationPet(sendLocationPetData: sendLocationPet) {
  try {
    const response = await api.post(SEND_LOCATION_PET, sendLocationPetData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface sendLocationPetWpp {
  petId: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
}

export async function sendLocationPetWpp(sendLocationPetData: sendLocationPetWpp) {
  try {
    const response = await api.post(SEND_LOCATION_PET_WPP, sendLocationPetData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface sendLocationPetCall {
  petId: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
}

export async function sendLocationPetCall(sendLocationPetData: sendLocationPetCall) {
  try {
    const response = await api.post(SEND_LOCATION_PET_CALL, sendLocationPetData);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface deleteTutorInPet {
  petId: string;
}

export async function deleteTutorInPet({ petId }: deleteTutorInPet) {
  try {
    const response = await api.delete(DELETE_TUTOR_IN_PET(petId));
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}


interface deleteTutorInPetKickout {
  petId: string;
  tutorId: string;
}

export async function deleteTutorInPetKickout(dataDelete: deleteTutorInPetKickout) {
  try {
    const response = await api.put(DELETE_TUTOR_IN_PET_KICKOUT, dataDelete);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}


interface profileCodePetId {
  profileCodePet: string;
}

export async function handleGetPetIdBanner({ profileCodePet }: profileCodePetId) {
  try {
    const response = await api.get(GET_ID_ONE_PET(profileCodePet));
    const { data } = response
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}
