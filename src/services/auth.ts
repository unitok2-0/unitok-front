import { api } from './api'
import { SIGN_UP, SIGN_IN, GET_USER_INFORMATION, VALIDATE_EMAIL, FORGOT_PASSWORD, RESET_EMAIL } from '../constants/routes'
import { mapUser } from '../domain/User'

type SignUpRequestData = {
  full_name: string;
  email: string;
  password: string;
  document: string;
  phone: string;
  address: {
    postalCode?: string;
    state?: string;
    city?: string;
    district?: string;
    street?: string;
    number?: string;
    complement?: string;
  }
}

type SignInRequestData = {
  email?: string;
  phone?: string;
  password: string;
}

export async function signUpRequest(formData: SignUpRequestData) {
  try {
    const response = await api.post(SIGN_UP, formData)
    const { data } = response
    return data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}

export async function signInRequest(formData: SignInRequestData) {
  try {
    const body = {
      email: formData?.email,
      phone: formData?.phone,
      password: formData?.password
    }
    const response = await api.post(SIGN_IN, body)
    const { data } = response
    return {
      token: data.authorization,
      user: mapUser(data || {}),
      isAuthorized: data.isAuthorized,
      name: data.name
    }
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}

export async function sendForgotPasswordEmail(email: string) {
  try {
    const response = await api.post(FORGOT_PASSWORD, { email })
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
    const response = await api.post(`${RESET_EMAIL}?token=${token}`, { password })
    const { data } = response
    return data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}


export async function getUserInformation() {
  try {
    const response = await api.get(GET_USER_INFORMATION)
    const { data } = response;
    const user = mapUser(data || {})
    return user
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}

export async function emailIsValidate(email: string) {
  try {
    const response = await api.post(VALIDATE_EMAIL, { email })
    const { data } = response
    return data?.emailExists
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw { error: 'Falha, tente novamente...' }
  }
}
