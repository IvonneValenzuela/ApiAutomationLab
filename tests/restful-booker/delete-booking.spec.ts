import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import { createBookingData } from "@data/booking-data";
import { getAuthToken } from "@helpers/auth-helper";

test("Delete booking", async ({ request }) => {
  const { bookingId } = await createBooking(request, createBookingData());

  const authToken = await getAuthToken(request);

  const deleteBookingResponse = await request.delete(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    },
  );

  expect(deleteBookingResponse.status()).toBe(201);

  const getDeletedBookingResponse = await request.get(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  expect(getDeletedBookingResponse.status()).toBe(404);
});
