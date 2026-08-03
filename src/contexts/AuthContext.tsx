import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import {
  signUpRequest,
  signInRequest,
  getUserInformation,
} from "../services/auth";
import { api } from "../services/api";
import { mapUser, UserProps } from "../domain/User";
import { getVoucherData } from "../services/payment";
import {
  deleteProfileBannerUser,
  formProfileUserProps,
  updateProfileBannerUser,
  updateProfileImageUser,
  updateProfileUser,
} from "services/user";
import destroyAllCookies from "utils/conarh2022/destroyAllCookies";

const initialCardsData = [
  {
    cardId: "#1",
    formattedPrice: "R$ 1,00",
    unitPrice: 100,
    title: "Cartão adbat 1 - Roxo",
    color: "#B871ED",
    quantity: 1,
  },
];

type SignUpFormDataProps = {
  name?: string;
  birthday?: string;
  email?: string;
  password?: string;
  document?: string;
  phone?: string;
  CEP?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  workPhone?: string;
  complement?: string;
  voucherId?: string;
};

type Card = {
  cardId: string;
  title: string;
  unitPrice: number;
  color: string;
};

export interface CheckoutCard extends Card {
  quantity: number;
}

export type Voucher = {
  voucherId: string;
  discountPercentage: number;
};

export type CartProps = {
  cards?: CheckoutCard[];
  shipping: number;
  voucher?: Voucher;
};

