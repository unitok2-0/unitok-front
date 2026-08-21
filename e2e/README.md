# E2E suite (Playwright) — local docker-compose stack only

Regression suite for the Pets module, built against the local dev stack.
**Never** points at production — `baseURL` is `http://localhost:3000` and the
DB helper only ever execs into the `unitok-legacy-mongo-1` container by name.

## Prerequisites

1. Docker Desktop running.
2. The local stack up, from the workspace root (`unitok-legacy/`, one level
   above this repo):
   ```bash
   docker compose up -d
   ```
   This starts `unitok-legacy-mongo-1` (local, isolated Mongo — not Atlas),
   `unitok-legacy-backend-1` (`localhost:3333`) and `unitok-legacy-frontend-1`
   (`localhost:3000`). If you changed backend/frontend source since the images
   were last built, rebuild first: `docker compose up -d --build`.
3. Playwright's browser binary installed (one-time per machine):
   ```bash
   npx playwright install chromium
   ```

## Running

```bash
yarn test:e2e          # headless, list reporter
yarn test:e2e:ui       # Playwright's interactive UI mode — useful for debugging
npx playwright test e2e/tests/pet-lifecycle.spec.ts   # a single file
npx playwright show-trace test-results/<...>/trace.zip  # inspect a failure
```

Runs single-worker, sequentially (`playwright.config.ts`) — tests mutate
shared local Mongo state via real docker-exec calls, so parallelizing them
isn't safe.

## How it works

- `e2e/helpers/db.ts` — seeds/reads/cleans up test users, qrcodes and pets by
  shelling into the Mongo container (`docker exec ... mongosh`). Every record
  it creates is tagged (`e2e.<id>@unitok.local` emails, `E2E-QR-<id>` qrcode
  ids) so cleanup is scoped and a crashed run's leftovers are easy to spot
  and hand-delete if a `afterAll` didn't get to run.
- `e2e/helpers/api.ts` — logs in and activates a qrcode straight through the
  real backend HTTP API (same endpoints the UI calls), used to fast-forward
  setup instead of driving the (camera-based) QR-scan UI for every test.
- `e2e/helpers/ui.ts` — `selectReactSelect()`, a helper for the pet-edit
  form's react-select fields (species/race/sex/color). Clicking their visible
  placeholder text directly is flaky (the menu portal intercepts the click);
  focusing the field's real `<input>` and typing is reliable.
- Each spec file seeds its own fixtures in `test.beforeAll` and tears them
  down in `test.afterAll` — safe to run any single file in isolation.

## What's covered

- `auth.spec.ts` — real login/logout through the UI (not an API shortcut).
- `profile.spec.ts` — avatar placeholder (not the dead AWS URL), the
  "Enviar meus Contatos" button staying hidden, QR Code modal.
- `pet-lifecycle.spec.ts` — QR activation actually flips status to `ACTIVE`;
  tutor name isn't duplicated; saving with no breed picked actually succeeds
  (regression for a bug where this silently did nothing); handle-conflict
  shows a real error; deleting a pet actually removes it from Mongo, not
  just the UI list (regression for `DeletePetService`'s unawaited
  `deleteOne()`).
- `tutor-invite.spec.ts` — full invite → accept flow, checked against the DB,
  not just toasts (regression for the `UserModel.notifications` ref bug that
  made this 500 end-to-end); then owner removes the tutor, checked against
  the DB again.

## What's NOT covered (known gaps)

- **QR code camera scan** (`ReadQRCodeStep`) — no manual-entry fallback
  exists in the UI, so it can't be driven headlessly. Activation is tested
  via the same API endpoint the scan step calls (`PATCH /users/add-device`),
  which exercises the same backend code — just not the camera UI itself.
- **Real file upload success** — the local stack has no real Hetzner bucket
  credentials (`docker-compose.yml` ships empty `AWS_*` env vars on purpose),
  so any upload attempt fails with `InvalidAccessKeyId`. Not covered by an
  automated assertion; if you need to verify the upload UI itself, do it
  manually against a stack with real bucket credentials.
- **SOS / geocoding / SMS** — needs real Google Maps + Comtele credentials,
  not present locally. Only spot-checked manually that the modal opens
  without a regression; not scripted here.
- Card/Teams/Exhibitor/Checkout modules — out of scope; the module is being
  narrowed to Pets only (see the workspace root `CLAUDE.md`).
