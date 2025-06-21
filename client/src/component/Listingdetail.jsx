import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; ;

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8000/listing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.listing);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch listing:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (listing && listing.location) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          listing.location
        )}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;

            const map = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: [lng, lat],
              zoom: 11,
            });

            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

            return () => map.remove();
          }
        })
        .catch((err) => console.error("Geocoding failed:", err));
    }
  }, [listing]);

  if (loading) return <div>Loading...</div>;
  if (!listing) return <div>Listing not found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full rounded-xl mb-4 h-96 object-cover"
      />
      <p className="text-xl font-semibold text-green-600">₹{listing.price}/night</p>
      <p className="text-gray-700 mb-2">{listing.location}</p>
      <p className="mt-4 text-gray-800">{listing.description}</p>
      <p className="mt-2 text-sm text-gray-500">Category: {listing.category}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Location on Map</h2>
        <div ref={mapContainerRef} className="w-full h-96 rounded-xl border" />
      </div>
    </div>
  );
}

export default ListingDetail;
