import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import {
  createBookingData,
  createUpdatedBookingData,
} from "@data/booking-data";
import { getAuthToken } from "@helpers/auth-helper";
import { Booking } from "models/booking";

test("Booking lifecycle", async ({ request }) => {
  const bookingRequestBody = createBookingData();

  const bookingId = await createBooking(request, bookingRequestBody);

  const getBookingResponse = await request.get(
    `${API_URLS.herokuappBooking}/booking/${bookingId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  expect(getBookingResponse.status()).toBe(200);

  const getBookingBody: Booking = await getBookingResponse.json();

  expect(getBookingBody).toEqual(bookingRequestBody);

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

  const updateBookingResponseBody: Booking = await updateBookingResponse.json();

  expect(updateBookingResponseBody).toEqual(updatedBookingBody);

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
