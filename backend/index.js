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

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:5173",
  "https://netflix-oidqsnk8z-abhishekpandey1786s-projects.vercel.app"
];

// ✅ CORS CONFIG (FULL FIX)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 IMPORTANT: Preflight fix
app.options("*", cors());

// ---------- DATABASE ----------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------- ROUTES ----------
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("🚀 Netflix backend is running");
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
