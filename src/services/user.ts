import {
  UPDATE_USER,
  GET_USER_PUBLIC,
  ACTIVE_CODE_USER,
  CHANGE_PASSWORD_USER,
  SIGN_UP,
  SEND_TOKEN_PHONE,
  VERIFY_TOKEN_PHONE,
  VERIFY_UNIQUE_NAME,
  VERIFY_PASSWORD_QRCODE,
  UPDATE_PROFILE_IMAGE_USER,
  ISMAKECHECKED_USER,
  MAKECHECKIN_USER,
  GETCHECKINDAYS_USER,
  CREATE_VISITOR,
  ADD_NEW_DEVICE,
  GET_DEVICES,
  DELETE_DEVICES,
  UPDATE_DEVICES,
  UPDATE_PROFILE_BANNER_USER,
  GET_ALLPROFESSIONS,
  SEND_CONTACT,
  GET_ALL_CONTACTS_USER,
  DELETE_CONTACT,
  GET_QRCODE,
  GET_PIX_BRCODE,
  GET_USER_TUTOR,
  GET_ADM_TEAMS_USER,
  GENERATE_APPLE_WALLET_PASS,
  GET_QRCODES,
  GET_USERS,
  GET_USER,
  ADMIN_UPDATE_USER,
  ADMIN_GET_CONTACTS,
  ADMIN_GET_CONTACTS_GROUPED_BY_DATE,
  ADMIN_DELETE_CONTACTS,
  UPDATE_PROFILE_IMAGE_PET

} from "../constants/routes";
import { api } from "./api";
import { mapUser } from "../domain/User";
import { BASE_URL_BACKEND } from "constants/values";
import { parseCookies } from "nookies";
import { getAPIClient } from "./axios";
import axios from 'axios';
import { browserDownload } from "utils/downloadFunctions";
import { GetServerSidePropsContext } from "next";

export type formProfileUserProps = {
  name?: string;
  email?: string;
  full_name?: string;
  surname?: string;
  enterpriseName?: string;
  profession?: string;
  phone?: string;
  workPhone?: string;
  address?: {
    postalCode?: string;
    state?: string;
    city?: string;
    district?: string;
    street?: string;
    number?: string;
    complement?: string;
    canShow?: boolean;
  };
  userImage?: string;
  profileColor?: string;
  logoImage?: string;
  buttons?: Array<ButtonProps>;
  allowUsersUpdateProfileColor?: boolean;
  blockSaveContact?: boolean,
  blockSendContacts?: boolean,
  blockEditProfile?: boolean;
  petProfileName?: string;
  petProfileImage?: string;
};

type ButtonProps = {
  name?: string | undefined;
  title?: string;
  website_name?: string;
  url?: string | undefined;
};

type ActiveUserProps = {
  email: string;
  code: string;
  uniqueCode: string;
};

