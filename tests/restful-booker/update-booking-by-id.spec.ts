import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import {
  createBookingData,
  createUpdatedBookingData,
} from "@data/booking-data";
import { getAuthToken } from "@helpers/auth-helper";

test("Update booking by id", async ({ request }) => {
  const bookingRequestBody = createBookingData();

  const { bookingId } = await createBooking(request, bookingRequestBody);

  const authToken = await getAuthToken(request);

  const updatedBookingBody = createUpdatedBookingData();

  const updateBookingResponse = await request.put(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      data: updatedBookingBody,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${authToken}`,
      },
    },
  );

  expect(updateBookingResponse.status()).toBe(200);

  const updateBookingResponseBody = await updateBookingResponse.json();

  expect(updateBookingResponseBody).toEqual(updatedBookingBody);
});
