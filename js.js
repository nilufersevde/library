const table = document.querySelector("tbody");
function Book(title, author, page, read){
    this.author=author;
    this.title=title;
    this.page=page;
    this.read=read;
}

let myLibrary = [];

function addBookToLibrary(addedbook) {
    const newBook = new Book(addedbook.author, addedbook.title, addedbook.page, addedbook.read)
    myLibrary.push(newBook)
}

function displayBook() {
    for (let i=0; i < myLibrary.length; i++) {
        let row = table.insertRow(i);
        let title = row.insertCell(0);
        title.innerHTML = myLibrary[i].title;
        let author = row.insertCell(1);
        author.innerHTML = myLibrary[i].author;
        let page = row.insertCell(2);
        page.innerHTML = myLibrary[i].page;
        let button = document.createElement("button");
        button.innerText = "read";
        button.className = "read";
        row.append(button);
        button.addEventListener('click', status);
        function status() {
            this.classList.toggle('read');
            this.classList.toggle('not_read');
            if (this.innerHTML === "read") {
                this.innerHTML = "not read";
              } else {
                this.innerHTML = "read";
              }
            }
    }
}

function openForm() {
    document.getElementById("form").style.visibility = "visible";
  }

function  closeForm() {
    document.getElementById("form").style.visibility = "hidden";
}

let tolkien = new Book("Lord of The Rings",  "J.R.R Tolkien", "1020","Read")
myLibrary.push(tolkien);
displayBook();