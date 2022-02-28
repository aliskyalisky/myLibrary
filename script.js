const addButton = document.querySelector('.addbtn');
const inputBox = document.querySelector('.bookinput');
const inputReadBtn = document.querySelector('.readbtn')
const inputReadBall = document.querySelector('.readbtnball')
const inputSubmit = document.querySelector('.submit');
const inputTitle = document.querySelector('#booktitle');
const inputAuthor = document.querySelector('#bookauthor');
const inputPages = document.querySelector('#bookpages');
const cardReadBtns = document.querySelector('.bookcardread');
const bookCards = document.querySelector('.content');
let library = {
    books: []
};
let inputIsRead = false;



addButton.addEventListener('click', function () {
    addButton.classList.toggle('addclicked');
    inputBox.classList.toggle('closed');
});

inputReadBtn.addEventListener('click', function () {
    inputReadBtn.classList.toggle('readyes');
    inputReadBall.classList.toggle('readyes');

    if (inputReadBtn.classList.contains('readyes')) {
        inputIsRead = true;
    } else {
        inputIsRead = false;
    }
}); 

inputSubmit.addEventListener('click', function () {
    addBook();
    addButton.classList.toggle('addclicked');
    inputBox.classList.toggle('closed');
    clearInput();
    updateLibrary();
});


function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = inputIsRead
}


const clearInput = () => {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
}

const getBook = () => {
    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;
    return new Book(title, author, pages)
}

const addBook = () => {
    let newBook = getBook()
    library.books.push(newBook);
}

const resetCards = () => {
    bookCards.innerHTML = '';
}

const displayBook = (book) => {
    const bookCard = document.createElement('div')
    const deleteBtn = document.createElement('button')
    const cardTitle = document.createElement('h3')
    const cardAuthor = document.createElement('h5')
    const cardPages = document.createElement('p')
    const cardRead = document.createElement('button')

    bookCard.classList.add('bookcard')
    deleteBtn.classList.add('delete')
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Remove'
    deleteBtn.onclick = deleteBook
    cardRead.type = 'button';
    cardRead.onclick = toggleRead
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = `${book.pages} pages`
    
    if (book.isRead) {
        cardRead.textContent = 'Read'
        cardRead.classList.add('bookcardread')
        cardRead.classList.add('bookcardready')
    } else {
        cardRead.textContent = 'Not read'
        cardRead.classList.add('bookcardread')
    }

    bookCard.appendChild(cardTitle)
    bookCard.appendChild(cardAuthor)
    bookCard.appendChild(cardPages)
    bookCard.appendChild(cardRead)
    bookCard.appendChild(deleteBtn)
    bookCards.appendChild(bookCard)
}

const updateLibrary = () => {
    resetCards();

    for (let book of library.books) {
        displayBook(book)
    }
}

library.findBook = function(title) {
    return this.books.find((book) => book.title === title)
  }

library.deleteBook = function(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML
    const book = library.findBook(title)

    book.isRead = !book.isRead;

    updateLibrary()
}

const deleteBook = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML
    library.deleteBook(title)
    updateLibrary()
}
