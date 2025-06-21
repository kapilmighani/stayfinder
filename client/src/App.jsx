import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";
import Dashboard from "./component/Dashboard.jsx";
import Createlisting from "./component/Createlisting.jsx";
import Editelisting from "./component/Editelisting.jsx";
import BookingPage from "./component/Booking.jsx";
import MyBookings from "./component/Mybookings.jsx";
import Cart from "./component/Cart.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import CreateListing from "./component/Createlisting.jsx";
import Unauth from "./component/Unauth.jsx";
import Listingdetail from "./component/Listingdetail.jsx";
import SearchResults from "./component/SearchResults.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Createlisting" element={<Createlisting />} />
        <Route path="/editlisting/:id" element={<Editelisting />} />
        <Route path="/booking/:listingId" element={<BookingPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/host/create" element={<CreateListing />} />
        <Route path="/unauthorized" element={<Unauth/>} />
        <Route path="/Listing/:id" element={<Listingdetail/>} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
