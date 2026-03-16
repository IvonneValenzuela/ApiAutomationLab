import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";

test("Restful Booker - health check", async ({ request }) => {
  const response = await request.get(`${API_URLS.herokuappBooking}/ping`);
  const statusCode = response.status();
  expect(statusCode).toBe(201);
});
