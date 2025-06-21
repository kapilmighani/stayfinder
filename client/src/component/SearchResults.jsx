import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
  const { search } = useLocation();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`https://stayfinder-d8vb.onrender.com/search${search}`)
      .then(res => res.json())
      .then(data => setListings(data.listings || []))
      .catch(err => console.error("Search error:", err));
  }, [search]);

  if (listings.length === 0) {
    return <div className="p-6 text-center text-gray-600">No listings found.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div key={listing._id} className="border p-4 rounded shadow">
          <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover rounded mb-2" />
          <h3 className="text-lg font-semibold">{listing.title}</h3>
          <p className="text-gray-600">₹{listing.price} — {listing.location}</p>
          <p className="text-sm text-gray-500">{listing.category}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
