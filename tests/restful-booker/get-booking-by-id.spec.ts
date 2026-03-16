import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import { createBookingData } from "@data/booking-data";

test("Get booking by id", async ({ request }) => {
  const bookingRequestBody = createBookingData();

  const { bookingId } = await createBooking(request, bookingRequestBody);

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

  expect(getBookingBody.firstname).toBe(bookingRequestBody.firstname);
  expect(getBookingBody.lastname).toBe(bookingRequestBody.lastname);
  expect(getBookingBody.totalprice).toBe(bookingRequestBody.totalprice);
  expect(getBookingBody.depositpaid).toBe(bookingRequestBody.depositpaid);
  expect(getBookingBody.bookingdates.checkin).toBe(
    bookingRequestBody.bookingdates.checkin,
  );
  expect(getBookingBody.bookingdates.checkout).toBe(
    bookingRequestBody.bookingdates.checkout,
  );
  expect(getBookingBody.additionalneeds).toBe(
    bookingRequestBody.additionalneeds,
  );
});
