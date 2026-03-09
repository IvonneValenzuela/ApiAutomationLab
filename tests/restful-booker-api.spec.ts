import { test, expect } from "@playwright/test";
import { API_URLS } from "@config/api-config";
import { bookingRequestBody } from "@data/booking-data";

test("Restful Booker - health check", async ({ request }) => {
  const healthResponse = await request.get(`${API_URLS.herokuappBooking}/ping`);
  const statusCode = healthResponse.status();
  expect(statusCode).toBe(201);
});

test("Auth create token", async ({ request }) => {
  const authRequestBody = {
    username: "admin",
    password: "password123",
  };

  const authResponse = await request.post(`${API_URLS.herokuappBooking}/auth`, {
    data: authRequestBody,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(authResponse.status()).toBe(200);

  const authResponseBody = await authResponse.json();

  expect(authResponseBody).toHaveProperty("token");

  const authToken = authResponseBody.token;

  expect(authToken).toBeTruthy();
  expect(typeof authToken).toBe("string");
});

test("Create booking", async ({ request }) => {
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

  const bookingResponseBody = await bookingResponse.json();
  const bookingId = bookingResponseBody.bookingid;

  expect(bookingResponse.status()).toBe(200);
  expect(bookingResponseBody).toHaveProperty("booking");
  expect(bookingResponseBody).toHaveProperty("bookingid");
  expect(typeof bookingId).toBe("number");
  expect(bookingId).toBeTruthy();

  const createdBooking = bookingResponseBody.booking;

  expect(createdBooking.firstname).toBe(bookingRequestBody.firstname);
  expect(createdBooking.lastname).toBe(bookingRequestBody.lastname);
  expect(createdBooking.totalprice).toBe(bookingRequestBody.totalprice);
  expect(createdBooking.depositpaid).toBe(bookingRequestBody.depositpaid);

  expect(createdBooking.bookingdates).toBeTruthy();
  expect(createdBooking.bookingdates.checkin).toBe(
    bookingRequestBody.bookingdates.checkin,
  );
  expect(createdBooking.bookingdates.checkout).toBe(
    bookingRequestBody.bookingdates.checkout,
  );

  expect(createdBooking.additionalneeds).toBe(
    bookingRequestBody.additionalneeds,
  );

  console.log("Booking created:", bookingId);
});

test("Get booking by id", async ({ request }) => {
  const bookingRequestBody = {
    firstname: "Ivonne",
    lastname: "Valenzuela",
    totalprice: 121,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-03-01",
      checkout: "2026-03-05",
    },
    additionalneeds: "breakfast",
  };

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
  const bookingId = bookingResponseBody.bookingid;

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

  console.log("Booking created:", bookingId);
});

test("Update booking", async ({ request }) => {
  const bookingRequestBody = {
    firstname: "Ivonne",
    lastname: "Valenzuela",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-03-01",
      checkout: "2026-03-05",
    },
    additionalneeds: "lunch",
  };

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
  const bookingId = bookingResponseBody.bookingid;

  const authRequestBody = {
    username: "admin",
    password: "password123",
  };

  const authResponse = await request.post(`${API_URLS.herokuappBooking}/auth`, {
    data: authRequestBody,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(authResponse.status()).toBe(200);

  const authResponseBody = await authResponse.json();
  const authToken = authResponseBody.token;

  expect(authResponseBody).toHaveProperty("token");
  expect(authToken).toBeTruthy();
  expect(typeof authToken).toBe("string");

  const updatedBookingBody = {
    firstname: "Ivonne",
    lastname: "Updated",
    totalprice: 333,
    depositpaid: false,
    bookingdates: {
      checkin: "2026-04-01",
      checkout: "2026-04-05",
    },
    additionalneeds: "Dinner",
  };

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

  expect(updateBookingResponseBody.firstname).toBe(
    updatedBookingBody.firstname,
  );
  expect(updateBookingResponseBody.lastname).toBe(updatedBookingBody.lastname);
  expect(updateBookingResponseBody.totalprice).toBe(
    updatedBookingBody.totalprice,
  );
  expect(updateBookingResponseBody.depositpaid).toBe(
    updatedBookingBody.depositpaid,
  );
  expect(updateBookingResponseBody.bookingdates.checkin).toBe(
    updatedBookingBody.bookingdates.checkin,
  );
  expect(updateBookingResponseBody.bookingdates.checkout).toBe(
    updatedBookingBody.bookingdates.checkout,
  );
  expect(updateBookingResponseBody.additionalneeds).toBe(
    updatedBookingBody.additionalneeds,
  );
});

test("Delete booking", async ({ request }) => {
  const bookingRequestBody = {
    firstname: "Ivonne",
    lastname: "Valenzuela",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-03-01",
      checkout: "2026-03-05",
    },
    additionalneeds: "lunch",
  };

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
  const bookingId = bookingResponseBody.bookingid;

  const authRequestBody = {
    username: "admin",
    password: "password123",
  };

  const authResponse = await request.post(`${API_URLS.herokuappBooking}/auth`, {
    data: authRequestBody,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(authResponse.status()).toBe(200);

  const authResponseBody = await authResponse.json();
  const authToken = authResponseBody.token;

  expect(authResponseBody).toHaveProperty("token");
  expect(authToken).toBeTruthy();
  expect(typeof authToken).toBe("string");

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
