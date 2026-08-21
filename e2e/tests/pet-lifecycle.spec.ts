import { test, expect } from "@playwright/test";
import {
  seedUser,
  seedQrCode,
  cleanupByEmails,
  cleanupByProfileCodes,
  findPetByProfileCode,
  findQrCodeStatus,
  E2E_PASSWORD,
} from "../helpers/db";
import { login, loginAsCookie, activateQrCode } from "../helpers/api";
import { selectReactSelect } from "../helpers/ui";
import type { E2EUser } from "../helpers/db";

// Regression coverage for: QR code stuck in GENERATED after activation,
// UpdatePetService false-conflict/silent-fail on handle, the race.value crash
// that silently blocked saving whenever no breed was picked, duplicated
// tutor surname, and DeletePetService's unawaited pet.deleteOne().
test.describe("Pet lifecycle — activate, edit, handle conflict, delete", () => {
  let owner: E2EUser;
  let qrcodeA: string;
  let qrcodeB: string; // used only for the handle-conflict test

  test.beforeAll(async () => {
    owner = seedUser({ fullName: "Ana Souza", surname: "Souza" });
    qrcodeA = seedQrCode("PETS");
    qrcodeB = seedQrCode("PETS");

    const auth = await login(owner.phone, E2E_PASSWORD);
    await activateQrCode(auth, qrcodeA);
    await activateQrCode(auth, qrcodeB);
  });

  test.afterAll(() => {
    cleanupByProfileCodes([qrcodeA, qrcodeB]);
    cleanupByEmails([owner.email]);
  });

  test.beforeEach(async ({ context }) => {
    await loginAsCookie(context, owner.phone, E2E_PASSWORD);
  });

  test("activation actually flips the qrcode to ACTIVE and the pet shows up in Meus Pets", async ({ page }) => {
    expect(findQrCodeStatus(qrcodeA)).toBe("ACTIVE");

    await page.goto("/profile/mypets");
    await expect(page.getByText("Pet", { exact: true }).first()).toBeVisible();
  });

  test("tutor name (full_name already containing surname) is shown once, not duplicated", async ({ page }) => {
    await page.goto(`/profile/pet-edit/${qrcodeA}`);
    await expect(page.getByText("Ana Souza Souza")).toHaveCount(0);
    await expect(page.getByText("Ana Souza", { exact: true })).toBeVisible();
  });

  test("saving with no breed selected succeeds instead of silently doing nothing, and deleting actually removes it from the DB", async ({ page }) => {
    await page.goto(`/profile/pet-edit/${qrcodeA}`);

    await page.getByPlaceholder("Digite um nome de usuário").fill(`handle-${qrcodeA}`);
    await page.getByPlaceholder("Digite o nome do seu pet").fill("Rex E2E");

    await selectReactSelect(page, "pet-species", "Caninos");
    // deliberately skip "pet-race" — this used to crash the save silently
    await selectReactSelect(page, "pet-sex", "Macho");
    await selectReactSelect(page, "pet-color", "Amarelo");

    await page.getByRole("button", { name: "Salvar alterações" }).click();

    await expect(page.getByText("Informações atualizadas com sucesso!")).toBeVisible();
    await expect(page).toHaveURL(/\/profile\/mypets/);

    // the handle field auto-slugifies on blur (formatUniqueName: lowercase,
    // non-alphanumeric runs collapsed to "_") — match that transformation
    // rather than the raw typed value.
    const expectedSlug = `handle-${qrcodeA}`.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    const petAfterSave = findPetByProfileCode(qrcodeA);
    expect(petAfterSave).toContain(`profileName: '${expectedSlug}'`);

    // now delete it via the UI and confirm it's actually gone, not just
    // removed from local list state (DeletePetService used to no-op)
    const openMenuIcon = page
      .locator("strong", { hasText: "Rex E2E" })
      .locator("xpath=ancestor::*[2]/following-sibling::*[1]//img");

    await openMenuIcon.click();
    await page.getByText("Remover", { exact: true }).click();
    await expect(page.getByText("Pet deletado com sucesso!")).toBeVisible();

    expect(findPetByProfileCode(qrcodeA)).toBeNull();
  });

  test("saving with a handle already used by another pet shows a clear conflict error", async ({ page }) => {
    await page.goto(`/profile/pet-edit/${qrcodeB}`);

    await page.getByPlaceholder("Digite um nome de usuário").fill(`taken-${qrcodeB}`);
    await page.getByPlaceholder("Digite o nome do seu pet").fill("Fido");
    await selectReactSelect(page, "pet-species", "Caninos");
    await selectReactSelect(page, "pet-sex", "Macho");
    await selectReactSelect(page, "pet-color", "Amarelo");
    await page.getByRole("button", { name: "Salvar alterações" }).click();
    await expect(page.getByText("Informações atualizadas com sucesso!")).toBeVisible();

    // re-activate a fresh qrcode to steal the handle from (qrcodeA was
    // deleted by the previous test in this file)
    const qrcodeC = seedQrCode("PETS");
    const auth = await login(owner.phone, E2E_PASSWORD);
    await activateQrCode(auth, qrcodeC);

    await page.goto(`/profile/pet-edit/${qrcodeC}`);
    const handleInput = page.getByPlaceholder("Digite um nome de usuário");
    await handleInput.fill(`taken-${qrcodeB}`);
    await handleInput.blur();

    await expect(page.getByText("Nome já ocupado, favor escolher outro")).toBeVisible();

    cleanupByProfileCodes([qrcodeC]);
  });
});
