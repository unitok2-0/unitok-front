import { ButtonsProps } from "./User";

export interface TeamsGroupProps {
  id?: any;
  _id?: any;
  name: string;
  buttons: ButtonsProps[];
  administratorId: string;
  blockSendContacts?: boolean;
  blockSaveContact?: boolean;
  blockEditProfile?: boolean;
  allowUsersUpdateProfileColor?: boolean;
  
  members: {
   _id: string;
   full_name: string;
   name: string;
   occupationArea: string;
   userImage: string;
   status: "ACTIVE" | "INACTIVE";
  }[]
 }