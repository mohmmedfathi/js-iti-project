function Author(name, email) {
  this.name = name;
  this.email = email;
}

function Book(name, price, author) {
  this.name = name;
  this.price = price;
  this.author = author;
}

let books = [];

const countForm = document.getElementById("book-count-form");
const bookForm = document.getElementById("book-form");
const bookTable = document.getElementById("book-table");
const bookEntryForm = document.getElementById("book-entry-form");
const bookTableBody = document.getElementById("book-table-body");

document.getElementById("ok-btn").onclick = () => {
  const count = parseInt(document.getElementById("book-count").value);
  if (!count || count <= 0) return;

  countForm.style.display = "none";
  bookForm.style.display = "block";

  bookEntryForm.innerHTML = "";
  for (let i = 0; i < count; i++) {
    bookEntryForm.innerHTML += `
                <div>
                    <p>Book ${i + 1}</p>
                    <input type="text" placeholder="Book Name" required><br>
                    <input type="text" placeholder="Price" required><br>
                    <input type="text" placeholder="Author Name" required><br>
                    <input type="email" placeholder="Author Email" required><br><br>
                </div>
            `;
  }
};

document.getElementById("submit-books").onclick = () => {
  const inputs = bookEntryForm.querySelectorAll("input");
  books = [];

  for (let i = 0; i < inputs.length; i += 4) {
    const name = inputs[i].value.trim();
    const price = inputs[i + 1].value.trim();
    const authorName = inputs[i + 2].value.trim();
    const email = inputs[i + 3].value.trim();

    if (!name || !price || !authorName || !email) {
      alert(" All fields are required.");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert(" Price must be a number greater than 0.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert(" Please enter a valid email address.");
      return;
    }

    const author = new Author(authorName, email);
    books.push(new Book(name, price, author));
  }

  bookForm.style.display = "none";
  displayTable();
};

function displayTable() {
  bookTableBody.innerHTML = "";
  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${book.name}</td>
                <td>${book.price}</td>
                <td>${book.author.name}</td>
                <td>${book.author.email}</td>
                <td>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            `;
    bookTableBody.appendChild(row);
  });
  bookTable.style.display = "block";
}

function editBook(index) {
  const row = bookTableBody.children[index];
  const book = books[index];
  row.innerHTML = `
            <td><input value="${book.name}"></td>
            <td><input value="${book.price}"></td>
            <td><input value="${book.author.name}"></td>
            <td><input value="${book.author.email}"></td>
            <td>
                <button onclick="saveBook(${index})">Save</button>
                <button onclick="displayTable()">Cancel</button>
            </td>
        `;
}

function saveBook(index) {
  const row = bookTableBody.children[index];
  const inputs = row.querySelectorAll("input");
  books[index].name = inputs[0].value;
  books[index].price = inputs[1].value;
  books[index].author.name = inputs[2].value;
  books[index].author.email = inputs[3].value;
  displayTable();
}

function deleteBook(index) {
  books.splice(index, 1);
  displayTable();
}
