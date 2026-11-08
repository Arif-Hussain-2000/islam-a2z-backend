const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const hadithRoutes = require("./routes/hadithRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Health check (Isse UptimeRobot properly track kar payega)
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  // 1 = Connected, 2 = Connecting
  res.json({
    message: "Islam A2Z is running",
    database: dbStatus === 1 ? "Connected" : dbStatus === 2 ? "Connecting" : "Disconnected"
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/hadiths", hadithRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// 1. Server ko pehle start kar rahe hain taaki Render wake up ho sake aur crash na ho
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 2. Database connection background mein chalega aur auto-reconnect handle karega
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 45000, // Render ke slow wake up ke liye 45 seconds ka buffer
  socketTimeoutMS: 45000,
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch((error) => {
  console.error("Initial MongoDB connection error:", error);
  // process.exit(1) ko hata diya taaki server crash na ho aur dubara connect karne ki koshish kare
});

// Mongoose event listener jo reconnect status batayega
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected! Trying to reconnect...');
});
