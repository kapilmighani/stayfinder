import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { role } = useAuth();

  if (role !== "host") {
    return <Navigate to="/unauthorized" />;
  }

  useEffect(() => {
    fetch("http://localhost:8000/mylisting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Unauthorized: No token") {
          navigate("/unauthorized");
        } else {
          setListings(data.listings);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/deletelisting/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setListings((prev) => prev.filter((listing) => listing._id !== id));
      } else {
        console.error("Failed to delete listing:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="border rounded-lg shadow p-4 bg-white"
        >
          <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
          <img
            src={listing.image}
            alt="Preview"
            className="w-full h-40 object-cover rounded mb-3"
          />
          <div className="flex justify-between text-gray-600 mb-3">
            <span>₹{listing.price}</span>
            <span>{listing.location}</span>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => navigate(`/editlisting/${listing._id}`)}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(listing._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
