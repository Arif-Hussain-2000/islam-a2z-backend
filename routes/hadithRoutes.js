const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getHadith,
  createHadith,
  updateHadith,
} = require("../controllers/hadithController");
const router = express.Router();
router.get("/", getHadith);
router.post("/", protect, createHadith);
router.put("/:id", protect, updateHadith);
module.exports = router;
