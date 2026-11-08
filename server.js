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

// Health check
app.get("/health", (req, res) => {
  res.json({
    message: "Islam A2Z is running",
    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected"
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/hadiths", hadithRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();