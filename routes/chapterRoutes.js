const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getChapters,
  getChapterById,
  createChapters,
  updateChapters,
} = require("../controllers/chapterController");

const router = express.Router();

router.get("/", getChapters);

router.get("/:id", getChapterById);

router.post("/", protect, createChapters);
router.put("/:id", protect, updateChapters);

module.exports = router;
