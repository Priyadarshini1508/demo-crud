const express = require('express');
const router = express.Router();
// Path adjustment for same-directory placement
const Book = require('./bookModel'); 

// --- 1. CREATE (POST /api/books) ---
router.post('/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: 'Error creating book', error: err.message });
    }
});

// --- 2. READ (GET /api/books) - Get all books ---
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
});

// --- 3. READ (GET /api/books/:id) - Get a single book by ID ---
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book', error: err.message });
    }
});

// --- 4. UPDATE (PUT /api/books/:id) - Update a book by ID ---
router.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: 'Error updating book', error: err.message });
    }
});

// --- 5. DELETE (DELETE /api/books/:id) - Delete a book by ID ---
router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
});

module.exports = router;