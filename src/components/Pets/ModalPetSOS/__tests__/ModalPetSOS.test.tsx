import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { ModalPetSOS } from "..";
import { sendLocationPet } from "services/pet";
import light from "styles/themes/light";

// Typography/other styled-components in the tree read from a styled-components
// theme context; without a ThemeProvider, styled-components crashes reading
// theme.fonts[...]. Wrap every render with the app's real light theme.
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={light()}>{ui}</ThemeProvider>);
}

function rerenderWithTheme(rerender: any, ui: React.ReactElement) {
  return rerender(<ThemeProvider theme={light()}>{ui}</ThemeProvider>);
}

jest.mock("contexts/AuthContext", () => ({
  useAuth: () => ({ user: { _id: "finder-user-id" } }),
}));

jest.mock("services/pet", () => ({
  sendLocationPet: jest.fn(),
}));

jest.mock("components/Map", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-map" />,
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), success: jest.fn(), warning: jest.fn() },
}));

// TutorPetContainer pulls in next/router's singleton Router and useAuth; it is
// a separate concern (see its own component), so it is mocked out here to keep
// this test focused on ModalPetSOS's own step/state logic.
jest.mock("../../TutorPetContainer", () => ({
  TutorPetContainer: ({ tutor }: any) => (
    <div data-testid="mock-tutor-container">{tutor?.tutorId?._id}</div>
  ),
}));

// The real Input wraps react-phone-input-2 for type="tel", which is heavy to
// drive reliably under jsdom. Replaced with a thin controlled input that still
// exercises react-hook-form's register()/onChange wiring and the component's
// own onPhoneChange callback, since the goal here is testing ModalPetSOS's
// logic, not the Input component's internals.
jest.mock("components/Inputs/Input", () => {
  const ReactActual = require("react");
  return {
    __esModule: true,
    default: ReactActual.forwardRef((props: any, ref: any) => {
      const { id, errorMessage, onPhoneChange, onChange, onClick, ...rest } = props;
      return (
        <div>
          <input
            data-testid={`input-${id}`}
            ref={ref}
            id={id}
            onClick={onClick}
            onChange={(e: any) => {
              onPhoneChange?.(e.target.value);
              onChange?.(e);
            }}
            {...rest}
          />
          {errorMessage && <span>{errorMessage}</span>}
        </div>
      );
    }),
  };
});

const sendLocationPetMock = sendLocationPet as jest.Mock;

const petWithOwnerTutor = {
  _id: "pet-1",
  tutors: [
    {
      isOwner: true,
      tutorId: { _id: "tutor-owner-id", full_name: "Dono Teste" },
    },
  ],
};

const petWithoutOwnerTutor = {
  _id: "pet-2",
  tutors: [
    {
      isOwner: false,
      tutorId: { _id: "tutor-other-id", full_name: "Outro Tutor" },
    },
  ],
};

function setScreenWidth(width: number) {
  Object.defineProperty(window.screen, "width", {
    value: width,
    configurable: true,
  });
}

function mockGeolocation() {
  Object.defineProperty(global.navigator, "geolocation", {
    value: {
      getCurrentPosition: jest.fn((cb: any) =>
        cb({ coords: { latitude: -20, longitude: -40 } })
      ),
    },
    configurable: true,
  });
}

function mockPermissions(state: "granted" | "denied") {
  Object.defineProperty(global.navigator, "permissions", {
    value: {
      query: jest.fn().mockResolvedValue({ state }),
    },
    configurable: true,
  });
}

// Renders the modal already "open at step 1": the component's own useEffect
// resets step to 1 only when modalIsOpen transitions to/starts as false, so we
// mount closed then flip it open, mirroring how a real parent toggles it.
async function renderOpenAtStep1(pet = petWithOwnerTutor) {
  const closeModal = jest.fn();
  const { rerender } = renderWithTheme(
    <ModalPetSOS modalIsOpen={false} closeModal={closeModal} pet={pet as any} />
  );
  rerenderWithTheme(
    rerender,
    <ModalPetSOS modalIsOpen={true} closeModal={closeModal} pet={pet as any} />
  );
  await screen.findByText("Contatos");
  return { closeModal, rerender };
}

beforeEach(() => {
  jest.clearAllMocks();
  sendLocationPetMock.mockResolvedValue({});
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      results: [{}, { formatted_address: "Rua Teste, 123" }],
    }),
  }) as any;
  setScreenWidth(1024); // desktop by default
  mockGeolocation();
  mockPermissions("denied");
});

