import { defineConfig, devices } from "@playwright/test";

/**
 * E2E suite for the local docker-compose stack (see docker-compose.yml at the
 * workspace root). Requires `docker compose up -d` to already be running —
 * this config does NOT start the stack for you, and never points at
 * production. See e2e/README.md for the full runbook.
 */
export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: false, // tests share/mutate local Mongo state via docker exec
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
