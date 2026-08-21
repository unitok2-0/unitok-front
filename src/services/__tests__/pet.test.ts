jest.mock("services/api", () => ({
  api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}));
jest.mock("services/axios", () => ({
  getAPIClient: jest.fn(),
}));

import { api } from "services/api";
import { getAPIClient } from "services/axios";
import {
  ADD_IMAGE_PET_GALLERY,
  ADD_TUTOR_PET,
  CREATE_PET,
  DELETE_PET,
  DELETE_PET_BANNER,
  DELETE_PET_IMAGE,
  DELETE_TUTOR_IN_PET,
  DELETE_TUTOR_IN_PET_KICKOUT,
  GET_ID_ONE_PET,
  GET_MYPETS,
  GET_ONE_PET,
  GET_ONE_PET_USER,
  REMOVE_IMAGE_PET_GALLERY,
  SEND_LOCATION_PET,
  SEND_LOCATION_PET_CALL,
  SEND_LOCATION_PET_WPP,
  UPDATE_PET,
  UPDATE_PET_BANNER,
  UPDATE_PET_IMAGE,
  UPDATE_TUTOR,
  VERIFY_UNIQUE_PETNAME,
} from "constants/routes";
import {
  createPet,
  getMyPets,
  getOnePetUser,
  getOnePet,
  UpdatePet,
  DeletePet,
  updateProfilePetBanner,
  deleteProfileBannerPet,
  updateProfileImagePet,
  deleteProfileImagePet,
  verifyUniquePetName,
  addImagePetGallery,
  removeImagePetGallery,
  updateTutor,
  addPetInTutor,
  sendLocationPet,
  sendLocationPetWpp,
  sendLocationPetCall,
  deleteTutorInPet,
  deleteTutorInPetKickout,
  handleGetPetIdBanner,
} from "services/pet";

afterEach(() => {
  jest.clearAllMocks();
});

describe("createPet", () => {
  it("returns response.data on success and calls api.post with CREATE_PET", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { _id: "1" } });
    const result = await createPet({ qrcode: "abc" });
    expect(api.post).toHaveBeenCalledWith(CREATE_PET, { qrcode: "abc" });
    expect(result).toEqual({ _id: "1" });
  });

  it("propagates the error instead of swallowing it", async () => {
    const error = new Error("fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(createPet({ qrcode: "abc" })).rejects.toThrow("fail");
  });
});

describe("getMyPets (style A, ctx branch)", () => {
  it("uses module-level api.get when no ctx is passed", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [{ _id: "1" }] });
    const result = await getMyPets({});
    expect(getAPIClient).not.toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(GET_MYPETS);
    expect(result).toEqual([{ _id: "1" }]);
  });

  it("returns false on error when no ctx is passed", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const result = await getMyPets({});
    expect(result).toBe(false);
  });

  it("uses getAPIClient(ctx)'s client when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockResolvedValue({ data: [{ _id: "2" }] }) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const ctx = { req: {}, res: {} };

    const result = await getMyPets({ ctx });

    expect(getAPIClient).toHaveBeenCalledWith(ctx);
    expect(ctxClient.get).toHaveBeenCalledWith(GET_MYPETS);
    expect(api.get).not.toHaveBeenCalled();
    expect(result).toEqual([{ _id: "2" }]);
  });

  it("returns false on error when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockRejectedValue(new Error("fail")) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const result = await getMyPets({ ctx: {} });
    expect(result).toBe(false);
  });
});

describe("getOnePetUser (style A, ctx branch)", () => {
  it("uses module-level api.get when no ctx is passed", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { _id: "1" } });
    const result = await getOnePetUser({ profileCodePet: "code1" });
    expect(getAPIClient).not.toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(GET_ONE_PET_USER("code1"));
    expect(result).toEqual({ _id: "1" });
  });

  it("returns false on error when no ctx is passed", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const result = await getOnePetUser({ profileCodePet: "code1" });
    expect(result).toBe(false);
  });

  it("uses getAPIClient(ctx)'s client when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockResolvedValue({ data: { _id: "2" } }) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const ctx = { req: {} };

    const result = await getOnePetUser({ ctx, profileCodePet: "code1" });

    expect(getAPIClient).toHaveBeenCalledWith(ctx);
    expect(ctxClient.get).toHaveBeenCalledWith(GET_ONE_PET_USER("code1"));
    expect(api.get).not.toHaveBeenCalled();
    expect(result).toEqual({ _id: "2" });
  });

  it("returns false on error when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockRejectedValue(new Error("fail")) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const result = await getOnePetUser({ ctx: {}, profileCodePet: "code1" });
    expect(result).toBe(false);
  });
});

