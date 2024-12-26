const apiBaseURL = "http://localhost:3000";

// Fetch and display authors
async function loadAuthors() {
    const table = document.getElementById("authorsTable");
    try {
        const response = await fetch(`${apiBaseURL}/authors`);
        const authors = await response.json();

        table.innerHTML = authors.map(author => `
            <tr>
                <td>${author.name}</td>
                <td>${author.email}</td>
                <td>
                    <button onclick="deleteAuthor('${author._id}')">Delete</button>
                    <button onclick="editAuthor('${author._id}', '${author.name}', '${author.email}')">Edit</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Error loading authors:", error);
    }
}

// Fetch and display books
async function loadBooks() {
    const table = document.getElementById("booksTable");
    try {
        const response = await fetch(`${apiBaseURL}/books/all`);
        const { books } = await response.json();

        table.innerHTML = books.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>${book.author.name}</td>
                <td>${book.isbn}</td>
                <td>${book.availableCopies}</td>
                <td>
                    <button onclick="deleteBook('${book._id}')">Delete</button>
                    <button onclick="editBook('${book._id}', '${book.title}', '${book.author.name}', '${book.isbn}', ${book.availableCopies})">Edit</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

// Fetch and display borrowers
async function loadBorrowers() {
    const table = document.getElementById("borrowersTable");
    try {
        const response = await fetch(`${apiBaseURL}/borrowers`);
        const borrowers = await response.json();

        table.innerHTML = borrowers.map(borrower => `
            <tr>
                <td>${borrower.name}</td>
                <td>${borrower.membershipType}</td>
                <td>${borrower.borrowedBooks.length}</td>
                <td>
                    <button onclick="deleteBorrower('${borrower._id}')">Delete</button>
                    <button onclick="editBorrower('${borrower._id}', '${borrower.name}', '${borrower.membershipType}')">Edit</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Error loading borrowers:", error);
    }
}

// Delete Author
async function deleteAuthor(id) {
    if (confirm("Are you sure you want to delete this author?")) {
        try {
            await fetch(`${apiBaseURL}/authors/delete/${id}`, { method: 'DELETE' });
            loadAuthors();
        } catch (error) {
            console.error("Error deleting author:", error);
        }
    }
}

// Edit Author
function editAuthor(id, name, email) {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new email:", email);

    if (newName && newEmail) {
        updateAuthor(id, newName, newEmail);
    }
}

// Update Author
async function updateAuthor(id, name, email) {
    try {
        await fetch(`${apiBaseURL}/authors/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });
        loadAuthors();
    } catch (error) {
        console.error("Error updating author:", error);
    }
}

// Delete Book
async function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        try {
            await fetch(`${apiBaseURL}/books/delete/${id}`, { method: 'DELETE' });
            loadBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    }
}

// Edit Book
function editBook(id, title, authorName, isbn, availableCopies) {
    const newTitle = prompt("Enter new title:", title);
    const newAuthor = prompt("Enter new author name:", authorName);
    const newIsbn = prompt("Enter new ISBN:", isbn);
    const newAvailableCopies = prompt("Enter new available copies:", availableCopies);

    if (newTitle && newAuthor && newIsbn && newAvailableCopies) {
        updateBook(id, newTitle, newAuthor, newIsbn, newAvailableCopies);
    }
}

// Update Book
async function updateBook(id, title, author, isbn, availableCopies) {
    try {
        await fetch(`${apiBaseURL}/books/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, isbn, availableCopies }),
        });
        loadBooks();
    } catch (error) {
        console.error("Error updating book:", error);
    }
}

// Delete Borrower
async function deleteBorrower(id) {
    if (confirm("Are you sure you want to delete this borrower?")) {
        try {
            await fetch(`${apiBaseURL}/borrowers/delete/${id}`, { method: 'DELETE' });
            loadBorrowers();
        } catch (error) {
            console.error("Error deleting borrower:", error);
        }
    }
}

// Edit Borrower
function editBorrower(id, name, membershipType) {
    const newName = prompt("Enter new name:", name);
    const newMembershipType = prompt("Enter new membership type:", membershipType);

    if (newName && newMembershipType) {
        updateBorrower(id, newName, newMembershipType);
    }
}

// Update Borrower
async function updateBorrower(id, name, membershipType) {
    try {
        await fetch(`${apiBaseURL}/borrowers/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, membershipType }),
        });
        loadBorrowers();
    } catch (error) {
        console.error("Error updating borrower:", error);
    }
}

// Load authors, books, and borrowers on page load
window.onload = () => {
    loadAuthors();
    loadBooks();
    loadBorrowers();
};
