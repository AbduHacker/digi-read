const myLibrary = [];
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

Book.prototype.readToggle = function() {
  this.read = true;
}
Book.prototype.deleteBook = function() {
  delete this;
}
function addBookToLibrary(title, author, pages, image, read) {
  const book = new Book(title, author, pages, image, read);
  myLibrary.push(book);
}

function modalControls() {
  const modal = document.querySelector(".modal");
  const btn = document.querySelector(".add-btn");
  const closeBtn = document.querySelector(".bx-x");
  btn.addEventListener("click", () => {
    modal.showModal();
  });
  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}
function formControls() {
  const form = document.querySelector(".book-info");
  let modal = document.querySelector(".modal");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.close();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const image = document.querySelector("#url").value;
    const readStatus = document.querySelector("input[name='read']:checked").value;
    document.querySelectorAll("input").values = "";

    addBookToLibrary(title, author, pages, image, Boolean(readStatus));
    });
}


themeToggler();
modalControls();
formControls();