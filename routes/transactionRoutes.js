const express = require('express');
const { borrowBook, returnBook, authorsWithManyBooks } = require('../controllers/transactionController');
const router = express.Router();

router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/authors/more-than-five-books', authorsWithManyBooks);

module.exports = router;
