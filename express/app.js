document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');

    // Base URL for our API endpoints
    const API_URL = '/api/books'; 

    // --- FUNCTION TO FETCH AND DISPLAY BOOKS (READ) ---
    async function fetchBooks() {
        try {
            const response = await fetch(API_URL);
            const books = await response.json();
            
            bookList.innerHTML = ''; // Clear existing list
            
            books.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    **${book.name}** by ${book.author} 
                    (Publisher: ${book.publicationHouse || 'N/A'})
                    <button onclick="deleteBook('${book._id}')">Delete</button>
                `;
                bookList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    // --- FORM SUBMISSION HANDLER (CREATE) ---
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookData = {
            name: document.getElementById('name').value,
            author: document.getElementById('author').value,
            publicationHouse: document.getElementById('publicationHouse').value,
            publicationDate: document.getElementById('publicationDate').value,
            isbn: document.getElementById('isbn').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                bookForm.reset(); // Clear the form
                fetchBooks();    // Refresh the list
            } else {
                alert('Failed to save book!');
            }
        } catch (error) {
            console.error('Error saving book:', error);
        }
    });

    // --- DELETE FUNCTION (DELETE) ---
    window.deleteBook = async function(bookId) {
        try {
            const response = await fetch(`${API_URL}/${bookId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchBooks(); // Refresh the list
            } else {
                alert('Failed to delete book!');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    // Initial load of books
    fetchBooks();
});