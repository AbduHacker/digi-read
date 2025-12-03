const myLibrary = [];
let cards_id = [];
const modal = document.querySelector(".modal");
const addButton = document.querySelector(".add-btn");
const closeButton = document.querySelector(".bx-x");
const form = document.querySelector(".book-info");
function themeToggler() {
  const root = document.querySelector("html");
  const icon = document.querySelector(".theme-icon");
  const toggler = document.querySelector(".theme-toggle-btn");
  toggler.addEventListener("click", () => {
    icon.className =
      icon.className === "theme-icon bx bx-sun"
        ? "theme-icon bx bx-moon"
        : "theme-icon bx bx-sun";
    root.className = root.className === "light" ? "dark" : "light";
  });
}

function Book(title, author, pages, image, read) {
  if (!new.target) {
    throw Error(
      "The Book Constructor cannot be called without the 'new' keyword"
    );
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.image = image;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.readToggle = function () {
  this.read = this.read ? false : true;
};
Book.prototype.deleteBook = function () {
  delete this;
};
function addBookToLibrary(title, author, pages, image, read) {
  const book = new Book(title, author, pages, image, read);
  myLibrary.push(book);
  createCards();
}

addButton.addEventListener("click", () => {
  modal.showModal();
});
closeButton.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  modal.close();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const image = document.querySelector("#url").value;
  const readStatus =
    document.querySelector("input[name='read']:checked").value === "true"
      ? true
      : false;
  addBookToLibrary(title, author, pages, image, Boolean(readStatus));
  document.querySelectorAll("input").values = "";
});

function createCards() {
  const container = document.querySelector(".container");
  myLibrary.forEach((book) => {
    if (!cards_id.includes(book.id) || cards_id.length === 0) {
      let newCard = document.createElement("div");
      newCard.className = "card";
      newCard.dataset.id = book.id;
      cards_id.push(newCard.dataset.id);
      let image_container = document.createElement("div");
      image_container.className = "img-container";
      image_container.style.backgroundImage = `url(${book.image})`;
      newCard.append(image_container);

      let details = document.createElement("div");
      details.className = "details";

      let title = document.createElement("div");
      title.textContent = book.title;
      details.append(title);

      let author = document.createElement("div");
      author.textContent = `By ${book.author}`;
      details.append(author);

      let pages = document.createElement("div");
      pages.textContent = `${book.pages} pages`;
      details.append(pages);

      newCard.append(details);

      let cardButtons = document.createElement("div");
      cardButtons.className = "card-buttons";

      let readButton = document.createElement("button");
      readButton.className = "btn card-btn read-btn";
      readButton.textContent = book.read ? "Mark us unread" : "Mark as read";
      readButton.addEventListener("click", (event) => {
        book.readToggle();
        readButton.textContent = book.read ? "Mark us unread" : "Mark us read";
      });
      cardButtons.append(readButton);

      let deleteButton = document.createElement("button");
      deleteButton.className = "btn card-btn delete-btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (event) => {
        container.removeChild(newCard);
        book.deleteBook();
      });
      cardButtons.append(deleteButton);

      newCard.append(cardButtons);

      container.insertBefore(newCard, document.querySelector(".add-card"));
    }
  });
}

themeToggler();

addBookToLibrary(
  "Harry Potter",
  "J.K. Rowling",
  1000,
  "https://m.media-amazon.com/images/I/81uRUnI9Y3L._AC_UF1000,1000_QL80_.jpg",
  false
);
