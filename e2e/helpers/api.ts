import type { BrowserContext } from "@playwright/test";

const BACKEND_URL = "http://localhost:3333";

export async function login(phone: string, password: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  if (!res.ok) {
    throw new Error(`login failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.authorization as string; // "Bearer <jwt>"
}

/** Sets the unitok.token cookie on a Playwright browser context, as if the user had logged in through the UI. */
export async function loginAsCookie(
  context: BrowserContext,
  phone: string,
  password: string
): Promise<void> {
  const authorization = await login(phone, password);
  await context.addCookies([
    {
      name: "unitok.token",
      value: authorization,
      domain: "localhost",
      path: "/",
    },
  ]);
}

export async function activateQrCode(
  authorization: string,
  qrcodeId: string
): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/users/add-device`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify({ qrcode_link: qrcodeId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`activateQrCode failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}