describe("ModalPetSOS", () => {
  it("renders on step 4 (Tutor) by default when opened, due to the hardcoded useState(4) initial value", async () => {
    // NOTE: the component initializes `step` via useState(4), not 1. This looks
    // like leftover debug state (the visual flow implies step 1 first), but it
    // is the real, current behavior: mounting with modalIsOpen=true straight
    // away (no prior "closed" render to trigger the reset effect) lands on the
    // "Tutor" screen instead of the contact form.
    renderWithTheme(
      <ModalPetSOS
        modalIsOpen={true}
        closeModal={jest.fn()}
        pet={petWithOwnerTutor as any}
      />
    );

    expect(await screen.findByText("Tutor")).toBeInTheDocument();
    expect(
      screen.getByText(/O tutor foi avisado com sucesso! Entre em contato/)
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-tutor-container")).toHaveTextContent(
      "tutor-owner-id"
    );
  });

  it("shows validation errors when submitting the step 1 form empty", async () => {
    const user = userEvent.setup();
    await renderOpenAtStep1();

    await user.click(screen.getByText("Enviar"));

    expect(await screen.findAllByText("Campo obrigatório")).toHaveLength(2);
  });

  it("submits valid step 1 data via saveInformationsInState and triggers geolocation", async () => {
    const user = userEvent.setup();
    await renderOpenAtStep1();

    await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
    await user.type(screen.getByTestId("input-phone"), "11999999999");
    await user.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });

  it("goes to step 2 (permission error) on desktop when geolocation permission isn't granted", async () => {
    const user = userEvent.setup();
    // default beforeEach state: desktop width + permissions 'denied'
    await renderOpenAtStep1();

    await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
    await user.type(screen.getByTestId("input-phone"), "11999999999");
    await user.click(screen.getByText("Enviar"));

    expect(
      await screen.findByText("Erro ao permitir acesso a localização")
    ).toBeInTheDocument();
  });

  it("'Tentar Novamente' on step 2 re-queries navigator.permissions and advances to step 3 when granted", async () => {
    const user = userEvent.setup();
    await renderOpenAtStep1();

    await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
    await user.type(screen.getByTestId("input-phone"), "11999999999");
    await user.click(screen.getByText("Enviar"));
    await screen.findByText("Erro ao permitir acesso a localização");

    const queryMock = global.navigator.permissions.query as jest.Mock;
    const queryCallsBefore = queryMock.mock.calls.length;

    // Change the SAME mock's resolved value for the retry (rather than
    // reassigning navigator.permissions to a brand-new jest.fn(), which would
    // reset the call count and make the "was it called again" assertion
    // below meaningless).
    queryMock.mockResolvedValueOnce({ state: "granted" });

    await user.click(screen.getByText("Tentar Novamente"));

    await waitFor(() => {
      expect(queryMock.mock.calls.length).toBeGreaterThan(queryCallsBefore);
    });

    expect(await screen.findByTestId("mock-map")).toBeInTheDocument();
  });

  it.each([
    ["with an owner tutor", petWithOwnerTutor, "Tutor"],
    [
      "without an owner tutor",
      petWithoutOwnerTutor,
      "O tutor foi avisado com sucesso!",
    ],
  ])(
    "full happy path %s: step1 -> step3 -> Compartilhar calls sendLocationPet and lands on the right final step",
    async (_desc, pet, expectedHeading) => {
      const user = userEvent.setup();
      setScreenWidth(500); // mobile: forces the step1->step3 branch deterministically
      await renderOpenAtStep1(pet);

      await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
      await user.type(screen.getByTestId("input-phone"), "11999999999");
      await user.click(screen.getByText("Enviar"));

      expect(await screen.findByTestId("mock-map")).toBeInTheDocument();

      await user.click(screen.getByText("Compartilhar"));

      await waitFor(() => {
        expect(sendLocationPetMock).toHaveBeenCalledWith(
          expect.objectContaining({
            petId: pet._id,
            name: "Fulano da Silva",
            phone: "11999999999",
            // Real source reads addressData?.results[1]?.formatted_address —
            // index 1, not 0 — matching the mocked fetch response shape.
            address: "Rua Teste, 123",
            userId: "finder-user-id",
          })
        );
      });

      expect(await screen.findByText(expectedHeading)).toBeInTheDocument();
    }
  );

  it("still advances to the next step even when sendLocationPet rejects (error is swallowed, not surfaced)", async () => {
    const user = userEvent.setup();
    sendLocationPetMock.mockRejectedValueOnce(new Error("network down"));
    setScreenWidth(500); // mobile: forces the step1->step3 branch deterministically
    await renderOpenAtStep1(petWithOwnerTutor);

    await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
    await user.type(screen.getByTestId("input-phone"), "11999999999");
    await user.click(screen.getByText("Enviar"));

    await screen.findByTestId("mock-map");
    await user.click(screen.getByText("Compartilhar"));

    await waitFor(() => {
      expect(sendLocationPetMock).toHaveBeenCalled();
    });

    // handleSendLocationPet catches its own error (only console.error's it), so
    // saveAddress's step transition always runs regardless of the outcome.
    expect(await screen.findByText("Tutor")).toBeInTheDocument();
  });

  it("calls closeModal when clicking 'Fechar' on step 1", async () => {
    const user = userEvent.setup();
    const { closeModal } = await renderOpenAtStep1();

    await user.click(screen.getByText("Fechar"));

    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal when clicking 'Finalizar' on step 4", async () => {
    const user = userEvent.setup();
    const closeModal = jest.fn();
    renderWithTheme(
      <ModalPetSOS
        modalIsOpen={true}
        closeModal={closeModal}
        pet={petWithOwnerTutor as any}
      />
    );
    await screen.findByText("Tutor");

    await user.click(screen.getByText("Finalizar"));

    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal when clicking 'Ok' on step 5", async () => {
    const user = userEvent.setup();
    setScreenWidth(500);
    const { closeModal } = await renderOpenAtStep1(petWithoutOwnerTutor);

    await user.type(screen.getByTestId("input-name"), "Fulano da Silva");
    await user.type(screen.getByTestId("input-phone"), "11999999999");
    await user.click(screen.getByText("Enviar"));
    await screen.findByTestId("mock-map");
    await user.click(screen.getByText("Compartilhar"));

    await screen.findByText("O tutor foi avisado com sucesso!");
    await user.click(screen.getByText("Ok"));

    expect(closeModal).toHaveBeenCalled();
  });
});
