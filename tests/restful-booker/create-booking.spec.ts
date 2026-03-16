import { test, expect } from "@playwright/test";
import { createBooking } from "@helpers/booking-helper";
import { createBookingData } from "@data/booking-data";
import { API_URLS } from "@config/api-config";
import { Booking } from "models/booking";

test("Create booking", async ({ request }) => {
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

  const createdBooking: Booking = await getBookingResponse.json();

  expect(createdBooking.firstname).toBe(bookingRequestBody.firstname);
  expect(createdBooking.lastname).toBe(bookingRequestBody.lastname);
  expect(createdBooking.totalprice).toBe(bookingRequestBody.totalprice);
});
