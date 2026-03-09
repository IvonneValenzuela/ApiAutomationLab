import { APIRequestContext } from "@playwright/test";
import { API_URLS } from "@config/api-config";

export async function getAuthToken(request: APIRequestContext) {
  const response = await request.post(`${API_URLS.herokuappBooking}/auth`, {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  const body = await response.json();
  return body.token;
}
