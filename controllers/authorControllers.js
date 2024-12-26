const Author = require('../models/author');

// Fetch all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new author
exports.addAuthor = async (req, res) => {
    const { name, email } = req.body;
    try {
        const author = new Author({ name, email });
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an author
exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const author = await Author.findByIdAndUpdate(id, { name, email }, { new: true });
        res.json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        await Author.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
