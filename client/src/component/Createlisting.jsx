import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createlisting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "beach",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("category", formData.category);
    form.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:8000/createlisting", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Listing created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          category: "beach",
        });
        setImageFile(null);
        setTimeout(() => {
          navigate("/host/dashboard");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to create listing.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create New Listing
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        >
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="forest">Forest</option>
          <option value="city">City</option>
          <option value="desert">Desert</option>
          <option value="countryside">Countryside</option>
          <option value="lake">Lake</option>
          <option value="village">Village</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default Createlisting;
