import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

// Load env vars (Render + local dono ke liye)
dotenv.config();

const app = express();

// =======================
// Middlewares
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =======================
// CORS (Local + Production)
// =======================
const corsOptions = {
  origin: [
    "http://localhost:5173",           // local frontend
    "https://netflix-oidqsnk8z-abhishekpandey1786s-projects.vercel.app/" // production frontend (replace later)
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// =======================
// MongoDB Connection
// =======================
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

// =======================
// Routes
// =======================
app.use("/api/v1/user", userRoute);

// =======================
// Health Check Route
// =======================
app.get("/", (req, res) => {
  res.send("🚀 Netflix backend is running");
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
