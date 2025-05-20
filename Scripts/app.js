// Get references to all form inputs and UI containers
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const genreInput = document.querySelector('#genre');
const pagesInput = document.querySelector('#pages');
const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');
const deletedList = document.querySelector('#deleted-book-list');

// Arrays to hold current and deleted books
const bookLibrary = [];
const deletedBooks = [];

function loadFromLocal(){
    const storedBooks = localStorage.getItem('bookLibrary');
    const storedDeleted = localStorage.getItem('deletedBooks');
    if (storedBooks) bookLibrary.push(...JSON.parse(storedBooks));
    if (storedDeleted) deletedBooks.push(...JSON.parse(storedDeleted));
    renderUi();
    renderDelete();
}

loadFromLocal();

function saveToLocal (){
    localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary));
    localStorage.setItem('deletedBooks', JSON.stringify(deletedBooks));
}

// Handle form submission: add book, update UI
bookForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    addBook();          // Add new book to library
    renderUi();         // Update the main book list
    renderDelete();     // Update the deleted books list
});

// Add a new book object to the library array
function addBook() {
    const book = {
        title: titleInput.value,
        author: authorInput.value,
        genre: genreInput.value,
        pages: pagesInput.value
    };
    bookLibrary.push(book); // Add to main array
    bookForm.reset();       // Clear the form fields
    console.log(bookLibrary); // Debug: log current library
    saveToLocal();
}

// Render all books in the main library
function renderUi() {
    bookList.innerHTML = ""; // Clear previous list
    for (let i = 0; i < bookLibrary.length; i++) {
        const card = document.createElement('div');
        card.className = 'book-card';

        // Create labeled fields for each property
        const title = document.createElement('h3');
        title.innerHTML = `<span style="font-weight:600;">Title:</span> ${bookLibrary[i].title}`;

        const author = document.createElement('div');
        author.className = 'meta';
        author.innerHTML = `<span style="font-weight:600;">Author:</span> ${bookLibrary[i].author}`;

        const genre = document.createElement('div');
        genre.className = 'genre';
        genre.innerHTML = `<span style="font-weight:600;">Genre:</span> ${bookLibrary[i].genre}`;

        const pages = document.createElement('div');
        pages.className = 'pages';
        pages.innerHTML = `<span style="font-weight:600;">Pages:</span> ${bookLibrary[i].pages}`;

        // Delete button for each book
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            // Move book to deletedBooks, remove from library
            deletedBooks.push(bookLibrary[i]);
            bookLibrary.splice(i, 1);
            renderUi();
            renderDelete();
            saveToLocal();
        });

        // Add all elements to the card and then to the list
        card.append(title, author, genre, pages, deleteBtn);
        bookList.append(card);
    }
}

// Render all deleted books in the deleted section
function renderDelete() {
    deletedList.innerHTML = ""; // Clear previous list
    for (let i = 0; i < deletedBooks.length; i++) {
        const deletedCard = document.createElement('div');
        deletedCard.className = 'book-card';

        const deletedTitle = document.createElement('h3');
        deletedTitle.innerHTML = `<span style="font-weight:600;">Title:</span> ${deletedBooks[i].title}`;

        const deletedAuthor = document.createElement('div');
        deletedAuthor.className = 'meta';
        deletedAuthor.innerHTML = `<span style="font-weight:600;">Author:</span> ${deletedBooks[i].author}`;

        const deletedGenre = document.createElement('div');
        deletedGenre.className = 'genre';
        deletedGenre.innerHTML = `<span style="font-weight:600;">Genre:</span> ${deletedBooks[i].genre}`;

        const deletedPages = document.createElement('div');
        deletedPages.className = 'pages';
        deletedPages.innerHTML = `<span style="font-weight:600;">Pages:</span> ${deletedBooks[i].pages}`;

        // Add all elements to the deleted card and then to the deleted list
        deletedCard.append(deletedTitle, deletedAuthor, deletedGenre, deletedPages);
        deletedList.append(deletedCard);
    }
}


