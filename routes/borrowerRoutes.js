const express = require('express');
const { addBorrower, getAllBorrowers, updateBorrower } = require('../controllers/borrowerController');
const router = express.Router();

router.post('/add', addBorrower);
router.get('/all', getAllBorrowers); // New route to fetch all borrowers
router.put('/update/:id', updateBorrower);

module.exports = router;
