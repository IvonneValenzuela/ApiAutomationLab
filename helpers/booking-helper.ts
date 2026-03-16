import { APIRequestContext, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { Booking } from "models/booking";

export async function createBooking(
  request: APIRequestContext,
  bookingRequestBody: Booking,
): Promise<number> {
  const bookingResponse = await request.post(
    `${API_URLS.herokuappBooking}/booking`,
    {
      data: bookingRequestBody,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  expect(bookingResponse.status()).toBe(200);

  const bookingResponseBody = await bookingResponse.json();

  expect(bookingResponseBody).toHaveProperty("booking");
  expect(bookingResponseBody).toHaveProperty("bookingid");

  const bookingId = bookingResponseBody.bookingid;

  expect(typeof bookingId).toBe("number");
  expect(bookingId).toBeTruthy();

  return bookingId;
}
