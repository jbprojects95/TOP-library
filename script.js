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

function addBookToLibrary(title, author, pages) {
  const duplicate = myLibrary.find((book) => book.title === title);

  if (duplicate) {
    console.log(`Sorry, "${title}" is already in your library.`);
  } else {
    myLibrary.push(new Book(title, author, pages));
  }
}

// *---------------------------------------------------[APP LOGIC]--------------------------------------------------------------------

const runApp = () => {
  const addBook = document.getElementById("a-b-btn");
  const dialog = document.getElementById("dialog");
  const dialogStatus = document.getElementById("d-status");

  // Will remove as not needed. Just there to see it's working
  function checkDialog(dialog) {
    if (dialog.open) {
      dialogStatus.textContent = "Open";
    } else {
      dialogStatus.textContent = "Closed";
    }
  }

  addBook.addEventListener("click", () => {
    dialog.showModal();
    checkDialog(dialog);
  });

  // Dialog needs own eventlistener because it has own button.
  // Event needs to be "submit", "click" makes any click within an area close it, which I don't want.
  dialog.addEventListener("submit", (e) => {
    e.preventDefault();
    dialog.close();
    checkDialog(dialog);
  });
};

runApp();
