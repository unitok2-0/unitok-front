interface UserProps { _id: string, full_name: string, userImage: string }

export interface ContactProps {
  _id: string;
  user_id: UserProps | string;
  full_name: string;
  email: string;
  phone: string;
  job?: string;
  company?: string;
  linkedin?: string;
  instagram?: string;
  photo?: string;
  administrator?: string;
  createdAt: Date;
  updatedAt: Date;
}