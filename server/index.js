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

mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const allowedOrigins = [
  "http://localhost:5173",
  "https://stayfinder-3n7ullccm-kapils-projects-ca7fa6bc.vercel.app",
  "https://stayfinder-git-main-kapils-projects-ca7fa6bc.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

app.use(authRoutes);
app.use(listingRoutes);
app.use(bookingRoutes);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