describe("getOnePet (style A, ctx branch)", () => {
  it("uses module-level api.get when no ctx is passed", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { _id: "1" } });
    const result = await getOnePet({ ctx: undefined, profileCodePet: "code1" });
    expect(getAPIClient).not.toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(GET_ONE_PET("code1"));
    expect(result).toEqual({ _id: "1" });
  });

  it("returns false on error when no ctx is passed", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const result = await getOnePet({ ctx: undefined, profileCodePet: "code1" });
    expect(result).toBe(false);
  });

  it("uses getAPIClient(ctx)'s client when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockResolvedValue({ data: { _id: "2" } }) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const ctx = { req: {} };

    const result = await getOnePet({ ctx, profileCodePet: "code1" });

    expect(getAPIClient).toHaveBeenCalledWith(ctx);
    expect(ctxClient.get).toHaveBeenCalledWith(GET_ONE_PET("code1"));
    expect(api.get).not.toHaveBeenCalled();
    expect(result).toEqual({ _id: "2" });
  });

  it("returns false on error when ctx is passed", async () => {
    const ctxClient = { get: jest.fn().mockRejectedValue(new Error("fail")) };
    (getAPIClient as jest.Mock).mockReturnValue(ctxClient);
    const result = await getOnePet({ ctx: {}, profileCodePet: "code1" });
    expect(result).toBe(false);
  });
});

describe("UpdatePet", () => {
  it("returns response.data on success and calls api.put with UPDATE_PET", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { _id: "1", name: "Rex" } });
    const result = await UpdatePet({ petId: "1", name: "Rex" });
    expect(api.put).toHaveBeenCalledWith(UPDATE_PET, { petId: "1", name: "Rex" });
    expect(result).toEqual({ _id: "1", name: "Rex" });
  });

  it("propagates the backend error payload instead of swallowing it", async () => {
    (api.put as jest.Mock).mockRejectedValueOnce({ response: { data: { error: "Nome de usuário já utilizado" } } });
    await expect(UpdatePet({ petId: "1" })).rejects.toEqual({ error: "Nome de usuário já utilizado" });
  });
});

describe("DeletePet (style A)", () => {
  it("returns response.data on success and calls api.delete with DELETE_PET(petId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await DeletePet({ petId: "1" });
    expect(api.delete).toHaveBeenCalledWith(DELETE_PET("1"));
    expect(result).toEqual({ success: true });
  });

  it("returns false on error", async () => {
    (api.delete as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const result = await DeletePet({ petId: "1" });
    expect(result).toBe(false);
  });
});

describe("updateProfilePetBanner (style B - rethrows raw error)", () => {
  it("returns response.data on success and calls api.put with UPDATE_PET_BANNER(petId)", async () => {
    const formData = new FormData();
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { pet: { _id: "1" } } });
    const result = await updateProfilePetBanner({ petId: "1", formData });
    expect(api.put).toHaveBeenCalledWith(UPDATE_PET_BANNER("1"), formData);
    expect(result).toEqual({ pet: { _id: "1" } });
  });

  it("rethrows the raw error on failure", async () => {
    const error = new Error("fail");
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    await expect(updateProfilePetBanner({ petId: "1", formData: new FormData() })).rejects.toBe(error);
  });
});

describe("deleteProfileBannerPet (style B)", () => {
  it("returns response.data on success and calls api.delete with DELETE_PET_BANNER(petId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { pet: { _id: "1" } } });
    const result = await deleteProfileBannerPet("1");
    expect(api.delete).toHaveBeenCalledWith(DELETE_PET_BANNER("1"));
    expect(result).toEqual({ pet: { _id: "1" } });
  });

  it("rethrows the raw error on failure", async () => {
    const error = new Error("fail");
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    await expect(deleteProfileBannerPet("1")).rejects.toBe(error);
  });
});

