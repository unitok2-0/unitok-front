import { BLOCK_USERS, GET_BATCHS, RESET_QRCODES } from "constants/routes";
import { api } from "./api";
import { getAPIClient } from "./axios";
import { SaleResponse } from "./sale";

interface IBatch {
  _id: string,
  password_batch: number,
  with_password: boolean,
  quantity: number,
  sheet_location: string,
  createdAt: Date
}
export type GeneratedQrCodeResponse = {
  qrcodes: string[];
  batch: IBatch;
};

export type Account = {
  _id: string;
  profileCode: string;
  full_name: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
};
type ProductTypes = "CARD" | "TAG" | "STICKER" | "PETS";
interface GenerateQrcodesData {
  withPassword: boolean;
  quantity: number;
  productType: ProductTypes;
  title: string;
  withImage: boolean;
}

export async function generateQRcodes(data: GenerateQrcodesData) {
  try {
    const body = {
      quantity_generate: data.quantity,
      withPassword: data.withPassword,
      title: data.title,
      product_type: data.productType,
      withImage: data.withImage
    }
    const response = await api.post<GeneratedQrCodeResponse>("/admin/qrcode", body);

    return response.data;
  } catch {
    throw new Error("Erro ao gerar QR Code");
  }
}

/* export async function getQRCodes(
  ctx,
  params?: {
    skip?: number;
    filter?: QRCode["status"];
    search?: string;
  }
) {
  try {
    const api = getAPIClient(ctx);
    const { data: qrCodes } = await api.get<QRCode[]>("/admin/qrcodes", {
      params,
    });

    return qrCodes;
  } catch (e) {
    console.log(e.message);
    throw new Error("Erro ao obter QR Codes");
  }
} */

export async function getSales(
  ctx,
  params?: {
    skip?: number;
    filter?: string;
    search?: string;
  }
) {
  try {
    const api = getAPIClient(ctx);
    const { data: sales } = await api.get<SaleResponse[]>("/sales", {
      params,
    });

    return sales;
  } catch (e) {
    console.log(e.message);
    throw new Error("Erro ao obter Pagamentos");
  }
}

export async function getAccounts(
  ctx,
  params?: {
    skip?: number;
    filter?: string;
    search?: string;
  }
) {
  try {
    const api = getAPIClient(ctx);
    const { data: accounts } = await api.get<Account[]>("/admin/list/users", {
      params,
    });

    return accounts;
  } catch (e) {
    console.log(e.message);
    throw new Error("Erro ao obter Pagamentos");
  }
}

interface IBatch {
  _id: string;
  with_password: boolean;
  password_batch: number;
  product_type: ProductTypes;
  sheet_location: string;
  title: string;
  createdAt: Date;
}

export async function getBatchs(skip = 0, searchString = '') {
  try {
    const response = await api.get<IBatch[]>(GET_BATCHS(skip, searchString));
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter pagamentos")
  }
}

type IResetQRCodesParams = {
  qrcodes: string[];
  deleteUsers?: boolean;
}

export async function resetQRCodes(params: IResetQRCodesParams) {
  try {
    const response = await api.put(RESET_QRCODES, params)
    console.log(response.data)
    return response.data;
  } catch (e) {
    console.error('Erro ao resetar qrcoes', e)
    throw new Error('Erro ao resetar qrcodes');
  }
}

type IBlockUsersParams = {
  usersIds: string[];
  revert?: boolean;
}

export async function blockUsers(params: IBlockUsersParams) {
  try {
    const response = await api.put(BLOCK_USERS, params)
    return response.data;
  } catch (e) {
    console.error('Erro ao alterar status do usuário e seus qrcodes', e)
    throw new Error('Erro ao alterar status do usuário e seus qrcodes');
  }
}
