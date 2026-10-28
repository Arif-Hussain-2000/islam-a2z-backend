const mongoose = require("mongoose");

const hadithSchema = new mongoose.Schema({

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true
    },

    hadithNumber: {
        type: Number,
        required: true
    },

    // Always visible
    arabic: {
        type: String,
        required: true
    },

    // User-selected language
    urdu: {
        type: String,
        required: true
    },

    english: {
        type: String,
        required: true
    },
    

    explanation: {

        urdu: {
            type: String
        },

        english: {
            type: String
        }

    },

    narrator: {

        name: {
            type: String
        },

        urdu: {
            type: String
        },

        english: {
            type: String
        }

    }

});

const Hadith = mongoose.model("Hadith", hadithSchema);

module.exports = Hadith;