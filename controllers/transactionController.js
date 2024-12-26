const Book = require('../models/book');
const Borrower = require('../models/borrower');
const Author = require('../models/author');

// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { bookId, borrowerId } = req.body;

        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        const borrower = await Borrower.findById(borrowerId);
        if (!borrower || !borrower.membershipActive) {
            return res.status(400).json({ message: 'Invalid or inactive borrower' });
        }

        book.availableCopies -= 1;
        borrower.borrowedBooks.push(bookId);

        await book.save();
        await borrower.save();

        res.json({ message: 'Book borrowed successfully', book, borrower });
    } catch (error) {
        res.status(400).json({ message: 'Error borrowing book', error });
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const { bookId, borrowerId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const borrower = await Borrower.findById(borrowerId);
        if (!borrower) {
            return res.status(404).json({ message: 'Borrower not found' });
        }

        if (!borrower.borrowedBooks.includes(bookId)) {
            return res.status(400).json({ message: 'Book not borrowed by this user' });
        }

        book.availableCopies += 1;
        borrower.borrowedBooks = borrower.borrowedBooks.filter((id) => id.toString() !== bookId);

        await book.save();
        await borrower.save();

        res.json({ message: 'Book returned successfully', book, borrower });
    } catch (error) {
        res.status(400).json({ message: 'Error returning book', error });
    }
};

// Authors with more than five books
const authorsWithManyBooks = async (req, res) => {
    try {
        const authors = await Author.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'books',
                },
            },
            {
                $addFields: { bookCount: { $size: '$books' } },
            },
            {
                $match: { bookCount: { $gt: 5 } },
            },
            {
                $project: { name: 1, email: 1, bookCount: 1 },
            },
        ]);

        res.json(authors);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching authors with more than five books', error });
    }
};

module.exports = { borrowBook, returnBook, authorsWithManyBooks };
