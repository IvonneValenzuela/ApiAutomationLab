import { APIRequestContext, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";

export async function getAuthToken(request: APIRequestContext) {
  const response = await request.post(`${API_URLS.herokuappBooking}/auth`, {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("token");
  expect(body.token).toBeTruthy();

  return body.token;
}
