import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from "react";
import { useCart } from "contexts/CartContext";
import { SelectOption } from "components/Select";
import { formatPrice } from "utils/formatter";
import { getVoucherData, Voucher } from "services/payment";

export type UserPersonalData = {
  name: string;
  surname: string;
  document: string;
  phone: string;
  email: string;
};

export type AddressData = {
  CEP: string;
  city: string;
  state: string;
  street: string;
  number: string;
  district: string;
  complement?: string;
};

export type ShipmentData = {
  name: string;
  price: string;
  delivery_time: number;
}

export type PaymentMethods = "credit_card" | "boleto" | "pix" | "voucher";

export type PaymentData = {
  paymentMethod: PaymentMethods;
  installments: string;
  creditCardMethodData?: {
    number: string;
    verificationValue: string;
    ownerName: string;
    ownerCPF: string;
    expirationDate: string;
  };
};

export type ShipmentType = {
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

export type CheckoutContextValue = {
  unlockNextCheckoutStep(currentCheckoutStep: number): void;
  checkoutStep: number;
  userPersonalData: UserPersonalData;
  setUserPersonalData: Dispatch<SetStateAction<UserPersonalData>>;
  addressData: AddressData;
  setAddressData: Dispatch<SetStateAction<AddressData>>;
  paymentData: PaymentData;
  setPaymentData: Dispatch<SetStateAction<PaymentData>>;
  installmentOptions: SelectOption[];
  setPaymentMethod(paymentMethod: PaymentMethods | null): void;
  voucher?: Voucher | null;
  addVoucher: (voucherId: string) => Promise<void>;
  removeVoucher: () => void;
  discountPrice: number;
  discountedTotal: number;
  cleanUpCheckoutStorage(): void;
  shipments: ShipmentType[];
  setShipments: (shipments: ShipmentType[]) => void;
  selectedShipment: ShipmentType;
  setSelectedShipment: (type: ShipmentType) => void;
};



export const CheckoutContext = createContext({} as CheckoutContextValue);

const MAX_INSTALLMENTS = 3;

const CHECKOUT_LOCALSTORAGE_KEY = "unitok.checkout";

export const CheckoutProvider: React.FC = (props) => {
  const { selectedCards, allCardsSubtotal } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [userPersonalData, setUserPersonalData] = useState(
    {} as UserPersonalData
  );

  const [shipments, setShipments] = useState<ShipmentType[]>([{
    company: {
      name: 'Unitok'
    },
    custom_price: "0",
    realPrice: '0',
    delivery_time: 20,
    name: "DEFAULT",
    discount: '0'
  }]);

  const [selectedShipment, setSelectedShipment] = useState<ShipmentType>(shipments.find(type => type.name === "DEFAULT"))

  const [voucher, setVoucher] = useState<Voucher>(null);
  const [addressData, setAddressData] = useState({} as AddressData);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "credit_card",
    installments: "1",
  } as PaymentData);

  let discountPrice = 0;

  if (voucher?.discountPercentage) {
    discountPrice = allCardsSubtotal * (voucher.discountPercentage / 100);
  }

  if (voucher?.discountValueMonetary) {
    if (discountPrice) {
      discountPrice += voucher.discountValueMonetary;
    } else {
      discountPrice = voucher.discountValueMonetary;
    }
  }

  let discountedTotal = allCardsSubtotal - discountPrice + Number(selectedShipment?.realPrice) * 100;
  if (discountedTotal < 0) discountedTotal = 0;

  const installmentOptions = useMemo(() => {
    const installmentOptions: SelectOption[] = [];

    for (let installment = 1; installment <= MAX_INSTALLMENTS; installment++) {
      const installmentPriceFormatted = formatPrice(
        discountedTotal / installment
      );

      installmentOptions.push({
        label:
          installment === 1
            ? `${installmentPriceFormatted} à vista`
            : `${installment}x de ${installmentPriceFormatted} sem juros`,
        value: String(installment),
      });
    }

    return installmentOptions;
  }, [discountedTotal]);

  function unlockNextCheckoutStep(currentCheckoutStep: number) {
    setCheckoutStep((step) => {
      const isCurrentStepLastUnlocked = currentCheckoutStep === step;
      if (isCurrentStepLastUnlocked) return step + 1;
      return step;
    });
  }

  function setPaymentMethod(paymentMethod: PaymentMethods) {
    setPaymentData((state) => ({ ...state, paymentMethod }));
  }

  const addVoucher = useCallback(async (voucherId: string) => {
    try {
      const voucher = await getVoucherData(voucherId);

      if (voucher) {
        setVoucher(voucher);
      }
    } catch {
      throw new Error("Código inválido");
    }
  }, []);

  const removeVoucher = useCallback(() => {
    setVoucher(null);
  }, []);

  function cleanUpCheckoutStorage() {
    window.localStorage.removeItem(CHECKOUT_LOCALSTORAGE_KEY);

    setAddressData({} as AddressData);
    setVoucher(null);
    setPaymentData({
      paymentMethod: "credit_card",
      installments: "1",
    } as PaymentData);
    setUserPersonalData({} as UserPersonalData);
    setCheckoutStep(0);
  }

  useEffect(() => {
    if (!selectedCards.length) setCheckoutStep(0);
  }, [selectedCards]);

  // useEffect(() => {
  //   if (!window) return;

  //   try {
  //     const storageCheckout = window.localStorage.getItem(
  //       CHECKOUT_LOCALSTORAGE_KEY
  //     );

  //     const checkout = JSON.parse(storageCheckout);

  //     setAddressData(checkout.addressData);
  //     setVoucher(checkout.voucher);
  //     setPaymentData(checkout.paymentData);
  //     setUserPersonalData(checkout.userPersonalData);
  //     setCheckoutStep(checkout.checkoutStep);
  //   } catch {}
  // }, []);

  // useEffect(() => {
  //   if (!window) return;

  //   window.localStorage.setItem(
  //     CHECKOUT_LOCALSTORAGE_KEY,
  //     JSON.stringify({
  //       paymentData,
  //       addressData,
  //       userPersonalData,
  //       voucher,
  //       checkoutStep,
  //     })
  //   );
  // }, [paymentData, addressData, userPersonalData, voucher, checkoutStep]);

  return (
    <CheckoutContext.Provider
      value={{
        voucher,
        addVoucher,
        removeVoucher,
        discountPrice,
        discountedTotal,
        checkoutStep,
        unlockNextCheckoutStep,
        userPersonalData,
        setUserPersonalData,
        addressData,
        setAddressData,
        paymentData,
        setPaymentData,
        installmentOptions,
        cleanUpCheckoutStorage,
        setPaymentMethod,
        shipments,
        selectedShipment,
        setSelectedShipment,
        setShipments
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
