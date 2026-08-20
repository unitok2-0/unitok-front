import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { ModalButtonsPet } from "..";
import { toast } from "react-toastify";
import light from "styles/themes/light";

const mockHandleUpdateTutor = jest.fn();

jest.mock("contexts/PetContext", () => ({
  usePet: () => ({
    handleUpdateTutor: mockHandleUpdateTutor,
    pet: { _id: "pet-1" },
  }),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), warning: jest.fn(), error: jest.fn() },
}));

jest.mock("../../ModalButtonsPetInputs", () => ({
  ModalButtonsPetInputs: () => <div data-testid="mock-inputs-modal" />,
}));

const baseTutor = {
  tutorId: { _id: "tutor-1" },
  phone: { enable: true, value: "11999990000" },
  email: { enable: false, value: "tutor@example.com" },
  whatsapp: { enable: true, value: "11999990000" },
};

function renderModal(tutor = baseTutor) {
  // Wrapped in a real ThemeProvider: nested Typography/styled components read
  // theme.fonts/theme.colors and crash without one.
  return render(
    <ThemeProvider theme={light()}>
      <ModalButtonsPet
        modalIsOpen={true}
        closeModal={jest.fn()}
        setTutors={jest.fn()}
        tutor={tutor}
      />
    </ThemeProvider>
  );
}

function getRow(name: string) {
  // getByText(name) returns the <div className="name"> itself (already a
  // div), so .closest("div") would match itself, not the row — go up to the
  // parent (the S.ContainerButton row) instead.
  return screen.getByText(name).parentElement;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockHandleUpdateTutor.mockResolvedValue({});
});

describe("ModalButtonsPet", () => {
  it("renders exactly the 3 active channels (Ligação/E-mail/WhatsApp) and no SMS row", () => {
    renderModal();

    expect(screen.getByText("Ligação")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();

    // SMS is intentionally commented out of buttonsData in the source (product
    // decision: SMS notifications disabled, code preserved for later
    // reactivation) — lock in that it renders nothing for SMS.
    expect(screen.queryByText("SMS")).not.toBeInTheDocument();
    expect(screen.queryByText(/sms/i)).not.toBeInTheDocument();
  });

  it("shows Desativar/Ativar text matching each channel's enable flag", () => {
    renderModal();

    const rows = screen.getAllByText(/^(Ativar|Desativar)$/);
    expect(rows).toHaveLength(3);

    // phone.enable = true -> "Desativar"; email.enable = false -> "Ativar";
    // whatsapp.enable = true -> "Desativar"
    expect(within(getRow("Ligação")!).getByText("Desativar")).toBeInTheDocument();
    expect(within(getRow("E-mail")!).getByText("Ativar")).toBeInTheDocument();
    expect(within(getRow("WhatsApp")!).getByText("Desativar")).toBeInTheDocument();
  });

  it("calls handleUpdateTutor with only the toggled channel's key, built from petId/tutorId/buttonType", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(within(getRow("E-mail")!).getByText("Ativar"));

    await waitFor(() => {
      expect(mockHandleUpdateTutor).toHaveBeenCalledTimes(1);
    });

    // toggleActiveButton builds the payload via a template-literal JSON string
    // then JSON.parse()s it — only the toggled channel's key should be present
    // (not phone/whatsapp too).
    expect(mockHandleUpdateTutor).toHaveBeenCalledWith({
      petId: "pet-1",
      tutorId: "tutor-1",
      email: { enable: true, value: "tutor@example.com" },
    });
  });

  it("on success: toast.success is called and the row's text flips to reflect the new state", async () => {
    const user = userEvent.setup();
    renderModal();

    expect(within(getRow("Ligação")!).getByText("Desativar")).toBeInTheDocument();

    await user.click(within(getRow("Ligação")!).getByText("Desativar"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Para salvar, clique no botão "Salvar alterações"'
      );
    });

    expect(within(getRow("Ligação")!).getByText("Ativar")).toBeInTheDocument();
  });

  it("on rejection: toast.warning is called and the row's text does NOT flip (state only updates after a successful await)", async () => {
    const user = userEvent.setup();
    mockHandleUpdateTutor.mockRejectedValueOnce(new Error("failed"));
    renderModal();

    expect(within(getRow("Ligação")!).getByText("Desativar")).toBeInTheDocument();

    await user.click(within(getRow("Ligação")!).getByText("Desativar"));

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        "Erro ao ativar ou desativar o botão"
      );
    });

    // newListButtons[index].active is only flipped AFTER the awaited call
    // resolves; on rejection the catch block skips that line entirely, so the
    // row must remain in its original state.
    expect(within(getRow("Ligação")!).getByText("Desativar")).toBeInTheDocument();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("disables the edit icon button when the channel is inactive, enables it when active", () => {
    renderModal();

    const phoneRow = getRow("Ligação")!; // active: true
    const emailRow = getRow("E-mail")!; // active: false

    expect(within(phoneRow).getByRole("button", { name: /editar/i })).toBeEnabled();
    expect(within(emailRow).getByRole("button", { name: /editar/i })).toBeDisabled();
  });
});
