const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./bookRoutes'); // <-- 1. ADD THIS LINE (Requires your new routes file)

const app = express();
const PORT = 3000;

// <-- 2. ADD THIS LINE (Tells Express where to find index.html, styles.css, app.js)
app.use(express.static(__dirname)); 

app.use(express.json());

// 3. Register the book routes for CRUD operations
app.use('/api', bookRoutes); // <-- 3. ADD THIS LINE

const MONGO_URI = 'mongodb+srv://priyadarshini0815_db_user:zzqtqyAF4iQt6F1E@cluster0.dz4bvzq.mongodb.net/?appName=Cluster0';

const connectDB = async () => {
    // ... existing connection logic ...
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();

// --- OPTIONAL: Remove the 'Item' code below if you only want the 'Book' functionality ---
// The 'Item' Schema and its routes (app.post('/api/items'), app.get('/api/items'), etc.) 
// can be left or removed. They won't interfere with the new book routes (/api/books).

const itemSchema = new mongoose.Schema({
    // ... item schema definition ...
});
const Item = mongoose.model('Item', itemSchema);

// ... existing Item CRUD routes ... 

// --- END OF OPTIONAL ITEM CODE ---


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open the application in your browser: http://localhost:${PORT}/index.html`); // <-- Helpful URL
});