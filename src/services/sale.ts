import { mapSale } from "domain/Sales";
import { api } from "./api";

export interface SaleResponse {
  _id: string;
  buyer: Buyer;
  address_delivery: AddressDelivery;
  items: Item[];
  createdAt: Date;
  updatedAt: Date;
  transaction: Transaction;
  shipment_infos: {
    name: string;
    value: number;
  }
  subtotal_amount?: number;
  discount_value?: number;
}

export interface AddressDelivery {
  CEP: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

export interface Buyer {
  phone: string;
  document: string;
  email: string;
  name: string;
  _id: string;
}

export interface Item {
  cardId: string;
  quantity: number;
  customNames: any[];
  _id: string;
  customNamesAmount: number;
  customNamesFileUrl: string;
  customArtOrLogoFileUrl: string;
  card_info: CardInfo;
}

export interface CardInfo {
  _id: string;
  color: Color;
  customizationSide: string;
  modelCard: string;
  name: string;
  variant: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Color {
  values: any[];
}

export interface Transaction {
  transaction_id: number;
  amount: number;
  status: string;
  payment_method: string;
  installments: number;
  createdAt: Date;
  updatedAt: Date;
  boleto_url?: string | null;
  boleto_barcode?: string | null;
  boleto_expiration_date?: string | null;
  pix_qr_code?: string | null;
  pix_expiration_date?: string | null;
  voucherId?: string | null;
}

export async function getSale(id: string) {
  try {
    const { data } = await api.get<SaleResponse>(`/sales/${id}`);
    return await mapSale(data);
  } catch (error) {
    throw new Error("Erro ao obter dados da compra");
  }
}
