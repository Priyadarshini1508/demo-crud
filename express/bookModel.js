const mongoose = require('mongoose');

// Define the Schema for a Book
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publication: { // Specific edition or series name
        type: String,
        trim: true
    },
    publicationHouse: { // The publisher company
        type: String,
        trim: true
    },
    publicationDate: {
        type: Date,
        default: Date.now // Store as a Date object
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;