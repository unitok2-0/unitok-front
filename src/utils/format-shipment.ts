import { formatPrice } from "./formatter";

export interface ShippingInformation {
  company: {
    name: string;
  }
  custom_price: string;
  delivery_time: number;
  name: string;
  error?: string;
  discount: string;
}

interface FormatShipmentData {
  shipmenType: ShippingInformation;
}

export function SetShipmentePriceWithouDiscount(shipmenType: ShippingInformation) {

  const customPrice = Number(shipmenType?.custom_price);
  const realPrice = (Number(shipmenType?.discount) + customPrice).toFixed(2);

  return { ...shipmenType, realPrice }
}




export function FormatShipmentValue(value: number) {

  if (value <= 0) return "Grátis";

  return formatPrice(value);

}