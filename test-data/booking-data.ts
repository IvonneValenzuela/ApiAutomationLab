import { Booking } from "models/booking";

export function createBookingData(): Booking {
  return {
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
}

export function createUpdatedBookingData(): Booking {
  return {
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
}
