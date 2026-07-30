import { api } from "./api";

export interface Voucher {
  voucherId: string;
  discountPercentage: number;
  discountValueMonetary: number;
  valid: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ITransaction {
  payment_method: string;
  installments: string;
  voucherId?: string;
  card_hash?: string;
}

export interface ShippingInformation {
  company: {
    name: string;
  }
  custom_price: string;
  delivery_time: number;
  name: string;
  error?: string;
}
export interface ISale {
  buyer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  address_delivery: {
    CEP: string;
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    country?: string;
  };
  items: {
    cardId: string;
    quantity: number;
    customNamesAmount: number;
    customNames: string[];
    customNamesFileUrl?: string;
    customArtOrLogoFileUrl?: string;
  }[];
  shipment_infos: {
    name: string,
    value?: number
  };
}

interface Address {
  postalCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  country: string;
  canShow: boolean;
}

interface Item {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  tangible?: boolean;
}

interface CreateUserData {
  payment_method: string;
  installments?: string;
  voucherId?: string;
  card_hash?: string;
  customer: {
    full_name: string;
    password: string;
    type: string;
    email: string;
    document: string;
    phone: string;
    birthday: string;
    address: Address;
  };
  billing: {
    name: string;
    address: Address;
  };
  shipping: {
    name: string;
    fee: number;
    // delivery_date: string,
    // expedited: boolean,
    address: Address;
  };
  items: Item[];
}

export interface BoletoPaymentResponse {
  transaction: {
    boleto_url: string;
    boleto_barcode: string;
  };
  sale: { sale: { _id: string } };
}
export interface CreditCardPaymentResponse {
  transaction: any;
  sale: { sale: { _id: string } };
}

export interface PixPaymentResponse {
  transaction: {
    payload: {
      pix_expiration_date: string;
      pix_qr_code: string;
    };
  };
  sale: { sale: { _id: string } };
}

export type PaymentResponse = {
  boleto: BoletoPaymentResponse;
  credit_card: CreditCardPaymentResponse;
  pix: PixPaymentResponse;
};

export async function finishCheckout<T extends keyof PaymentResponse>(
  sale: ISale,
  transaction?: ITransaction
): Promise<PaymentResponse[T]> {
  try {
    const { data } = await api.post("/sales", {
      sale,
      transaction,
    });
    return data;
  } catch {
    throw new Error("Erro ao finalizar compra");
  }
}

export async function createUser(createUserData: CreateUserData) {
  try {
    const response = await api.post("/users", createUserData);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error("Erro ao criar usuário");
  }
}

export async function getVoucherData(
  voucherId: string
): Promise<Voucher | undefined> {
  try {
    const response = await api.get<Voucher>(`/vouchers/${voucherId}`);
    if (!response.data?.valid) {
      throw new Error("Voucher inválido");
    }

    return response.data;
  } catch (error) {
    throw new Error("Voucher inválido");
  }
}
export async function incrementUseVoucher(
  voucherId: string
): Promise<void> {
  try {
    await api.put(`/vouchers/${voucherId}`);
  } catch (error) {
    throw new Error("Voucher inválido");
  }
}