type SignInCredentials = {
  phone?: string;
  email?: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<UserProps>;
  signOut: () => void;
  setUser: (user: UserProps) => void;
  signUp: () => Promise<void>;
  updateSignUpFormData: (data: SignUpFormDataProps) => Promise<void>;
  signUpFormData: SignUpFormDataProps;
  user?: UserProps;
  isAuthenticated: boolean;
  cart: CartProps;
  addCardOnCart: (card: Card, quantity: number) => void;
  updateCardQuantity: (cardId: string, quantity: number) => void;
  removeCardFromCart: (cardId: string) => void;
  addVoucher: (voucherId: string) => Promise<void>;
  getFormattedCheckoutData: () => any;
  updateUser: (form: formProfileUserProps) => Promise<void>;
  updateImageUser: (form: FormData) => Promise<UserProps>;
  updateProfileBanner: (form: FormData | string) => Promise<UserProps>;
  deleteProfileBanner: () => Promise<UserProps>;
  imageTemporary: string;
  setImageTemporary: (url: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const delay = (amount = 80) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const AuthContext = createContext({} as AuthContextData);

let authChannel: any;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const [imageTemporary, setImageTemporary] = useState<string>("");
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormDataProps>();
  const isAuthenticated = !!user;

  const [cart, setCart] = useState<CartProps>({
    cards: initialCardsData,
    shipping: 0,
  });

  useEffect(() => {
    try {
      authChannel = new BroadcastChannel("auth");

      authChannel.onmessage = (message) => {
        switch (message.data) {
          case "signOut":
            Router.push("/login");
            break;
          case "signIn":
            Router.push("/profile/me");
            break;
          default:
            break;
        }
      };
    } catch (error) { }
  }, []);

  useEffect(() => {
    const { "unitok.token": token } = parseCookies();

    async function onGetUserFunction() {
      if (token) {
        const user = await getUserInformation();
        setUser(user);
        // localStorage.setItem('unitok.user', JSON.stringify(user))
      }
    }

    onGetUserFunction();
  }, []);

  async function updateSignUpFormData(propety: SignUpFormDataProps) {
    let objPropetys = propety;
    for (var propName in objPropetys) {
      if (!objPropetys[propName]) {
        delete objPropetys[propName];
      }
    }
    setSignUpFormData({ ...signUpFormData, ...objPropetys });
    await delay();
  }

  async function signUp() {
    try {
      let form = {
        full_name: signUpFormData.name,
        email: signUpFormData.email,
        password: signUpFormData.password,
        document: signUpFormData.document,
        phone: signUpFormData.phone,
        workPhone: signUpFormData.workPhone,
        address: {
          postalCode: signUpFormData.CEP,
          state: signUpFormData.state,
          city: signUpFormData.city,
          district: signUpFormData.district,
          street: signUpFormData.street,
          number: signUpFormData.number,
          complement: signUpFormData.complement,
        },
      };

      for (var propName in form) {
        if (!form[propName]) {
          delete form[propName];
        }
      }

      await signUpRequest(form);

      Router.push("/signup/success");
    } catch (error) {
      throw "Falhou, tente novamente...";
    }
  }

  async function signIn({ email, phone, password }: SignInCredentials) {
    try {
      await destroyAllCookies();
      const { token, user, isAuthorized, name } = await signInRequest({
        email,
        phone,
        password,
      });

      if (!isAuthorized) Router.push(`/login/notAuthorized?name=${name}`);

      if (!token || !user) throw "Falha...";

      setCookie(undefined, "unitok.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "unitok.user.roles", JSON.stringify(user?.roles), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      // setCookie(undefined, 'unitok.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: '/'
      // });

      // api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user);

      api.defaults.headers.Authorization = `${token}`;

      return user

      //authChannel?.postMessage("signIn");
    } catch (error) {
      throw error.error;
    }
  }

  async function updateUser(formDataUpdateUser: formProfileUserProps) {
    try {
      const user = await updateProfileUser(formDataUpdateUser);
      setUser(user);
    } catch (error) {
      throw error;
    }
  }

  async function updateImageUser(fileImage: FormData) {
    const resp = await updateProfileImageUser(fileImage);
    if (!resp?.user) {
      throw new Error("Falha ao atualizar imagem.");
    }
    const updatedUser = mapUser(resp.user);
    setImageTemporary("");
    setUser(updatedUser);
    return updatedUser;
  }

  async function updateProfileBanner(fileImage: FormData | string) {
    try {
      updateProfileBannerUser(fileImage)
        .then((resp) => {
          return resp;
        })
        .then((resp) => {
          const user = mapUser(resp?.user || {});
          if (resp?.user) {
            setImageTemporary("");
            setUser(user);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function deleteProfileBanner() {
    try {
      deleteProfileBannerUser()
        .then((resp) => {
          return resp;
        })
        .then((resp) => {
          const user = mapUser(resp?.user || {});
          if (resp?.user) {
            setUser(user);
          }
        })
        .catch((err) => {
          console.error(err);
        });

      return user;
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    /* destroyCookie(null, "unitok.token", {
      path: "/",
    }); */
    destroyAllCookies().then();

    authChannel?.postMessage("signOut");

    Router.push("/login");
  }

  function addCardOnCart(card: Card, quantity: number) {
    const cartCopy = { ...cart };
    const cardIndex = cartCopy.cards.findIndex(
      (currentCard) => currentCard.cardId === card.cardId
    );

    const cardExistsOnCart = cardIndex > -1;

    if (cardExistsOnCart) {
      cartCopy.cards[cardIndex].quantity += quantity;
    } else {
      cartCopy.cards.push({
        ...card,
        quantity,
      });
    }

    setCart(cartCopy);
  }

  function updateCardQuantity(cardId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    const cartCopy = { ...cart };

    const cardIndex = cartCopy.cards.findIndex(
      (currentCard) => currentCard.cardId === cardId
    );

    cartCopy.cards[cardIndex].quantity = newQuantity;

    setCart(cartCopy);
  }

  function removeCardFromCart(cardId: string) {
    const cartCopy = { ...cart };

    cartCopy.cards = cartCopy.cards.filter(
      (currentCard) => currentCard.cardId !== cardId
    );

    setCart(cartCopy);
  }

  async function addVoucher(voucherId: string) {
    const voucher = await getVoucherData(voucherId);

    if (voucher) {
      setCart((oldCartValue) => ({
        ...oldCartValue,
        voucher,
      }));
    }
  }

  const getFormattedCheckoutData = () => {
    const checkoutItems = cart.cards?.map((card) => ({
      id: card.cardId.toString(),
      title: card.title,
      unit_price: card.unitPrice,
      quantity: card.quantity,
    }));

    const address = {
      country: "br",
      state: signUpFormData.state ?? "",
      city: signUpFormData.city ?? "",
      district: signUpFormData.district ?? "",
      street: signUpFormData.street ?? "",
      number: signUpFormData.number ?? "",
      postalCode: signUpFormData.CEP?.replace("-", "") ?? "",
    };

    let formattedBirthday = "";
    if (signUpFormData.birthday) {
      const [day, month, year] = signUpFormData.birthday?.split("/");
      formattedBirthday = `${year}-${month}-${day}`;
    }

    const defaultCheckoutData = {
      customer: {
        full_name: signUpFormData.name ?? "",
        password: signUpFormData.password ?? "",
        email: signUpFormData.email ?? "",
        document: signUpFormData.document ?? "",
        phone: `+${signUpFormData.phone ?? ""}`,
        birthday: formattedBirthday,
        address,
      },
      billing: {
        name: signUpFormData.name ?? "",
        address,
      },
      shipping: {
        name: signUpFormData.name ?? "",
        fee: cart.shipping,
        address,
      },
      items: checkoutItems,
    };

    if (cart.voucher) {
      defaultCheckoutData["voucherId"] = cart.voucher.voucherId;
    }

    return defaultCheckoutData;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        signIn,
        signOut,
        signUp,
        updateUser,
        updateImageUser,
        imageTemporary,
        setImageTemporary,
        updateSignUpFormData,
        signUpFormData,
        cart,
        addCardOnCart,
        updateCardQuantity,
        removeCardFromCart,
        addVoucher,
        getFormattedCheckoutData,
        updateProfileBanner,
        deleteProfileBanner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
