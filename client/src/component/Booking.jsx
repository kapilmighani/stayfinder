import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Booking() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://stayfinder-d8vb.onrender.com/listing/${listingId}`)
      .then((res) => res.json())
      .then((data) => setListing(data.listing))
      .catch((err) => console.error("Failed to load listing:", err));
  }, [listingId]);

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !listing?.price || guests < 1) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * listing.price * guests : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const totalPrice = calculateTotal();

    const bookingData = {
      listing: listingId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    };

    try {
      const response = await fetch("https://stayfinder-d8vb.onrender.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful!");
        navigate("/mybookings");
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  };

  if (!listing) return <div className="p-4">Loading listing...</div>;

  const diffDays =
    checkIn && checkOut
      ? Math.floor(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book {listing.title}</h2>
      <form onSubmit={handleBooking}>
        <label className="block mb-2">
          Check-in Date:
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-2">
          Check-out Date:
          <input
            type="date"
            min={checkIn || new Date().toISOString().split("T")[0]}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-2">
          Guests:
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </label>

        <div className="mt-3 text-gray-600">
          Price per night: ₹{listing.price}
        </div>

        <div className="mt-1 text-gray-600 text-sm italic">
          ₹{listing.price} × {guests} guest(s) × {diffDays} night(s)
        </div>

        <div className="mt-1 text-gray-800 font-semibold">
          Total Price: ₹{calculateTotal()}
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default Booking;
