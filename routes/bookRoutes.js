const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getBooks,
  createBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.post("/", protect, createBooks);

// Edit Book
router.put("/:id", protect, updateBook);

// Delete Book
router.delete("/:id", protect, deleteBook);

module.exports = router;
