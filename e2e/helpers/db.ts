import { execFileSync } from "child_process";

const MONGO_CONTAINER = "unitok-legacy-mongo-1";
const DB_NAME = "unitok";

/**
 * Runs a mongosh script against the LOCAL docker-compose Mongo container only.
 * Never point this at a real MONGO_URI — it always targets the container name
 * above, which only exists in the local dev stack (docker-compose.yml at the
 * workspace root).
 */
export function mongoEval(script: string): string {
  return execFileSync(
    "docker",
    ["exec", MONGO_CONTAINER, "mongosh", DB_NAME, "--quiet", "--eval", script],
    { encoding: "utf-8" }
  );
}

// bcrypt hash for the fixed plaintext password "SenhaTeste123!" — reused across
// all E2E fixtures so login is trivial and consistent between runs.
export const E2E_PASSWORD = "SenhaTeste123!";
const E2E_PASSWORD_HASH =
  "$2b$10$anPr1xbHRkvbaMWG7vnZAOuRqcOE6hlSWWKosx.J0pETQnQERUMjK";

export type E2EUser = {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  surname: string;
};

let counter = 0;
function uniqueSuffix(): string {
  counter += 1;
  return `${Date.now().toString(36)}${counter}`;
}

// Numeric-only counter for phone numbers — the login/search inputs are
// digit-only phone fields, so a base36 suffix (which can contain letters)
// would break them.
let phoneCounter = 0;
function uniquePhoneDigits(): string {
  phoneCounter += 1;
  return String(phoneCounter).padStart(4, "0");
}

export function seedQrCode(deviceType: "PETS" | "CARD" = "PETS"): string {
  const id = `E2E-QR-${uniqueSuffix()}`;
  mongoEval(
    `db.qrcodes.insertOne({ _id: "${id}", url: "https://unitok.com/${id}", status: "GENERATED", blocked: false, device_type: "${deviceType}", isExhibitor: false, createdAt: new Date(), updatedAt: new Date() });`
  );
  return id;
}

export function seedUser(opts: {
  fullName: string;
  surname: string;
}): E2EUser {
  const suffix = uniqueSuffix();
  const email = `e2e.${suffix}@unitok.local`;
  const phone = `1199999${uniquePhoneDigits()}`;

  mongoEval(
    `const r = db.users.insertOne({ email: "${email}", password: "${E2E_PASSWORD_HASH}", phone: "${phone}", name: "e2e_${suffix}", full_name: "${opts.fullName}", surname: "${opts.surname}", roles: ["USER"], buttons: [], status: "ACTIVE", isAuthorized: true, profileColor: "#FF4C1C", createdAt: new Date(), updatedAt: new Date() }); print(r.insertedId.toString());`
  );

  return {
    id: "", // filled by caller if needed via mongo query; not required for UI-driven tests
    email,
    phone,
    fullName: opts.fullName,
    surname: opts.surname,
  };
}

export function findPetByProfileCode(profileCode: string): any {
  const out = mongoEval(
    `printjson(db.pets.findOne({ profileCode: "${profileCode}" }))`
  );
  if (out.trim() === "null") return null;
  return out;
}

export function findQrCodeStatus(qrcodeId: string): string | null {
  const out = mongoEval(
    `const q = db.qrcodes.findOne({ _id: "${qrcodeId}" }); print(q ? q.status : "NULL");`
  );
  return out.trim() === "NULL" ? null : out.trim();
}

export function cleanupByProfileCodes(profileCodes: string[]): void {
  if (profileCodes.length === 0) return;
  const list = profileCodes.map((c) => `"${c}"`).join(",");
  mongoEval(`db.pets.deleteMany({ profileCode: { $in: [${list}] } });`);
  mongoEval(`db.qrcodes.deleteMany({ _id: { $in: [${list}] } });`);
}

export function cleanupByEmails(emails: string[]): void {
  if (emails.length === 0) return;
  const list = emails.map((e) => `"${e}"`).join(",");
  mongoEval(`db.users.deleteMany({ email: { $in: [${list}] } });`);
}

export function cleanupNotificationsForEmails(emails: string[]): void {
  if (emails.length === 0) return;
  const list = emails.map((e) => `"${e}"`).join(",");
  mongoEval(
    `const ids = db.users.find({ email: { $in: [${list}] } }, { _id: 1 }).toArray().map(u => u._id); db.notification.deleteMany({ receiver: { $in: ids } });`
  );
}
