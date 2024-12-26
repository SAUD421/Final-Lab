const Book = require('../models/book');

// Add a new book
const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(400).json({ message: 'Error adding book', error });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting book', error });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author', 'name'); // Optionally, populate author name
        res.json({ message: 'Books retrieved successfully', books });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching books', error });
    }
};

module.exports = { addBook, updateBook, deleteBook, getAllBooks };
