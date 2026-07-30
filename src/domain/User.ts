import moment from "moment";
import { getLuminosity } from "utils/getLuminosity";
import { getImageUrl, getLinkToButton, getUserImageUrl } from "../constants/functions";

export interface ButtonsProps {
  _id?: string;
  name: string;
  url: string;
  icon?: string;
  realUrl?: string;
  hide: boolean;
  website_name?: string;
  video_url?: string;
  brand_name?: string;
  product_name?: string;
  product_id?: string;
  title?: string;
  postalCode?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
  highlighted?: boolean;
  isDirectLink?: boolean;
}

interface AddressProps {
  postalCode?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
  canShow?: boolean;
}

interface CardProps {
  activationCode?: string;
  dateActivated?: string;
  isActivated?: boolean;
  needToBuy?: boolean;
  purchased?: boolean;
  qrcode_url?: string;
}

export interface UserProps {
  id?: string;
  _id: string;
  name?: string;
  surname?: string;
  bannerImage?: string;
  email?: string;
  full_name: string;
  enterpriseName?: string;
  occupationArea?: string;
  profession?: string;
  phone?: string;
  workPhone?: string;
  address?: AddressProps;
  userImage?: string;
  logoImage?: string;
  profileCode: string[] | string;
  profileColor: string;
  notifications: string[];
  petsIds: string[];
  buttons?: Array<ButtonsProps>;
  imageUrl?: string;
  bannerUrl?: string;
  card?: CardProps;
  status: "ACTIVE" | "INACTIVE";
  roles: string[];
  tempImage?: string;
  colorLuminosity?: number;
  teamsGroup?: {
    groupId: string;
    name: string;
   };
   administrator?: string;
   profileViewsQuantity: number;
   sharedContactsQuantity: number;
   allowUsersUpdateProfileColor?: boolean;
   blockSendContacts?: boolean;
   blockSaveContact?: boolean;
   blockEditProfile?: boolean;
   petProfileName?: string;
   petProfileImage?: string;
}

const mapButtonsUser = (buttons: Array<ButtonsProps>) => {
  try {
    const mappedButtons = buttons.map((button) => getLinkToButton(button));
    return mappedButtons;
  } catch (error) {
    return [];
  }
};

export const mapUser = (user: UserProps) => ({
  ...user,
  id: user?._id,
  buttons: mapButtonsUser(user?.buttons) || [],
  imageUrl: getUserImageUrl(user?.userImage),
  bannerUrl: getImageUrl(user?.bannerImage) || null,
  /*  colorLuminosity: getLuminosity(user?.profileColor), */
});
