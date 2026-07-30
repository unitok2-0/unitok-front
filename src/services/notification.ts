import {
  CREATE_INVITE_TUTOR_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_BY_RECEPTOR,
  UPDATE_RESPONSE_INVITE_NOTIFICATION,
  UPDATE_VIEW_NOTIFICATION,
} from "constants/routes";
import { api } from "./api";

interface handleCreateInviteTutorNotificationData {
  petId: string;
  sender: {
    senderType: "USER";
    senderUser: string;
  };
  receiver: string | string[];
  notificationData: {
    typeNotification: "INVITE";
    referenceId: string;
  };
}

export async function handleCreateInviteTutorNotification(
  dataRequest: handleCreateInviteTutorNotificationData
) {
  try {
    const response = await api.post(
      CREATE_INVITE_TUTOR_NOTIFICATION,
      dataRequest
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}
interface handleGetNotificationData {}

export async function handleGetNotification({}: handleGetNotificationData) {
  try {
    const response = await api.get(GET_NOTIFICATIONS);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface handleGetNotificationByReceptorData {
  profileCodePet: string;
}

export async function handleGetNotificationByReceptor({
  profileCodePet,
}: handleGetNotificationByReceptorData) {
  try {
    const response = await api.get(
      GET_NOTIFICATIONS_BY_RECEPTOR(profileCodePet)
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface handleDeleteNotificationData {
  notificationId: string;
}

export async function handleDeleteNotification({
  notificationId,
}: handleDeleteNotificationData) {
  try {
    const response = await api.delete(DELETE_NOTIFICATION(notificationId));
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface handleUpdateResponseInvitationNotificationData {
  notificationId: string;
  invitationResponse: "ACCEPT" | "REFUSAL";
}

export async function handleUpdateResponseInvitationNotification(
  responseData: handleUpdateResponseInvitationNotificationData
) {
  try {
    const response = await api.post(
      UPDATE_RESPONSE_INVITE_NOTIFICATION,
      responseData
    );
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

interface handleUpdateViewNotification {
  notificationId: string;
}

export async function handleUpdateViewNotification({
  notificationId,
}: handleUpdateViewNotification) {
  try {
    const response = await api.put(UPDATE_VIEW_NOTIFICATION(notificationId));
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}
