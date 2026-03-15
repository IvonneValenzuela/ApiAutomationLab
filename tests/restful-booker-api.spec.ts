import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { createBooking } from "@helpers/booking-helper";
import {
  createBookingData,
  createUpdatedBookingData,
} from "@data/booking-data";
import { getAuthToken } from "@helpers/auth-helper";

test("Restful Booker - health check", async ({ request }) => {
  const response = await request.get(`${API_URLS.herokuappBooking}/ping`);
  const statusCode = response.status();
  expect(statusCode).toBe(201);
});

test("Get Auth token", async ({ request }) => {
  const token = await getAuthToken(request);

  expect(token).toBeTruthy();
  expect(typeof token).toBe("string");
});

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

  console.log("Booking created:", bookingId);
});

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

test("Update booking", async ({ request }) => {
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