export async function getUser(userId: string, ctx?: GetServerSidePropsContext) {
  const apiClient = ctx ? getAPIClient(ctx) : api;

  try {
    const response = await apiClient.get(GET_USER(userId));

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IGetUsersParams = {
  administratorId?: string;
  search?: string;
  skip?: number;
  limit?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  context?: GetServerSidePropsContext;
}

export async function getUsers({ context, ...params }: IGetUsersParams) {
  const apiClient = context ? getAPIClient(context) : api;

  try {
    const response = await apiClient.get(GET_USERS, { params });

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type createUserAndActiveCard = {
  name?: string;
  lastname?: string;
  password: string;
  phone: string;
  email: string;
  unique_code: string;
  password_qr?: string;
  confirm_market?: boolean;
};

export async function createUserAndActiveCard({
  password,
  phone,
  email,
  unique_code,
  password_qr,
  lastname,
  name
}: createUserAndActiveCard) {
  try {
    const body = {
      password,
      phone,
      unique_code,
      email,
      lastname,
      name
    } as any;
    if (password_qr) body.password_qr = Number(password_qr);

    const response = await api.post(SIGN_UP, body);
    const { data } = response;
    // const user = data?.user ? mapUser(data?.user || null) : null
    // return { ...data, user }

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

type createTeamsAdminUser = {
  password?: string;
  phone?: string;
  email?: string;
  enterpriseName?: string;
  profileColor?: string;
  logoImage?: string;
  logoFile?: File;
};

export async function createTeamsAdminUser(adm: createTeamsAdminUser) {
  const formatPassword = adm.password.trim();
  try {
    const body = {
      password: formatPassword,
      phone: adm.phone,
      email: adm.email,
      enterpriseName: adm.enterpriseName,
      profileColor: adm.profileColor,
      logoImage: adm.logoImage,
      role: 'TEAMS_ADMIN',
    };
    const response = await api.post(SIGN_UP, body);
    const { data } = response;
    return data;

  } catch (error) {
    throw error.response.data;
  }
}

export async function createUserWithPetAndActive({
  password,
  phone,
  email,
  unique_code,
  password_qr,
  name
}: createUserAndActiveCard) {
  try {
    const body = {
      password,
      phone,
      unique_code,
      email,
      name
    } as any;
    if (password_qr) body.password_qr = Number(password_qr);

    const response = await api.post(`${SIGN_UP}/pet`, body);
    const { data } = response;
    // const user = data?.user ? mapUser(data?.user || null) : null
    // return { ...data, user }

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function sendTokenPhone(phone: string, type?: string, codeId?: string) {
  try {
    const response = await api.post(SEND_TOKEN_PHONE, { phone, type, codeId });
    const { data } = response;

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function verifyPasswordQr(qrCodeId: string, password_qr: number) {
  try {
    const response = await api.post(VERIFY_PASSWORD_QRCODE, {
      qrCodeId,
      password_qr,
    });
    const { data } = response;

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function verifyTokenPhone(phone: string, token: string) {
  try {
    const response = await api.post(VERIFY_TOKEN_PHONE, { phone, token });
    const { data } = response;

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function getPublicProfileUser(codeId: string | string[]) {
  try {
    const response = await api.get(GET_USER_PUBLIC(codeId));
    const { data } = response;
    const user = data?.user ? mapUser(data?.user || null) : null;
    return { ...data, user, deviceType: data?.deviceType };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}

export async function verifyUniqueName(name: string) {
  try {
    const response = await api.get(VERIFY_UNIQUE_NAME(name));
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function activeCodeUser({
  code,
  uniqueCode,
  email,
}: ActiveUserProps) {
  try {
    await api.post(ACTIVE_CODE_USER, {
      activation_code: code,
      unique_code: uniqueCode,
      email,
    });
    return true;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

export async function updateProfileUser(formData: formProfileUserProps) {
  try {
    let objPropetys = formData;
    /* for (var propName in objPropetys) {
      if (!objPropetys[propName]) {
        delete objPropetys[propName];
      }
    } */

    if (!objPropetys['name']) {
      delete objPropetys['name'];
    }
    console.log(objPropetys)
    const response = await api.put(UPDATE_USER, objPropetys);
    const { data } = response;
    const user = mapUser(data || {});

    return user;
  } catch (error) {
    console.log(error)
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function updateUser(userId: string, params: formProfileUserProps) {
  try {
    const response = await api.put(ADMIN_UPDATE_USER(userId), params);
    return response.data;
  } catch(error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function updateProfileImageUser(formData: FormData) {
  try {
    const response = await api.put(UPDATE_PROFILE_IMAGE_USER, formData);
    const { data } = response;
    return data;
  }
  catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function updatePetProfileImage(formData: FormData) {
  try {
    const response = await api.put(UPDATE_PROFILE_IMAGE_PET, formData);
    const { data } = response;
    return data;
  }
  catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function changePasswordUser(
  oldPassword: string,
  newPassword: string
) {
  try {
    const response = await api.post(CHANGE_PASSWORD_USER, {
      old_password: oldPassword,
      new_password: newPassword,
    });
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw { error: "Falha, tente novamente..." };
  }
}

export async function updateUserProfileStatus(status: "ACTIVE" | "INACTIVE") {
  try {
    const response = await api.put(UPDATE_USER, {
      status,
    });
    const { data } = response;
    const user = mapUser(data || {});

    return user;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

// EVENT CONARH

export async function isMakeChecked({ userId, exhibitorId }) {
  const data = { userId, exhibitorId }
  try {
    const response = await api.post(ISMAKECHECKED_USER, data);
    return response.data
  } catch (error) {
    return false;
  }
}

export async function makeCheckin({ userId, exhibitorId }) {
  const data = { userId, exhibitorId }
  try {
    const response = await api.post(MAKECHECKIN_USER, data);
    return response.data
  } catch (error) {
    return false;
  }
}

export async function getCheckins() {
  try {
    const response = await api.get(GETCHECKINDAYS_USER);
    return response.data
  } catch (error) {
    return false;
  }
}

interface getAllProfessionsData {
  ctx?: any
}

export async function getAllProfessions({ ctx }: getAllProfessionsData) {

  if (ctx) {
    const api = getAPIClient(ctx);
    try {
      const response = await api.get(GET_ALLPROFESSIONS);
      return response.data
    } catch (error) {
      return false;
    }
  }

  try {
    const response = await api.get(GET_ALLPROFESSIONS);
    return response.data
  } catch (error) {
    return false;
  }
}

interface CreateVisitorUserData {
  name: string;
  last_name: string;
  profession?: string;
  phone: string;
  email: string;
  password: string;
}

export async function createVisitorUser({
  password,
  phone,
  email,
  name,
  last_name,
  profession
}: CreateVisitorUserData) {
  let body = {};

  if (profession !== '') {
    body = {
      password,
      phone,
      email,
      full_name: `${name} ${last_name}`,
      profession
    }
  } else {
    body = {
      password,
      phone,
      email,
      full_name: `${name} ${last_name}`,
    }
  }

  try {
    const response = await api.post(CREATE_VISITOR, body);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}


interface AddNewDeviceData {
  qrcode_link: string;
}

export async function addNewDevice({ qrcode_link }: AddNewDeviceData) {
  try {
    const body = {
      qrcode_link
    }

    const response = await api.patch(ADD_NEW_DEVICE, body);

    if (response.data?.data.statusCode) {
      throw new Error(response.data.data.message)
    }

    const { data } = response;
    return data;

  } catch (err) {
    throw err.message
  }
}


interface GetDevicesData {
  ctx?: any;
}
export async function getDevices({ ctx }: GetDevicesData) {
  if (ctx) {
    const api = getAPIClient(ctx);

    try {
      const response = await api.get(GET_DEVICES);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data
      }
    }

  } else {
    try {
      const response = await api.get(GET_DEVICES);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data
      }
    }
  }
}

interface DeleteDevicesData {
  qrcode_id: string;
}

export async function DeleteDevice({ qrcode_id }: DeleteDevicesData) {
  try {
    const response = await api.delete(DELETE_DEVICES(qrcode_id));
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}

interface UpdateDevicesData {
  qrcode_id: string;
  name?: string;
  blocked?: boolean;
}

export async function UpdateDevice({ blocked, name, qrcode_id }: UpdateDevicesData) {
  const data = {
    blocked,
    name
  }

  try {
    const response = await api.patch(UPDATE_DEVICES(qrcode_id), data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}


export async function updateProfileBannerUser(formData: FormData | string) {
  try {
    const response = await api.put(UPDATE_PROFILE_BANNER_USER, formData);
    const { data } = response;
    return data;
  }
  catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

export async function deleteProfileBannerUser() {
  try {
    const response = await api.delete(UPDATE_PROFILE_BANNER_USER);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}


interface SendContactData {
  userId: string;
  name: string;
  email: string;
  surname: string;
  phone: string;
  /* job?: string;
  company?: string;
  note?: string; */
}

export async function sendContact(data: FormData) {

  try {
    const response = await api.post(SEND_CONTACT, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw { error: "Falha, tente novamente..." };
  }
}

interface getAllContactsUserData {
  ctx?: any
}

export async function getAllContactsUser({ ctx }: getAllContactsUserData) {

  if (ctx) {
    const api = getAPIClient(ctx);

    try {
      const response = await api.get(GET_ALL_CONTACTS_USER);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw { error: "Falha, tente novamente..." };
    }
  } else {
    try {
      const response = await api.get(GET_ALL_CONTACTS_USER);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw { error: "Falha, tente novamente..." };
    }
  }
}

interface getAllContactsUserPaginationData {
  ctx?: any;
  skip?: number;
}

export async function getAllContactsUserPagination({
  ctx,
  skip
}: getAllContactsUserPaginationData) {
  const GET_CONTACTS_USER_PAGINATION = `users/get-contacts?skip=${skip}`

  if (ctx) {
    const api = getAPIClient(ctx);

    try {
      const response = await api.get(GET_CONTACTS_USER_PAGINATION);
      return response.data
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw { error: "Falha, tente novamente..." };
    }
  } else {
    try {
      const response = await api.get(GET_CONTACTS_USER_PAGINATION);
      return response.data
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw { error: "Falha, tente novamente..." };
    }
  }
}

type AdminGetContactsData = {
  full_name?: string;
  userId?: string;
  administratorId?: string;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  limit?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  context?: GetServerSidePropsContext;
}

export async function adminGetContacts({context, ...params}: AdminGetContactsData) {
  const apiClient = context ? getAPIClient(context) : api;
  try {
    const response = await apiClient.get(ADMIN_GET_CONTACTS, { params });
    return response.data;
  } catch(error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type AdminGetContactsGroupedByDateData = {
  administratorId?: string;
  userId?: string;
  groupedBy?: "DAYS" | "MONTHS" | "YEARS"
  context?: GetServerSidePropsContext;
}

export async function adminGetContactsGroupedByDate({context, ...params}: AdminGetContactsGroupedByDateData) {
  const apiClient = context ? getAPIClient(context) : api;
  try {
    const response = await apiClient.get(ADMIN_GET_CONTACTS_GROUPED_BY_DATE, { params });
    return response.data;
  } catch(error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type AdminDeleteContactsData = {
  context?: GetServerSidePropsContext;
  userId?: string;
  contactsIds: string[];
}

export async function adminDeleteContacts({context, ...params}: AdminDeleteContactsData) {
  const apiClient = context ? getAPIClient(context) : api;
  try {
    const response = await apiClient.delete(ADMIN_DELETE_CONTACTS, { data: params });
    return response.data;
  } catch(error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

interface DeleteContactData {
  contact_ids: String[]
}

export async function deleteContact({
  contact_ids
}: DeleteContactData) {

  try {
    const { "unitok.token": token } = parseCookies();

    const response = await api.post(DELETE_CONTACT, { contact_ids }, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}


export async function getQrcode(qrcode_id: string) {
  try {
    const response = await api.get(GET_QRCODE(qrcode_id));

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

type IGetQrcodesParams = {
  administratorId?: string;
  skip?: number;
  limit?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  context?: GetServerSidePropsContext;
}

export async function getQrcodes({ context, ...params }: IGetQrcodesParams) {
  const apiClient = context ? getAPIClient(context) : api;

  try {
    const response = await apiClient.get(GET_QRCODES, { params });

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw "Falha, tente novamente...";
  }
}

interface GetPixQrcodeData {
  name: string;
  city: string;
  output?: string;
  key: string;
  value?: string;
}
export async function getPixQrcode({
  city,
  key,
  name,
  output,
  value
}: GetPixQrcodeData) {

  try {
    const body = {
      city,
      key,
      name,
      output,
      value
    }
    const response = await api.post(GET_PIX_BRCODE, body);
    return response.data;

  } catch (error) {

  }
}

interface GetUserTutor {
  phone: string;
}

export async function getUserTutor({
  phone
}: GetUserTutor) {

  try {
    const body = { phone }
    const response = await api.post(GET_USER_TUTOR, body);
    return response.data;

  } catch (error) {

  }
}

export async function generateAppleWalletPass(qrCode: string) {
  try {
    const response = await api.get(GENERATE_APPLE_WALLET_PASS(qrCode));

    return response.data;
  } catch (e) {
    console.error('Erro ao gerar Apple Wallet Pass', e);
  }
}
