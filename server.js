// const { configDotenv } = require("dotenv");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Google and Cloudflare DNS
const bookRoutes = require("./routes/bookRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const hadithRoutes = require("./routes/hadithRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(" Mongodb Atlas Connected");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});
app.use("/api/books",bookRoutes);
app.use("/api/chapters",chapterRoutes);
app.use("/api/hadiths",hadithRoutes);
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
res.json({
    message:"Islam a2z is running "
    });
});
app.listen(5000,()=>{
    console.log("server is running on port 5000");
});