import type { Page } from "@playwright/test";

/**
 * Selects an option in one of the pet-edit page's react-select fields
 * (species/race/sex/color, each rendered with instanceId="pet-<field>").
 * Clicking the visible placeholder text directly is flaky (react-select's
 * menu portal can intercept the click) — focusing the field's real text
 * input and typing is the reliable way to drive it.
 */
export async function selectReactSelect(
  page: Page,
  instanceId: string,
  optionText: string
): Promise<void> {
  const input = page.locator(`#react-select-${instanceId}-input`);
  await input.click();
  await input.pressSequentially(optionText, { delay: 20 });
  await page.getByText(optionText, { exact: true }).first().click();
}
