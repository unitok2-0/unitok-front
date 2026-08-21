import { test, expect } from "@playwright/test";
import { seedUser, cleanupByEmails, E2E_PASSWORD } from "../helpers/db";
import { loginAsCookie } from "../helpers/api";
import type { E2EUser } from "../helpers/db";

// Regression coverage for the session that fixed: dead-AWS-URL avatar
// placeholder, and hid the "Enviar meus Contatos" button.
test.describe("Profile — avatar placeholder & hidden contacts feature", () => {
  let user: E2EUser;

  test.beforeAll(() => {
    user = seedUser({ fullName: "Profile", surname: "Teste" });
  });

  test.afterAll(() => {
    cleanupByEmails([user.email]);
  });

  test.beforeEach(async ({ context }) => {
    await loginAsCookie(context, user.phone, E2E_PASSWORD);
  });

  test("/profile/edit shows the current placeholder, never the dead AWS URL, for a user with no avatar", async ({ page }) => {
    await page.goto("/profile/edit");

    const avatar = page.locator("#imageProfileEdit");
    await expect(avatar).toHaveCSS("background-image", /temporary_avatar_img\.svg/);

    const bgImage = await avatar.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bgImage).not.toContain("amazonaws.com");

    // "Excluir foto" must be disabled — there's no real photo to delete
    await expect(page.getByRole("button", { name: "Excluir foto" })).toBeDisabled();
  });

  test("/profile/me never shows 'Enviar meus Contatos', but keeps 'Salvar este contato na agenda'", async ({ page }) => {
    await page.goto("/profile/me");

    await expect(page.getByRole("button", { name: "Salvar este contato na agenda" })).toBeVisible();
    await expect(page.getByText("Enviar meus Contatos")).toHaveCount(0);
  });

  test("QR Code modal opens from /profile/me without error", async ({ page }) => {
    await page.goto("/profile/me");

    await page.getByText("QR Code", { exact: true }).click();
    await expect(page.getByText("Modo offline")).toBeVisible();
    await page.getByText("Fechar").click();
    await expect(page.getByText("Modo offline")).toHaveCount(0);
  });
});
