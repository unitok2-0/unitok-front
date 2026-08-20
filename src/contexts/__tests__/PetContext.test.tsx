jest.mock("services/pet", () => ({
  updateProfilePetBanner: jest.fn(),
  deleteProfileBannerPet: jest.fn(),
  updateProfileImagePet: jest.fn(),
  deleteProfileImagePet: jest.fn(),
  addImagePetGallery: jest.fn(),
  removeImagePetGallery: jest.fn(),
  updateTutor: jest.fn(),
}));
jest.mock("services/user", () => ({
  deleteProfileBannerUser: jest.fn(),
}));

import { act, renderHook } from "@testing-library/react";
import { PetProvider, usePet, Pet } from "contexts/PetContext";
import {
  updateProfilePetBanner,
  deleteProfileBannerPet,
  updateProfileImagePet,
  deleteProfileImagePet,
  addImagePetGallery,
  removeImagePetGallery,
  updateTutor,
} from "services/pet";

const wrapper = ({ children }: { children: React.ReactNode }) => <PetProvider>{children}</PetProvider>;

const makePet = (overrides: Partial<Pet> = {}): Pet =>
  ({
    _id: "1",
    name: "Rex",
    avatarImage: "",
    bannerImage: "",
    profileCode: "code1",
    profileName: "Rex",
    species: "dog",
    race: "labrador",
    sex: "M",
    color: "brown",
    birth: "2020-01-01",
    observation: "",
    gallery: [],
    tutors: [],
    userId: "u1",
    ...overrides,
  } as Pet);

afterEach(() => {
  jest.clearAllMocks();
});

describe("handleUpdateProfilePetBanner", () => {
  it("on success calls setPet(mapPet(data.pet)) and returns the freshly mapped pet", async () => {
    const rawPet = makePet({ _id: "1", bannerImage: "https://files/banner.png" });
    (updateProfilePetBanner as jest.Mock).mockResolvedValueOnce({ pet: rawPet });

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: Pet;
    await act(async () => {
      returned = await result.current.handleUpdateProfilePetBanner({
        petId: "1",
        formData: new FormData(),
      });
    });

    expect(returned!._id).toBe(rawPet._id);
    expect(returned!.bannerImage).toBe(rawPet.bannerImage);
    // context state reflects the same freshly mapped pet
    expect(result.current.pet._id).toBe(rawPet._id);
    expect(result.current.pet.bannerImage).toBe(rawPet.bannerImage);
  });

  it("catches errors and RETURNS the error object instead of throwing (divergent from other handlers)", async () => {
    const error = new Error("upload failed");
    (updateProfilePetBanner as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: any;
    await act(async () => {
      returned = await result.current.handleUpdateProfilePetBanner({
        petId: "1",
        formData: new FormData(),
      });
    });

    expect(returned).toBe(error);
    // state was never touched since setPet was never reached
    expect(result.current.pet).toBeUndefined();
  });
});

describe("handleDeleteProfilePetBanner", () => {
  it("BUG: updates state via setPet(mapPet(data.pet)) internally, but RETURNS the stale closure `pet` value instead of the freshly mapped pet", async () => {
    const oldPet = makePet({ _id: "old", bannerImage: "https://files/old-banner.png" });
    const newRawPet = makePet({ _id: "new", bannerImage: "https://files/new-banner.png" });
    (deleteProfileBannerPet as jest.Mock).mockResolvedValueOnce({ pet: newRawPet });

    const { result } = renderHook(() => usePet(), { wrapper });

    // seed pet state with the old value before triggering the delete
    act(() => {
      result.current.setPet(oldPet);
    });
    expect(result.current.pet).toEqual(oldPet);

    let returned: Pet;
    await act(async () => {
      returned = await result.current.handleDeleteProfilePetBanner("old");
    });

    // Documented bug: the function's return value is the STALE closure `pet`
    // (the state value from before this call), not the freshly mapped pet.
    expect(returned!).toEqual(oldPet);
    expect(returned!._id).not.toBe(newRawPet._id);

    // Meanwhile the actual context state DOES reflect the freshly mapped pet -
    // return value and post-call state diverge.
    expect(result.current.pet._id).toBe(newRawPet._id);
    expect(result.current.pet.bannerImage).toBe(newRawPet.bannerImage);
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("delete failed");
    (deleteProfileBannerPet as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleDeleteProfilePetBanner("1");
      })
    ).rejects.toBe(error);
  });
});