describe("updateProfileImagePet (style B)", () => {
  it("returns response.data on success and calls api.put with UPDATE_PET_IMAGE(petId)", async () => {
    const formData = new FormData();
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { avatarImage: "x" } });
    const result = await updateProfileImagePet({ petId: "1", formData });
    expect(api.put).toHaveBeenCalledWith(UPDATE_PET_IMAGE("1"), formData);
    expect(result).toEqual({ avatarImage: "x" });
  });

  it("rethrows the raw error on failure", async () => {
    const error = new Error("fail");
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    await expect(updateProfileImagePet({ petId: "1", formData: new FormData() })).rejects.toBe(error);
  });
});

describe("deleteProfileImagePet (style B)", () => {
  it("returns response.data on success and calls api.delete with DELETE_PET_IMAGE(petId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await deleteProfileImagePet({ petId: "1", form: {} });
    expect(api.delete).toHaveBeenCalledWith(DELETE_PET_IMAGE("1"));
    expect(result).toEqual({ success: true });
  });

  it("rethrows the raw error on failure", async () => {
    const error = new Error("fail");
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    await expect(deleteProfileImagePet({ petId: "1", form: {} })).rejects.toBe(error);
  });
});

describe("verifyUniquePetName (style C - rethrows error.response.data only if error.response exists)", () => {
  it("returns response.data on success and calls api.post with VERIFY_UNIQUE_PETNAME", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { unique: true } });
    const result = await verifyUniquePetName("Rex", "1");
    expect(api.post).toHaveBeenCalledWith(VERIFY_UNIQUE_PETNAME, { name: "Rex", petId: "1" });
    expect(result).toEqual({ unique: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "name taken" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(verifyUniquePetName("Rex", "1")).rejects.toEqual({ message: "name taken" });
  });

  it("returns undefined (does not throw) when error.response is absent, e.g. a network error", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await verifyUniquePetName("Rex", "1");
    expect(result).toBeUndefined();
  });
});

describe("addImagePetGallery (style C)", () => {
  it("returns response.data on success and calls api.post with ADD_IMAGE_PET_GALLERY(petId)", async () => {
    const formData = new FormData();
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { gallery: [] } });
    const result = await addImagePetGallery({ petId: "1", formData });
    expect(api.post).toHaveBeenCalledWith(ADD_IMAGE_PET_GALLERY("1"), formData);
    expect(result).toEqual({ gallery: [] });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "too many images" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(addImagePetGallery({ petId: "1", formData: new FormData() })).rejects.toEqual({
      message: "too many images",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await addImagePetGallery({ petId: "1", formData: new FormData() });
    expect(result).toBeUndefined();
  });
});

describe("removeImagePetGallery (style C)", () => {
  it("returns response.data on success and calls api.delete with REMOVE_IMAGE_PET_GALLERY(petId, imageId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { gallery: [] } });
    const result = await removeImagePetGallery({ petId: "1", imageId: "img1" });
    expect(api.delete).toHaveBeenCalledWith(REMOVE_IMAGE_PET_GALLERY("1", "img1"));
    expect(result).toEqual({ gallery: [] });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "not found" } };
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    await expect(removeImagePetGallery({ petId: "1", imageId: "img1" })).rejects.toEqual({
      message: "not found",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    const result = await removeImagePetGallery({ petId: "1", imageId: "img1" });
    expect(result).toBeUndefined();
  });
});

describe("updateTutor (style C)", () => {
  it("returns response.data on success and calls api.put with UPDATE_TUTOR", async () => {
    const updateData = { petId: "1", isOwner: true };
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { tutors: [] } });
    const result = await updateTutor(updateData);
    expect(api.put).toHaveBeenCalledWith(UPDATE_TUTOR, updateData);
    expect(result).toEqual({ tutors: [] });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    await expect(updateTutor({ petId: "1" })).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    const result = await updateTutor({ petId: "1" });
    expect(result).toBeUndefined();
  });
});

describe("addPetInTutor (style C)", () => {
  it("returns response.data on success and calls api.post with ADD_TUTOR_PET", async () => {
    const addTutorData = { petId: "1", tutorId: "t1" };
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await addPetInTutor(addTutorData);
    expect(api.post).toHaveBeenCalledWith(ADD_TUTOR_PET, addTutorData);
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(addPetInTutor({ petId: "1", tutorId: "t1" })).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await addPetInTutor({ petId: "1", tutorId: "t1" });
    expect(result).toBeUndefined();
  });
});

