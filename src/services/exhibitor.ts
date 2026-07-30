import { AUTH_EXHIBITOR, CREATE_EXHIBITOR, DELETE_EXHIBITOR_IMAGE, FOGOT_EMAIL_EXHIBITOR, GET_EXHIBITOR, RESET_PASSWORD_EXHIBITOR, UPDATE_EXHIBITOR, UPDATE_EXHIBITOR_IMAGE, } from "constants/routes";
import { IExhibitor } from "contexts/AuthConarhContext";
import { api } from "./api";


export async function createAuthenticationConarhExhibitor({ email, password }) {
  const data = { email, password };
  try {
    const response = await api.post(AUTH_EXHIBITOR, data)
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}

export async function getExhibitorInformation(id: string, QRCODE: string) {
  const data = { id, QRCODE }
  try {
    const response = await api.post(GET_EXHIBITOR, data);
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}


interface CreateExhibitor {
  company_name: string;
  name: string;
  qrcodeId: string;
  phone: string;
  email: string
  password: string;
  niche: string;

}

export async function createExhibitor({
  name,
  phone,
  password,
  email,
  niche,
  company_name,
  qrcodeId }: CreateExhibitor) {

  try {
    const data = {
      name,
      phone,
      password,
      email,
      niche,
      qrcodeId,
      company_name
    }
    const response = await api.post(CREATE_EXHIBITOR, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}



interface UpdateExhibitorImageData {
  exhibitorId: string;
  file: any;
}

export async function updateExhibitorImage({ exhibitorId, file }: UpdateExhibitorImageData) {

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("exhibitorId", exhibitorId);

    const response = await api.put(UPDATE_EXHIBITOR_IMAGE, formData)
    return response.data
  } catch (error) {

  }
}

export async function deleteExhibitorImage({ exhibitorId }) {
  try {
    const response = await api.post(DELETE_EXHIBITOR_IMAGE, {exhibitorId});
    return response.data
  } catch (error) {
    
  }
}


interface UpdateExhibitorData {
  name: string;
  niche: string;
  email: string;
  phone: string;
  password?: string;
  company_name: string;
}

export async function updateExhibitor({ email, name, niche, phone, password, company_name }: UpdateExhibitorData) {

  const data = {
    email,
    name,
    niche,
    password,
    phone,
    company_name
  }
  try {
    const response = await api.put<IExhibitor>(UPDATE_EXHIBITOR, data)
    console.log(response);
    return response.data
  } catch (error) {
    console.log(error.response)
    throw error.response.data.error;
  }

}


export async function sendFogotEmail(email: string) {
  try {
    const response = await api.post(FOGOT_EMAIL_EXHIBITOR, { email })
    const { data } = response
    return data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}

export async function passwordReset(password: string, token: string) {
  try {
    const response = await api.post(`${RESET_PASSWORD_EXHIBITOR}?token=${token}`, { password })
    const { data } = response
    return data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}