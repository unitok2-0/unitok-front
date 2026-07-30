import { getImageUrl } from "constants/functions";
import moment from "moment";

export type TutorsButtons = {
  enable: boolean;
  value: string;
}

export type Tutors = {
  email: TutorsButtons,
  phone: TutorsButtons,
  sms: TutorsButtons,
  whatsapp: TutorsButtons
  isOwner: boolean;
  tutorId: string;
}

type PetProps = {
  _id: string;
  name: string;
  avatarImage: string;
  bannerImage: string;
  profileCode: string;
  profileName: string;
  species: string;
  race: string;
  sex: string;
  color: string;
  birth: string;
  observation: string;
  gallery: Array<{ key: string, location: string, _id: string }>;
  tutors?: Tutors[];
  userId: string;
}

export const mapPet = (pet: PetProps) => ({
  ...pet,
  _id: pet?._id,
  avatarImage: getImageUrl(pet?.avatarImage),
  bannerImage: getImageUrl(pet?.bannerImage) || null,
  birth: pet?.birth
});
