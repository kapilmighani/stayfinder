import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editlisting() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://stayfinder-d8vb.onrender.com/listing/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data.listing))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://stayfinder-d8vb.onrender.com/updatelisting/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include"
    });

    if (res.ok) {
      alert("Listing updated!");
      navigate("/host/dashboard");
    } else {
      alert("Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow mt-6 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-2 border p-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 border p-2"
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full mb-2 border p-2"
      />
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full mb-2 border p-2"
      />
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-2 border p-2"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full mb-2 border p-2"
      >
        <option value="">Select Category</option>
        <option value="beach">Beach</option>
        <option value="mountain">Mountain</option>
        <option value="forest">Forest</option>
        <option value="city">City</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Update Listing
      </button>
    </form>
  );
}

export default Editlisting;
