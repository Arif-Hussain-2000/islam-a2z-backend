const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  chapterNumber: {
    type: Number,
    required: true
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;