import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setRole, loading, role } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  if (loading) return null;

  const handleLogout = async () => {
    await fetch("https://stayfinder-d8vb.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const query = new URLSearchParams();
    query.append("location", search);
    if (category) query.append("category", category);
    navigate(`/search?${query.toString()}`);
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    const query = new URLSearchParams();
    if (search) query.append("location", search);
    if (selected) query.append("category", selected);

    navigate(`/search?${query.toString()}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">StayFinder</Link>

        <div className="sm:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="forest">Forest</option>
              <option value="desert">Desert</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Search
            </button>
          </form>

          <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>

          {isLoggedIn && role === "host" && (
            <>
              <Link to="/host/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/host/create" className="text-gray-700 hover:text-green-600">
                Add Listing
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <>
              <Link to="/mybookings" className="text-gray-700 hover:text-blue-600">Bookings</Link>
              <button onClick={handleLogout} className="text-red-600 hover:underline text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-3 space-y-3 bg-white border-t border-gray-200">
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="forest">Forest</option>
              <option value="desert">Desert</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Search
            </button>
          </form>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 block">
            Cart
          </Link>

          {isLoggedIn && role === "host" && (
            <>
              <Link to="/host/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 block">
                Dashboard
              </Link>
              <Link to="/host/create" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-green-600 block">
                Add Listing
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <>
              <Link to="/mybookings" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 block">
                Bookings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 text-left block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 block">
                Register
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 block">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
