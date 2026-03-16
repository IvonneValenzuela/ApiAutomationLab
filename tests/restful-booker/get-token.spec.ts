import { test, expect } from "@playwright/test";
import { getAuthToken } from "@helpers/auth-helper";

test("Get Auth token", async ({ request }) => {
  const token = await getAuthToken(request);

  expect(token).toBeTruthy();
  expect(typeof token).toBe("string");
});
