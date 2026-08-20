jest.mock("services/api", () => ({
  api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}));

import { api } from "services/api";
import {
  CREATE_INVITE_TUTOR_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_BY_RECEPTOR,
  UPDATE_RESPONSE_INVITE_NOTIFICATION,
  UPDATE_VIEW_NOTIFICATION,
} from "constants/routes";
import {
  handleCreateInviteTutorNotification,
  handleGetNotification,
  handleGetNotificationByReceptor,
  handleDeleteNotification,
  handleUpdateResponseInvitationNotification,
  handleUpdateViewNotification,
} from "services/notification";

afterEach(() => {
  jest.clearAllMocks();
});

describe("handleCreateInviteTutorNotification (rethrows error.response.data only if error.response exists)", () => {
  const dataRequest: any = {
    petId: "1",
    sender: { senderType: "USER", senderUser: "u1" },
    receiver: "u2",
    notificationData: { typeNotification: "INVITE", referenceId: "ref1" },
  };

  it("returns response.data on success and calls api.post with CREATE_INVITE_TUTOR_NOTIFICATION", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { _id: "n1" } });
    const result = await handleCreateInviteTutorNotification(dataRequest);
    expect(api.post).toHaveBeenCalledWith(CREATE_INVITE_TUTOR_NOTIFICATION, dataRequest);
    expect(result).toEqual({ _id: "n1" });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleCreateInviteTutorNotification(dataRequest)).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined (does not throw) when error.response is absent, e.g. a network error", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleCreateInviteTutorNotification(dataRequest);
    expect(result).toBeUndefined();
  });
});

describe("handleGetNotification", () => {
  it("returns response.data on success and calls api.get with GET_NOTIFICATIONS", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [{ _id: "n1" }] });
    const result = await handleGetNotification({});
    expect(api.get).toHaveBeenCalledWith(GET_NOTIFICATIONS);
    expect(result).toEqual([{ _id: "n1" }]);
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleGetNotification({})).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleGetNotification({});
    expect(result).toBeUndefined();
  });
});

describe("handleGetNotificationByReceptor", () => {
  it("returns response.data on success and calls api.get with GET_NOTIFICATIONS_BY_RECEPTOR(profileCodePet)", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [{ _id: "n1" }] });
    const result = await handleGetNotificationByReceptor({ profileCodePet: "code1" });
    expect(api.get).toHaveBeenCalledWith(GET_NOTIFICATIONS_BY_RECEPTOR("code1"));
    expect(result).toEqual([{ _id: "n1" }]);
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleGetNotificationByReceptor({ profileCodePet: "code1" })).rejects.toEqual({
      message: "invalid",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleGetNotificationByReceptor({ profileCodePet: "code1" });
    expect(result).toBeUndefined();
  });
});

describe("handleDeleteNotification", () => {
  it("returns response.data on success and calls api.delete with DELETE_NOTIFICATION(notificationId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await handleDeleteNotification({ notificationId: "n1" });
    expect(api.delete).toHaveBeenCalledWith(DELETE_NOTIFICATION("n1"));
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleDeleteNotification({ notificationId: "n1" })).rejects.toEqual({
      message: "invalid",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleDeleteNotification({ notificationId: "n1" });
    expect(result).toBeUndefined();
  });
});

describe("handleUpdateResponseInvitationNotification", () => {
  const responseData: any = { notificationId: "n1", invitationResponse: "ACCEPT" };

  it("returns response.data on success and calls api.post with UPDATE_RESPONSE_INVITE_NOTIFICATION", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await handleUpdateResponseInvitationNotification(responseData);
    expect(api.post).toHaveBeenCalledWith(UPDATE_RESPONSE_INVITE_NOTIFICATION, responseData);
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleUpdateResponseInvitationNotification(responseData)).rejects.toEqual({
      message: "invalid",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleUpdateResponseInvitationNotification(responseData);
    expect(result).toBeUndefined();
  });
});

describe("handleUpdateViewNotification", () => {
  it("returns response.data on success and calls api.put with UPDATE_VIEW_NOTIFICATION(notificationId)", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await handleUpdateViewNotification({ notificationId: "n1" });
    expect(api.put).toHaveBeenCalledWith(UPDATE_VIEW_NOTIFICATION("n1"));
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleUpdateViewNotification({ notificationId: "n1" })).rejects.toEqual({
      message: "invalid",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleUpdateViewNotification({ notificationId: "n1" });
    expect(result).toBeUndefined();
  });
});
