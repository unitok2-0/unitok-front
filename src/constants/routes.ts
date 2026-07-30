// Auth
export const SIGN_UP = "users";
export const SIGN_IN = "users/login";
export const SEND_TOKEN_PHONE = "users/generateToken";
export const VERIFY_TOKEN_PHONE = "users/verify-token";
export const VERIFY_PASSWORD_QRCODE = "users/verify-password-qrcode";
export const VALIDATE_EMAIL = "validate/email";
export const FORGOT_PASSWORD = "password/forgot";
export const RESET_EMAIL = "password/reset";

export const GET_USER = (userId: string) => `users/${userId}`;
export const GET_USERS = "users";
export const UPDATE_USER = "users";
export const VERIFY_UNIQUE_NAME = (name: string) => `users/verify-name/${name}`;
export const GET_USER_PUBLIC = (id: string | string[]) => `users/profile/${id}`;
export const GET_ADM_TEAMS_USER = (id: string) => `users/${id}`;
export const GET_USER_INFORMATION = "users/myProfile";
export const ACTIVE_CODE_USER = "users/activeCode";
export const UPDATE_PROFILE_IMAGE_USER = "users/profile/image";
export const UPDATE_PROFILE_IMAGE_PET = "users/profile/pet-image";
export const UPDATE_PROFILE_BANNER_USER = "users/profile/banner";
export const CHANGE_PASSWORD_USER = "password/change";
export const GET_ALL_CONTACTS_USER = "users/get-contacts";
export const ADMIN_GET_CONTACTS = "admin/contacts";
export const ADMIN_GET_CONTACTS_GROUPED_BY_DATE = "admin/contacts/grouped-by-date";
export const ADMIN_DELETE_CONTACTS = "admin/contacts";
export const SEND_CONTACT = "users/add-contact";
export const GET_PIX_BRCODE = "users/get-brcode";

export const DELETE_CONTACT = `users/delete-contact`;
export const GET_QRCODE = (qrcode_id: string) => `users/qrcode/${qrcode_id}`;
export const GET_QRCODES = `users/qrcodes`;
export const RESET_QRCODES = `admin/qrcodes/clear`;
export const BLOCK_USERS = `admin/block-users`;
export const ADMIN_UPDATE_USER = (userId: string) => `admin/user/${userId}`;

export const GET_NOTIFICATIONS = `notification/`;
export const GET_NOTIFICATIONS_BY_RECEPTOR = (profileCodePet: string) =>
  `notification/receptor/${profileCodePet}`;
export const DELETE_NOTIFICATION = (notificationId: string) =>
  `notification/${notificationId}`;
export const CREATE_INVITE_TUTOR_NOTIFICATION = `notification/create`;
export const UPDATE_VIEW_NOTIFICATION = (notificationId: string) =>
  `notification/${notificationId}`;
export const UPDATE_RESPONSE_INVITE_NOTIFICATION = `notification/update-response-invite`;

export const CREATE_PET = `pet/`;
export const GET_MYPETS = `pet/pet-user/`;
export const GET_ONE_PET_USER = (profileCodePet: string) =>
  `pet/pet-user/${profileCodePet}`;
export const GET_ONE_PET = (profileCodePet: string) => `pet/${profileCodePet}`;
export const GET_ID_ONE_PET = (petId: string) => `pet/banner/${petId}`;
export const UPDATE_PET = `pet/`;
export const DELETE_PET = (petId: string) => `pet/${petId}`;
export const UPDATE_PET_BANNER = (petId: string) => `pet/banner/${petId}`;
export const DELETE_PET_BANNER = (petId: string) => `pet/banner/${petId}`;
export const UPDATE_PET_IMAGE = (petId: string) => `pet/image/${petId}`;
export const DELETE_PET_IMAGE = (petId: string) => `pet/image/${petId}`;
export const VERIFY_UNIQUE_PETNAME = `pet/verify-name/`;
export const ADD_IMAGE_PET_GALLERY = (petId: string) => `pet/gallery/${petId}`;
export const REMOVE_IMAGE_PET_GALLERY = (petId: string, imageId: string) =>
  `pet/gallery/${petId}/${imageId}`;
