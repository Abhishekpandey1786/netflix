import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------- CORS ----------
// Note: Removed the trailing slash from the Vercel URL
const allowedOrigins = [
  "http://localhost:5173",
  "https://moviepro.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight requests
app.options("*", cors());

// ---------- DATABASE ----------
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Don't exit in development, but helpful for Render logs
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
};

connectDB();

// ---------- ROUTES ----------
// Ensure no empty colons exist inside userRoute.js
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("🚀 Netflix backend is running");
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));