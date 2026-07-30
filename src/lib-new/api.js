import axios from 'axios'

export const strapi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/`
});

export async function getForms() {
  try {
    const res = await strapi.get('formularios');
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function getPage(page) {
  try {
    const res = await strapi.get(page);
    return await res.data;
  } catch (error) {
    return false;
  }
}

export async function getPageSuporte() {
  try {
    const res = await strapi.get('page-suporte');
    return await res.data;
  } catch (error) {
    return false;
  }
}

export async function getPageEmpresas() {
  try {
    const res = await strapi.get('page-empresas');
    return await res.data;
  } catch (error) {
    return false;
  }
}