export const GET_USER_TUTOR = `users/get-user-tutor`;
export const ADD_TUTOR_PET = `pet/add-tutor`;
export const SEND_LOCATION_PET = `pet/notification`;
export const SEND_LOCATION_PET_WPP = `pet/notification-wpp`;
export const SEND_LOCATION_PET_CALL = `pet/notification-call`;
export const DELETE_TUTOR_IN_PET = (petId: string) =>
  `pet/delete-tutor/${petId}`;
export const DELETE_TUTOR_IN_PET_KICKOUT = `pet/delete-tutor-kickout/`;

export const GENERATE_APPLE_WALLET_PASS = (qrCode: string) => `/users/apple-wallet-passes/${qrCode}`;

export const UPDATE_TUTOR = `pet/update/tutor`;

export const ADD_NEW_DEVICE = "users/add-device";
export const GET_DEVICES = "users/get-devices";
export const GET_ALLPROFESSIONS = "users/allProfessions";
export const DELETE_DEVICES = (qrcode_id: string) =>
  `users/delete-device/${qrcode_id}`;
export const UPDATE_DEVICES = (qrcode_id: string) =>
  `users/update-device/${qrcode_id}`;

//Exhibitor CONARH
export const AUTH_EXHIBITOR = "exhibitor/login";
export const GET_EXHIBITOR = "exhibitor/findone";
export const CREATE_EXHIBITOR = "exhibitor";
export const UPDATE_EXHIBITOR_IMAGE = "exhibitor/update-image";
export const DELETE_EXHIBITOR_IMAGE = "exhibitor/delete-image";
export const UPDATE_EXHIBITOR = "exhibitor/update";
export const FOGOT_EMAIL_EXHIBITOR = "exhibitor/password/forgot";
export const RESET_PASSWORD_EXHIBITOR = "exhibitor/password/reset";

//Users CONARH
export const ISMAKECHECKED_USER = "users/conarh/list-checkin";
export const MAKECHECKIN_USER = "users/conarh/checkin";
export const GETCHECKINDAYS_USER = "users/conarh/get-checkins";
export const CREATE_VISITOR = "users/create-visitor";

//CUSTOM CARDS FORM
export const SEND_FORM_TO_BUDGET = "users/send-budget";

//ADMINS

export const GET_BATCHS = (skip?: number, searchText?: string) => `admin/batchs?skip=${skip}&searchString=${searchText}`;

// TEAMS GROUPS

export const GET_TEAMS_GROUPS = 'teams-groups'
export const GET_TEAMS_GROUP = (groupId: string) => `teams-groups/${groupId}`;
export const UPDATE_USER_TEAMS_GROUP = (groupId: string, userId: string) => `teams-groups/${groupId}/members/${userId}`;
export const UPDATE_NAME_TEAMS_GROUP = (groupId: string) => `teams-groups/${groupId}`;
export const ADD_USERS_TO_TEAMS_GROUP = (groupId: string) => `teams-groups/${groupId}/members/`;
export const ADD_USER_TO_TEAMS_GROUP = (groupId: string, userId: string) => `teams-groups/${groupId}/members/${userId}`;
export const REMOVE_USER_FROM_TEAMS_GROUP = (groupId: string, userId: string) => `teams-groups/${groupId}/members/${userId}`;
export const CREATE_TEAMS_GROUP = "teams-groups"
export const DELETE_TEAMS_GROUP = (groupId: string) => `teams-groups/${groupId}`;
export const UPDATE_TEAMS_GROUP = (groupId: string) => `teams-groups/${groupId}`;
export const DELETE_USERS_BY_ADMIN = "admin/users"

// ANALYTICS

export const ADMIN_GET_ANALYTICS_GROUPED_BY_DATE = '/analytics/grouped-by-date';