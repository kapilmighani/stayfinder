import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold text-blue-600">StayFinder</h2>
          <p className="mt-2 text-sm">
            Book your perfect stay across cities, beaches, mountains and more.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/mybookings" className="hover:underline">My Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
