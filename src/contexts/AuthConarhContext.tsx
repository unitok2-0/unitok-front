import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createAuthenticationConarhExhibitor,
  getExhibitorInformation
} from "services/exhibitor";


import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import Router from "next/router";
import jwtDecode from "jwt-decode";
import destroyAllCookies from "utils/conarh2022/destroyAllCookies";
import router from "next/router";

interface SignInData {
  email: string;
  password: string;
}
interface ITokenDecoded {
  _id: string;
}

interface ICheckin {
  user: string;
  moment: Date;
  exhibitor: string;
}
export interface IExhibitor {
  _id: string;
  email: string;
  isAdmin: boolean;
  image: string;
  name: string;
  company_name: string;
  phone: string;
  password: string;
  niche: string;
  exhibitorCode: string;
  checkins: ICheckin[];
}

type AuthConarhContextData = {
  signInConarh: (data: SignInData) => Promise<void>,
  signOut: () => void,
  handleUpdateImage: (location: string) => void,
  handleUpdateExhibitor: (user: IExhibitor) => void,
  user?: IExhibitor,
};

type AuthConarhProviderProps = {
  children: ReactNode;
};

const AuthConarhContext = createContext({} as AuthConarhContextData);

export function AuthConarhProvider({ children }: AuthConarhProviderProps) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const { "unitokConarh.token": tokenConarh } = parseCookies();

    async function onGetUserFunction() {
      if (tokenConarh) {

        const tokenDecoded: ITokenDecoded = await jwtDecode(tokenConarh);
        const id = tokenDecoded?._id;
        const exhibitorAndAdmin = await getExhibitorInformation(id, null);

        /* let objectExhibitorAndAdmin = {
          _id: exhibitorAndAdmin?._id,
          name: exhibitorAndAdmin?.name,
          email: exhibitorAndAdmin?.email,
          niche: exhibitorAndAdmin?.niche,
          image: exhibitorAndAdmin?.image,
          phone: exhibitorAndAdmin?.phone,
          isAdmin: exhibitorAndAdmin?.isAdmin,
          checkins: exhibitorAndAdmin?.checkins,
          company_name: exhibitorAndAdmin?.company_name
        } */

        setUser(exhibitorAndAdmin?._doc);
      }
    }

    onGetUserFunction();
  }, []);

  async function signInConarh({ email, password }) {
    await destroyAllCookies();
    try {
      const user = await createAuthenticationConarhExhibitor({ email: email.toLowerCase().trim() , password });

      let token = user.authorization;

      let objectUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        niche: user.niche,
        company_name: user.company_name,
        image: user.image,
        phone: user.phone,
        isAdmin: user.isAdmin,
        checkins: user.checkins,
      }

      if (!token || !objectUser) throw "E-mail ou senha incorreta";

      setCookie(undefined, "unitokConarh.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "unitokConarh.user.roles", JSON.stringify(objectUser), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(objectUser);

      api.defaults.headers.Authorization = `${token}`;

      if (objectUser?.isAdmin) {
        Router.push('/conarh2022/visits-event');
      } else {
        Router.push('/expositor/dashboard');
      }

    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    await destroyAllCookies();
    router.push('/conarh2022/login')
  }

  function handleUpdateImage(location: string) {
    setUser({ ...user, image: location });
  }

  function handleUpdateExhibitor(user: IExhibitor) {
    setUser(user)
  }

  return (
    <AuthConarhContext.Provider
      value={{
        signInConarh,
        signOut,
        handleUpdateImage,
        handleUpdateExhibitor,
        user
      }}
    >
      {children}
    </AuthConarhContext.Provider>
  );
}

export const useAuthConarh = () => useContext(AuthConarhContext);
