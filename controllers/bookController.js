const Book = require("../models/book");

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: "Books not fetched",
            error: error.message
        });
    }
};

const createBooks = async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({
            message: "Book not created",
            error: error.message
        });
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Book title is required"
            });
        }

        const book = await Book.findByIdAndUpdate(
            id,
            { title: title.trim() },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: "Book not updated",
            error: error.message
        });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Book not deleted",
            error: error.message
        });
    }
};

module.exports = {
    getBooks,
    createBooks,
    updateBook,
    deleteBook
};