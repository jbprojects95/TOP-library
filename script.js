const myLibrary = [];
let selectedRating = 0;

// DONE: Add 5* rating system for books
// TODO: Add logic for 5* rating system:
// *add data-value to a tags so when clicked it returns value to be used
// TODO: Implement random num gen for each book
// TODO: Change how delete fn gets book from array

// TODO: Add JS form validation rather than required due to errors from using hidden form inputs due to dialog

// ? THIS IS FOR GENERATING RANDOM KEYS AND ASSOC THEM TO <LI>:
// function generateRandomKey() {
//   return Math.floor(Math.random() * 90000) + 10000;
// }

// const keyBtn = document.querySelector(".generate_key");
// keyBtn.addEventListener("click", () => {
//   console.log(generateRandomKey());
// });

// userList.forEach((user) => {
//   user.randomKey = generateRandomKey();
//   console.log(`${user.textContent}: ${user.randomKey}`);
// });

// *---------------------------------------------------[UTILITY]---------------------------------------------------------------

class Book {
  constructor(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
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
}

function addBookToLibrary(title, author, pages, read, rating) {
  const duplicate = myLibrary.find((book) => book.title === title);

  if (duplicate) {
    console.log(`Sorry, "${title}" is already in your library.`);
  } else {
    myLibrary.push(new Book(title, author, pages, read, rating));
  }
}

function clearForm() {
  const stars = document.querySelectorAll(".star");
  return (
    document.getElementById("add_book_form").reset(),
    (selectedRating = 0),
    stars.forEach((star) => {
      star.classList.remove("active");
    })
  );
}

function createBookElement(title, author, pages, read, rating, index) {
  const container = document.getElementsByClassName("book-display")[0];
  const bookCard = document.createElement("div");
  bookCard.classList.add("book_card");

  // This sets a data-attribute to the index param of fn (reminder for future me who will forget)
  bookCard.setAttribute("data-value", index);

  bookCard.innerHTML = `
    <h1 class="book_title">${title}</h1>
    <h2 class="book_author">${author}</h2>
    <p class="book_pages">${pages} pages</p>
    <p class="book_read">${read ? "Read" : "Unread"}</p>
    <p class="book_read">${rating} <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="m23.999 5l-6.113 12.478L4 19.49l10.059 9.834L11.654 43L24 36.42L36.345 43L33.96 29.325L44 19.491l-13.809-2.013z"
                      />
                    </svg></p>
    <button class="delete-button">Remove</button>
 `;

  container.appendChild(bookCard);
}

// !Can use a unique ID rather than this

function updateDataAttributes() {
  const container = document.getElementsByClassName("book-display")[0];
  const bookCards = container.querySelectorAll(".book_card");
  bookCards.forEach((card, newIndex) => {
    card.setAttribute("data-value", newIndex);
  });
}

function deleteBook(index) {
  const container = document.getElementsByClassName("book-display")[0];

  const bookCard = container.querySelector(`[data-value="${index}"]`);
  if (bookCard) {
    bookCard.remove();
    myLibrary.splice(index, 1);
    updateDataAttributes();
    console.table(myLibrary);
  }
}

// *---------------------------------------------------[APP LOGIC]--------------------------------------------------------------------

const runApp = () => {
  const addBook = document.getElementById("a_b_btn");
  const dialog = document.getElementById("dialog");
  const formSubmit = document.getElementById("submit");
  const closeDialog = document.getElementById("close");
  const cancelDialog = document.getElementById("cancel");

  addBook.addEventListener("click", () => {
    dialog.showModal();
  });

  closeDialog.addEventListener("click", () => {
    dialog.close();
    clearForm();
  });

  cancelDialog.addEventListener("click", () => {
    dialog.close();
    clearForm();
  });

  // Dialog needs own eventlistener because it has own button.
  // Event needs to be "submit", "click" makes any click within an area close it
  // which I don't want.
  dialog.addEventListener("submit", (e) => {
    e.preventDefault();
    dialog.close();
    clearForm();
  });

  // *-----------------[STAR-RATING]------------------------------

  const stars = document.querySelectorAll(".star");
  const totalStars = stars.length;

  stars.forEach((star, index) => {
    star.addEventListener("click", (e) => {
      const clickedVisualIndex = totalStars - 1 - index;

      const starValue = e.currentTarget.getAttribute("data-star");
      selectedRating = parseInt(starValue, 10);

      stars.forEach((otherStar, otherIndex) => {
        const otherVisualIndex = totalStars - 1 - otherIndex;
        if (otherVisualIndex <= clickedVisualIndex) {
          otherStar.classList.add("active");
        } else {
          otherStar.classList.remove("active");
        }
      });

      console.log(selectedRating);
    });
  });

  formSubmit.addEventListener("click", () => {
    // When working with forms you get the data by element.value
    const bookTitle = document.getElementById("book_title").value;
    const bookAuthor = document.getElementById("book_author").value;
    const bookPages = document.getElementById("book_pages").value;
    const bookRead = document.getElementById("book_read").checked; //this.read is boolean so needs checked instead of value
    const bookForm = document.getElementById("add_book_form");

    if (!bookForm.checkValidity()) {
      return;
    }

    const duplicate = myLibrary.find((book) => book.title === bookTitle);

    if (!duplicate) {
      addBookToLibrary(
        bookTitle,
        bookAuthor,
        bookPages,
        bookRead,
        selectedRating
      );
      // This uses the library length to create the index number,
      // originally had it without the -1, but it wouldn't let me re-add a deleted book
      const bookIndex = myLibrary.length - 1;
      createBookElement(
        bookTitle,
        bookAuthor,
        bookPages,
        bookRead,
        selectedRating,
        bookIndex
      );
    } else {
      alert("You already have this book in your library");
    }

    // console.table(myLibrary);
  });

  // used a container event rather than attaching one to every book card as that isnt efficient
  const container = document.getElementsByClassName("book-display")[0];
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const bookCard = e.target.closest(".book_card");
      const index = bookCard.getAttribute("data-value");
      deleteBook(index);
    }
  });
};

runApp();
