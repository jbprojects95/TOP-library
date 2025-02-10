const myLibrary = [];

// *---------------------------------------------------[CONSTRUCTOR FN]---------------------------------------------------------------

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

// *---------------------------------------------------[APP LOGIC]--------------------------------------------------------------------

const runApp = () => {
  const addBook = document.getElementById("a_b_btn");
  const addBook_2 = document.getElementById("a_b_btn_2");
  const dialog = document.getElementById("dialog");
  const formSubmit = document.getElementById("submit");

  addBook.addEventListener("click", () => {
    dialog.showModal();
  });

  addBook_2.addEventListener("click", () => {
    dialog.showModal();
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
    // for (const book of myLibrary) {
    //   console.table(book);
    // }
    console.table(myLibrary);

    // ! Put addBookToLibrary here so on submit it's added to array

    // ! Need to loop through myLibrary and create a card for each element of array
  });
};

runApp();