describe("handleUpdateProfilePetImage", () => {
  it("does not call setPet - context pet state is left unchanged", async () => {
    (updateProfileImagePet as jest.Mock).mockResolvedValueOnce({ avatarImage: "x" });

    const { result } = renderHook(() => usePet(), { wrapper });
    expect(result.current.pet).toBeUndefined();

    let returned: any;
    await act(async () => {
      returned = await result.current.handleUpdateProfilePetImage({
        petId: "1",
        formData: new FormData(),
      });
    });

    expect(returned).toEqual({ avatarImage: "x" });
    expect(result.current.pet).toBeUndefined();
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("fail");
    (updateProfileImagePet as jest.Mock).mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleUpdateProfilePetImage({ petId: "1", formData: new FormData() });
      })
    ).rejects.toBe(error);
  });
});

describe("handleDeleteProfilePetImage", () => {
  it("does not call setPet - context pet state is left unchanged", async () => {
    (deleteProfileImagePet as jest.Mock).mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: any;
    await act(async () => {
      returned = await result.current.handleDeleteProfilePetImage({ form: {}, petId: "1" });
    });

    expect(returned).toEqual({ success: true });
    expect(result.current.pet).toBeUndefined();
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("fail");
    (deleteProfileImagePet as jest.Mock).mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleDeleteProfilePetImage({ form: {}, petId: "1" });
      })
    ).rejects.toBe(error);
  });
});

describe("handleAddImagePetGallery", () => {
  it("does not call setPet - context pet state is left unchanged", async () => {
    (addImagePetGallery as jest.Mock).mockResolvedValueOnce({ gallery: [{ _id: "g1" }] });

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: any;
    await act(async () => {
      returned = await result.current.handleAddImagePetGallery({ formData: new FormData(), petId: "1" });
    });

    expect(returned).toEqual({ gallery: [{ _id: "g1" }] });
    expect(result.current.pet).toBeUndefined();
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("fail");
    (addImagePetGallery as jest.Mock).mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleAddImagePetGallery({ formData: new FormData(), petId: "1" });
      })
    ).rejects.toBe(error);
  });
});

describe("handleDeleteImagePetGallery", () => {
  it("does not call setPet - context pet state is left unchanged", async () => {
    (removeImagePetGallery as jest.Mock).mockResolvedValueOnce({ gallery: [] });

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: any;
    await act(async () => {
      returned = await result.current.handleDeleteImagePetGallery({ petId: "1", imageId: "g1" });
    });

    expect(returned).toEqual({ gallery: [] });
    expect(result.current.pet).toBeUndefined();
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("fail");
    (removeImagePetGallery as jest.Mock).mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleDeleteImagePetGallery({ petId: "1", imageId: "g1" });
      })
    ).rejects.toBe(error);
  });
});

describe("handleUpdateTutor", () => {
  it("does not call setPet - context pet state is left unchanged", async () => {
    (updateTutor as jest.Mock).mockResolvedValueOnce({ tutors: [] });

    const { result } = renderHook(() => usePet(), { wrapper });

    let returned: any;
    await act(async () => {
      returned = await result.current.handleUpdateTutor({ petId: "1", tutorId: "t1" });
    });

    expect(returned).toEqual({ tutors: [] });
    expect(result.current.pet).toBeUndefined();
  });

  it("rethrows the error on failure", async () => {
    const error = new Error("fail");
    (updateTutor as jest.Mock).mockRejectedValueOnce(error);
    const { result } = renderHook(() => usePet(), { wrapper });

    await expect(
      act(async () => {
        await result.current.handleUpdateTutor({ petId: "1", tutorId: "t1" });
      })
    ).rejects.toBe(error);
  });
});
