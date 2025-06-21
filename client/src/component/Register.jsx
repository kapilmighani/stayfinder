import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn, setRole } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://stayfinder-d8vb.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setMessage("User registered successfully!");

        setIsLoggedIn(true);
        setRole(result.role || "");

        navigate("/");
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        >
          <option value="user">User</option>
          <option value="host">Host</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
