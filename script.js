const myLibrary = [];

// *---------------------------------------------------[UTILITY]---------------------------------------------------------------

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = "false"
  this.read = false;
  // **Below doesn't work for boolean values (regarding if it's been read or not),
  // **as the commented code treats it as a string:
  // this.info = function () {
  //   return `${this.title} --- ${this.author} --- ${this.pages} pages --- ${
  //     this.read.charAt(0).toUpperCase() + this.read.slice(1)
  //   }`;

  // **This uses ternary operators to check the value of this.read
  // **If true then it returns "Read", else returns "Unread"
  this.info = function () {
    return `${this.title} --- ${this.author} --- ${this.pages} pages --- ${
      this.read ? "Read" : "Unread"
    }`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const duplicate = myLibrary.find((book) => book.title === title);

  if (duplicate) {
    console.log(`Sorry, "${title}" is already in your library.`);
  } else {
    myLibrary.push(new Book(title, author, pages, read));
  }
}

function clearForm() {
  document.getElementById("add_book_form").reset();
}

function displayBookElement() {
  return;
}

function createBookElement(title, author, pages, read) {
  const container = document.getElementsByClassName("book-display")[0];
  const bookCard = document.createElement("div");
  bookCard.classList.add("book_card");

  bookCard.innerHTML = `
    <h1 class="book_title">${title}</h1>
    <h2 class="book_author">${author}</h2>
    <p class="book_pages">Pages: ${pages}</p>
    <p class="book_read">Read: ${read}</p>
    <button class="delete-button">Remove</button>
 `;

  container.appendChild(bookCard);
}

function deleteBook() {
  return;
}

// *---------------------------------------------------[APP LOGIC]--------------------------------------------------------------------

const runApp = () => {
  const addBook = document.getElementById("a_b_btn");
  const addBook_2 = document.getElementById("a_b_btn_2");
  const dialog = document.getElementById("dialog");
  const formSubmit = document.getElementById("submit");
  const closeDialog = document.getElementById("cancel");

  addBook.addEventListener("click", () => {
    dialog.showModal();
  });

  addBook_2.addEventListener("click", () => {
    dialog.showModal();
  });

  closeDialog.addEventListener("click", () => {
    dialog.close();
    clearForm();
  });

  // Dialog needs own eventlistener because it has own button.
  // Event needs to be "submit", "click" makes any click within an area close it, which I don't want.
  dialog.addEventListener("submit", (e) => {
    e.preventDefault();
    dialog.close();
    clearForm();
  });

  formSubmit.addEventListener("click", () => {
    let bookTitle = document.getElementById("book_title").value;
    let bookAuthor = document.getElementById("book_author").value;
    let bookPages = document.getElementById("book_pages").value;
    let bookRead = document.getElementById("book_read").checked; //this.read is boolean so needs checked instead of value
    console.log("SUBMITTED!");
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    createBookElement(bookTitle, bookAuthor, bookPages, bookRead);

    console.table(myLibrary);

    // ! Need to loop through myLibrary and create a card for each element of array
  });
};

runApp();
