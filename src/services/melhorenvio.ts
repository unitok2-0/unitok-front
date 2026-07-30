import axios from 'axios';

const api = axios.create({
  baseURL: 'https://melhorenvio.com.br',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MELHORENV_AUTH_KEY}`,
    'User-Agent': 'Unitok - contato@unitok.com'
  }
})


interface CalculateShipment {
  to: string;
  from?: string;
  quantity: number;
}

export interface ShippingInformation {
  company: {
    name: string;
  }
  custom_price: string;
  delivery_time: number;
  name: string;
  error?: string;
  discount: string;
  realPrice?: string;
}

export async function calculateShipment({ from = '12952494', to, quantity }: CalculateShipment) {
  const data = {
    from: {
      postal_code: from
    },
    to: {
      postal_code: to
    },
    package: [
      {
        width: 15,
        height: 1,
        length: 25,
        weight: 0.25 * quantity,
        quantity: 1
      }
    ]
  }
  const response = await api.post<ShippingInformation[]>('/api/v2/me/shipment/calculate', data);
  return response.data;

}