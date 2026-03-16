import { test, expect } from "@playwright/test";
import { createBooking } from "@helpers/booking-helper";
import { createBookingData } from "@data/booking-data";

test("Create booking", async ({ request }) => {
  const bookingRequestBody = createBookingData();

  const { bookingId, bookingResponseBody } = await createBooking(
    request,
    bookingRequestBody,
  );

  const createdBooking = bookingResponseBody.booking;
  expect(createdBooking.firstname).toBe(bookingRequestBody.firstname);
  expect(createdBooking.lastname).toBe(bookingRequestBody.lastname);
  expect(createdBooking.totalprice).toBe(bookingRequestBody.totalprice);
});
