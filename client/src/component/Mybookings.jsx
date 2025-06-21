import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/mybookings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched bookings:", data);
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-blue-600">
        Loading your bookings...
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
          alt="No bookings"
          className="w-32 h-32 mb-4 opacity-60"
        />
        <p className="text-lg font-medium">No bookings found yet</p>
        <p className="text-sm text-gray-500">Start exploring and book your next stay!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl shadow-lg bg-white overflow-hidden"
          >
            {booking.listing && (
              <>
                <img
                  src={booking.listing.image}
                  alt={booking.listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{booking.listing.title}</h3>
                  <p className="text-gray-700">
                    📍 {booking.listing.location}
                  </p>
                  <p>📅 Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p>📅 Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p>👥 Guests: {booking.guests}</p>
                  <p className="font-semibold text-blue-600">
                    ₹ {booking.totalPrice} total
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
