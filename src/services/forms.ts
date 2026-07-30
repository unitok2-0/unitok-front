import { SEND_FORM_TO_BUDGET } from "constants/routes";
import { api } from "./api";

interface CustomCardsFormData {
  amount: number;
  corporate_name: string;
  document: string;
  segment: string;
  name: string;
  phone: string;
  email: string;
  CEP: string;
  state: string;
  city: string;
  district: string;
  address: string;
  number: string;
  complement?: string;
}

export async function sendCustomCardsBudget(data: CustomCardsFormData) {
  const response = await api.post(SEND_FORM_TO_BUDGET, data);

  return {
    status: response.status,
  };
}
