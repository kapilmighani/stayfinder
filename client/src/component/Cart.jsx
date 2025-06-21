import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  const handleBookNow = (id) => {
    if (!isLoggedIn) {
      alert("Please login first to book.");
      navigate("/login");
      return;
    }

    navigate(`/booking/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-700 mb-1">₹ {item.price}</p>
              <p className="text-sm text-gray-500">{item.location}</p>

              <button
                onClick={() => handleBookNow(item._id)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <button
          onClick={() => {
            localStorage.removeItem("cart");
            setCartItems([]);
          }}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default Cart;