describe("sendLocationPet (style C)", () => {
  const payload = { petId: "1", name: "Rex", address: "Street", phone: "123" };

  it("returns response.data on success and calls api.post with SEND_LOCATION_PET", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { sent: true } });
    const result = await sendLocationPet(payload);
    expect(api.post).toHaveBeenCalledWith(SEND_LOCATION_PET, payload);
    expect(result).toEqual({ sent: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(sendLocationPet(payload)).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await sendLocationPet(payload);
    expect(result).toBeUndefined();
  });
});

describe("sendLocationPetWpp (style C)", () => {
  const payload = { petId: "1", name: "Rex", address: "Street", phone: "123" };

  it("returns response.data on success and calls api.post with SEND_LOCATION_PET_WPP", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { sent: true } });
    const result = await sendLocationPetWpp(payload);
    expect(api.post).toHaveBeenCalledWith(SEND_LOCATION_PET_WPP, payload);
    expect(result).toEqual({ sent: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(sendLocationPetWpp(payload)).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await sendLocationPetWpp(payload);
    expect(result).toBeUndefined();
  });
});

describe("sendLocationPetCall (style C)", () => {
  const payload = { petId: "1", name: "Rex", address: "Street", phone: "123" };

  it("returns response.data on success and calls api.post with SEND_LOCATION_PET_CALL", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { sent: true } });
    const result = await sendLocationPetCall(payload);
    expect(api.post).toHaveBeenCalledWith(SEND_LOCATION_PET_CALL, payload);
    expect(result).toEqual({ sent: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    await expect(sendLocationPetCall(payload)).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.post as jest.Mock).mockRejectedValueOnce(error);
    const result = await sendLocationPetCall(payload);
    expect(result).toBeUndefined();
  });
});

describe("deleteTutorInPet (style C)", () => {
  it("returns response.data on success and calls api.delete with DELETE_TUTOR_IN_PET(petId)", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await deleteTutorInPet({ petId: "1" });
    expect(api.delete).toHaveBeenCalledWith(DELETE_TUTOR_IN_PET("1"));
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    await expect(deleteTutorInPet({ petId: "1" })).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.delete as jest.Mock).mockRejectedValueOnce(error);
    const result = await deleteTutorInPet({ petId: "1" });
    expect(result).toBeUndefined();
  });
});

describe("deleteTutorInPetKickout (style C)", () => {
  const dataDelete = { petId: "1", tutorId: "t1" };

  it("returns response.data on success and calls api.put with DELETE_TUTOR_IN_PET_KICKOUT", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const result = await deleteTutorInPetKickout(dataDelete);
    expect(api.put).toHaveBeenCalledWith(DELETE_TUTOR_IN_PET_KICKOUT, dataDelete);
    expect(result).toEqual({ success: true });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "invalid" } };
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    await expect(deleteTutorInPetKickout(dataDelete)).rejects.toEqual({ message: "invalid" });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.put as jest.Mock).mockRejectedValueOnce(error);
    const result = await deleteTutorInPetKickout(dataDelete);
    expect(result).toBeUndefined();
  });
});

describe("handleGetPetIdBanner (style C)", () => {
  it("returns response.data on success and calls api.get with GET_ID_ONE_PET(profileCodePet)", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { _id: "1" } });
    const result = await handleGetPetIdBanner({ profileCodePet: "code1" });
    expect(api.get).toHaveBeenCalledWith(GET_ID_ONE_PET("code1"));
    expect(result).toEqual({ _id: "1" });
  });

  it("throws error.response.data when error.response exists", async () => {
    const error: any = new Error("bad request");
    error.response = { data: { message: "not found" } };
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    await expect(handleGetPetIdBanner({ profileCodePet: "code1" })).rejects.toEqual({
      message: "not found",
    });
  });

  it("returns undefined when error.response is absent", async () => {
    const error = new Error("network fail");
    (api.get as jest.Mock).mockRejectedValueOnce(error);
    const result = await handleGetPetIdBanner({ profileCodePet: "code1" });
    expect(result).toBeUndefined();
  });
});
