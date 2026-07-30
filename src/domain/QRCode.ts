export interface QRCodeProps {
  _id: string;
  url: string;
  status: string;
  userId: string;
  exhibitorId?: string;
  petId?: string;
  batchId?: string;
  administratorId?: string;
  blocked: boolean;
  activatedDate: Date;
  isExhibitor?: boolean;
  device_type?: "PETS" | "CARD" | "TAG";
  qrcode_image?: string;
  name?: string;
  apple_pass_file?: string;
 }