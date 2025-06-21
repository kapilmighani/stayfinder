import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/showlisting")
      .then((res) => res.json())
      .then((data) => setListings(data.listings))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleBookNow = (listingId) => {
    if (!isLoggedIn) {
      alert("Please login first to book.");
      navigate("/login");
      return;
    }

    navigate(`/booking/${listingId}`);
  };

  const handleAddToCart = (listing) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyAdded = cart.find((item) => item._id === listing._id);
    if (alreadyAdded) {
      alert("Already added to cart!");
      return;
    }

    cart.push(listing);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart! 🛒");
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border rounded-xl shadow p-4 bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded mb-3 cursor-pointer hover:opacity-90 transition"
                />
              </Link>
              <div className="flex justify-between text-gray-700 mb-4">
                <span>₹ {listing.price}</span>
                <span>{listing.location}</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-auto">
              <button
                onClick={() => handleAddToCart(listing)}
                className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBookNow(listing._id)}
                className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
