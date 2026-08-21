import { test, expect } from "@playwright/test";
import {
  seedUser,
  seedQrCode,
  cleanupByEmails,
  cleanupByProfileCodes,
  cleanupNotificationsForEmails,
  findPetByProfileCode,
  E2E_PASSWORD,
} from "../helpers/db";
import { login, loginAsCookie, activateQrCode } from "../helpers/api";
import type { E2EUser } from "../helpers/db";

// Regression coverage for two bugs that made this entire flow 500 end-to-end:
// UserModel.notifications had ref: 'notifications' (should be 'notification'),
// and several notification.save()/user.save() calls were fire-and-forget.
test.describe("Tutor invite — invite, accept, remove", () => {
  let owner: E2EUser;
  let guest: E2EUser;
  let qrcode: string;

  test.beforeAll(async () => {
    owner = seedUser({ fullName: "Bruno Lima", surname: "Lima" });
    guest = seedUser({ fullName: "Carla Nunes", surname: "Nunes" });
    qrcode = seedQrCode("PETS");

    const auth = await login(owner.phone, E2E_PASSWORD);
    await activateQrCode(auth, qrcode);
  });

  test.afterAll(() => {
    cleanupNotificationsForEmails([owner.email, guest.email]);
    cleanupByProfileCodes([qrcode]);
    cleanupByEmails([owner.email, guest.email]);
  });

  test("owner invites a guest, guest accepts, guest becomes a real tutor in the DB", async ({ browser }) => {
    const ownerContext = await browser.newContext();
    await loginAsCookie(ownerContext, owner.phone, E2E_PASSWORD);
    const ownerPage = await ownerContext.newPage();

    await ownerPage.goto(`/profile/pet-edit/${qrcode}`);
    await ownerPage.getByRole("button", { name: "Adicionar tutor" }).click();
    // tel-type Input always renders the hardcoded mask placeholder
    // "+55 (99) 999999999", regardless of the placeholder prop passed to it.
    await ownerPage.getByPlaceholder("+55 (99) 999999999").fill(guest.phone);
    await ownerPage.getByRole("button", { name: "Pesquisar" }).click();
    await expect(ownerPage.getByText("Carla Nunes")).toBeVisible();
    await ownerPage.locator('input[type="checkbox"]').first().click();
    await ownerPage.getByRole("button", { name: "Adicionar", exact: true }).click();
    await expect(
      ownerPage.getByText("O convite para ser tutor foi enviado com sucesso para os usuários!")
    ).toBeVisible();
    await ownerContext.close();

    const guestContext = await browser.newContext();
    await loginAsCookie(guestContext, guest.phone, E2E_PASSWORD);
    const guestPage = await guestContext.newPage();

    await guestPage.goto("/profile/me");

    // DashboardHeader renders the bell (BsBell, an inline <svg>) as the
    // first icon in the header's icon row — nothing else on the page
    // renders an <svg> before it (the logo is a plain <img>).
    await guestPage.locator("svg").first().click();
    await expect(guestPage.getByRole("heading", { name: "Notificações" })).toBeVisible();
    await guestPage.getByText("Abrir", { exact: true }).click();

    await expect(guestPage.getByText(/foi convidado para ser tutor/)).toBeVisible();
    await guestPage.getByRole("button", { name: "Aceitar" }).click();

    await expect(guestPage.getByText(/agora é tutor de/)).toBeVisible();
    await guestContext.close();

    const pet = findPetByProfileCode(qrcode);
    expect(pet).toContain(guest.email);
  });

  test("owner removes the tutor, and it is actually gone from the pet's tutors array", async ({ context }) => {
    await loginAsCookie(context, owner.phone, E2E_PASSWORD);
    const page = await context.newPage();

    await page.goto(`/profile/pet-edit/${qrcode}`);
    await expect(page.getByText("Carla Nunes")).toBeVisible();

    const openMenuIcon = page
      .locator("strong", { hasText: "Carla Nunes" })
      .locator("xpath=ancestor::*[1]/following-sibling::*//img[@src='/assets/iconOpenStand.svg']");

    await openMenuIcon.click();
    await page.getByText("Remover", { exact: true }).click();
    await expect(page.getByText("Tutor removido com sucesso!")).toBeVisible();

    const pet = findPetByProfileCode(qrcode);
    expect(pet).not.toContain(guest.email);
  });
});
