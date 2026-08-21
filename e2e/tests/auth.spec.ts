import { test, expect } from "@playwright/test";
import { seedUser, cleanupByEmails, E2E_PASSWORD } from "../helpers/db";
import type { E2EUser } from "../helpers/db";

test.describe("Login (real UI, no API shortcuts)", () => {
  let user: E2EUser;

  test.beforeAll(() => {
    user = seedUser({ fullName: "Auth", surname: "Teste" });
  });

  test.afterAll(() => {
    cleanupByEmails([user.email]);
  });

  test("logs in with phone/password and lands on the profile page", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("+55 (99) 999999999").fill(user.phone);
    await page.locator("#password").fill(E2E_PASSWORD);
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/profile\/me/);
    await expect(page.getByText("Auth", { exact: true }).first()).toBeVisible();
  });

  test("rejects a wrong password with an error, without navigating away", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("+55 (99) 999999999").fill(user.phone);
    await page.locator("#password").fill("senha-errada-de-proposito");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/login/);
  });
});
