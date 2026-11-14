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
    hadithTitle:{
        type:String,
    },

    // Always visible
    arabic: {
        type: String,
    },

    // User-selected language
    urdu: {
        type: String,
    },

    english: {
        type: String,
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