import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import {
  createBookingData,
  createUpdatedBookingData,
} from "@data/booking-data";
import { getAuthToken } from "@helpers/auth-helper";

test("Booking lifecycle", async ({ request }) => {
  // 1. Create booking
  const bookingRequestBody = createBookingData();

  const { bookingId } = await createBooking(request, bookingRequestBody);

  // 2. Get booking by id and validate created data
  const getBookingResponse = await request.get(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  expect(getBookingResponse.status()).toBe(200);

  const getBookingBody = await getBookingResponse.json();

  expect(getBookingBody).toEqual(bookingRequestBody);

  // 3. Get auth token
  const authToken = await getAuthToken(request);

  // 4. Update booking
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

  // 5. Delete booking
  const deleteBookingResponse = await request.delete(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    },
  );

  expect(deleteBookingResponse.status()).toBe(201);

  // 6. Verify booking no longer exists
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
