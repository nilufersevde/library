//DOM elements 
const table = document.querySelector("tbody");
const form = document.querySelector("#form"); 
const submitButton = document.querySelector(".submit");

//book constructor
function Book(t, a, p, r){
    this.title=t;
    this.author=a;
    this.page=p;
    this.read=r;
}

//adding books to the library using the constructor
let myLibrary = [];
function addBookToLibrary(addedbook) {
    const newBook = new Book(addedbook.author, addedbook.title, addedbook.page, addedbook.read);
    myLibrary.push(newBook);
}

//displaying the books on the page that was added to the myLibrary array
function displayBook() {
    for (let i=table.rows.length-1; i < myLibrary.length; i++) {
        let row = table.insertRow(i);
        let title = row.insertCell(0);
        title.innerHTML = myLibrary[i].title;
        let author = row.insertCell(1);
        author.innerHTML = myLibrary[i].author;
        let page = row.insertCell(2);
        page.innerHTML = myLibrary[i].page;
        //creating and adding toggle property to button that shows if the book was read or not
        let statusbutton = document.createElement("button");
        console.log(myLibrary[i].read)
        function buttonread() {if (myLibrary[i].read) {
        statusbutton.innerText = "read"
        statusbutton.classList.add("read")}
        else {
        statusbutton.innerText = "not read"
        statusbutton.classList.add("not_read")}}
        buttonread()
        row.append(statusbutton);
        statusbutton.addEventListener("click", status);
        function status() {
            this.classList.toggle("read");
            this.classList.toggle("not_read");
            if (this.innerHTML === "read") {
                this.innerHTML = "not read";
              } else {
                this.innerHTML = "read";
              }
            }
        let deletebutton = document.createElement("button")
        deletebutton.innerText = "X";
        row.append(deletebutton);
        deletebutton.addEventListener("click", deleteBook);
        function deleteBook() {
          table.deleteRow(i)
          myLibrary.splice(i, 1)
        }
    }
}

//functions for hiding and showing the form depending on the pressed button
function openForm() {
    document.getElementById("form").style.visibility = "visible";
  }

function  closeForm() {
    document.getElementById("form").style.visibility = "hidden";
    document.getElementById("form").reset();
}

//function that add the new book to the table when submit the form
   form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let formData = new FormData(ev.target);
      const formProps = Object.fromEntries(formData);
      console.log(formProps)//returns an object with name as the key and input as the value
      addBookToLibrary(formProps)
      displayBook() 
      closeForm()
      }
   )

//adding few books manually to the array to test if everything is working
let germinal = new Book("Germinal",  "Emile Zola", "850","Read");
myLibrary.push(germinal);
displayBook();