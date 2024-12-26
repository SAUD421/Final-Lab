const express = require('express');
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorControllers');
const router = express.Router();

router.get('/', getAllAuthors); // Fetch all authors
router.post('/add', addAuthor); // Add a new author
router.put('/update/:id', updateAuthor); // Update author by ID
router.delete('/delete/:id', deleteAuthor); // Delete author by ID

module.exports = router;
