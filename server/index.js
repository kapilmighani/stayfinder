import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorHandler from "./middleware/errorhandler.js";

const app = express();
const mongourl = process.env.MONGODB_URI;

// ✅ Connect Mongo
mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ✅ Allow Frontends
const allowedOrigins = [
  "http://localhost:5173",
  "https://stayfinder-ivory.vercel.app/"
];

// ✅ Enable CORS with credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS Blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Allow preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Log origin (for debugging)
app.use((req, res, next) => {
  console.log("🔍 Request origin:", req.headers.origin);
  next();
});

// ✅ Parse JSON, cookies
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// ✅ Use Routes
app.use(authRoutes);
app.use(listingRoutes);
app.use(bookingRoutes);

// ✅ Error Handling
app.use(errorHandler);

// ✅ Server Start
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
