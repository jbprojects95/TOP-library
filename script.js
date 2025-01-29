function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} --- ${author} --- ${pages} pages --- ${
      read.charAt(0).toUpperCase() + read.slice(1)
    }`;
  };
}

// const book1 = new Book("The Hobbit", "J.R.R Tolkien", "295", "read");

// console.log(book1.info());
