const express = require('express');
const { addBook, updateBook, deleteBook, getAllBooks } = require('../controllers/bookControllers');
const router = express.Router();

// Route to add a new book
router.post('/add', addBook);

// Route to update an existing book
router.put('/update/:id', updateBook);

// Route to delete a book
router.delete('/delete/:id', deleteBook);

// New route to fetch all books
router.get('/all', getAllBooks);

module.exports = router;
