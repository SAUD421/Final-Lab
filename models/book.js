const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true, 
    },
    availableCopies: {
        type: Number,
        required: true,
        min: [0, 'Available copies cannot be negative'],
    },
});

module.exports = mongoose.model('Book', BookSchema);
