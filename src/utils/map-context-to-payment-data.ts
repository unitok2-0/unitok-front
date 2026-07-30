import { SelectedCard } from "contexts/CartContext";
import {
  AddressData,
  PaymentData,
  UserPersonalData,
} from "contexts/CheckoutContext";
import { ISale, Voucher } from "services/payment";
import { sendFileToS3 } from "services/uploadService";

export async function mapContextToSaleData(input: {
  addressData: AddressData;
  paymentData: PaymentData;
  userPersonalData: UserPersonalData;
  selectedCards: SelectedCard[];
}) {
  const items: ISale["items"] = [];

  for (const card of input.selectedCards) {
    const customNamesFileUrl =
      card.customNamesFile && (await sendFileToS3(card.customNamesFile));
    const customArtOrLogoFileUrl =
      card.customArtOrLogoFile &&
      (await sendFileToS3(card.customArtOrLogoFile));

    items.push({
      cardId: card._id,
      quantity: card.quantity,
      customNames: (card.customNamesFile
        ? []
        : card.customNames.filter(Boolean)) as string[],
      customNamesAmount:
        card.quantity > 10
          ? card.customNamesFile
            ? card.quantity
            : 0
          : card.shouldAllCustomNamesBeTheSame
            ? card.customNames.filter(Boolean).length && card.quantity
            : card.customNames.filter(Boolean).length,
      customNamesFileUrl: customNamesFileUrl?.Location,
      customArtOrLogoFileUrl: customArtOrLogoFileUrl?.Location,
    });
  }

  return {
    address_delivery: {
      ...input.addressData,
      complement: input.addressData.complement || "",
    },
    buyer: {
      phone: input.userPersonalData?.phone,
      document: input.userPersonalData?.document?.replace(/\D+/g, ""),
      email: input.userPersonalData?.email,
      name: `${input.userPersonalData.name} ${input.userPersonalData?.surname || ""
        }`.trim(),
    },
    items,
  };
}

export function mapContextToTransactionData(input: {
  paymentData: PaymentData;
  voucher?: Voucher;
  cardHash?: string;
}) {
  return {
    payment_method: input.paymentData.paymentMethod,
    installments: input.paymentData.installments,
    voucherId: input.voucher?.voucherId,
    card_hash: input.cardHash,
  };
}
