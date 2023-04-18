//DOM elements 
const table = document.querySelector("tbody");
const form = document.querySelector("#form"); 
const submitButton = document.querySelector(".submit");
const modal = document.querySelector(".modal");
const big_container = document.querySelector(".big_container");
const big = document.querySelector(".big");
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
    newBook.id = myLibrary.indexOf(newBook);
}

//adding few books manually to the array to test if everything is working
let germinal = new Book("Germinal",  "Emile Zola", "836","Read");
let pol = new Book("The Sexual Polticis of Meat",  "Carol J. Adams", "450"," Not Read");
let swan = new Book("Swan's Way",  "Marcel Proust", "494","Read");
myLibrary.push(germinal);
myLibrary.push(pol);
myLibrary.push(swan);
displayBook();

/*TABLE*/

//displaying the books on the page that was added to the myLibrary array
function displayBook() {
    for (let i=table.rows.length-1; i < myLibrary.length; i++) {
        //creating the row
        let row = table.insertRow(i);
        row.setAttribute('data-index', i);
        console.log(row.getAttribute("data-index"));
        row.classList.add("row");
        //creating the cells with the added book's values
        let title = row.insertCell(0);
        title.innerHTML = myLibrary[i].title;
        title.classList.add("tb");
        let author = row.insertCell(1);
        author.innerHTML = myLibrary[i].author;
        author.classList.add("tb")
        let page = row.insertCell(2);
        page.innerHTML = myLibrary[i].page;
        page.classList.add("tb")
        //creating and adding toggle property to button that shows if the book was read or not
        let statusbutton = document.createElement("button");
        function buttonread() {if (myLibrary[i].read) {
        statusbutton.innerText = "read"
        statusbutton.classList.add("read")
        }
        else {
        statusbutton.innerText = "not read"
        statusbutton.classList.add("not_read")}}
        buttonread()
        let cell = row.insertCell();
        cell.appendChild(statusbutton);
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
        //creating the delete button 
        let deletebutton = document.createElement("button");
        deletebutton.innerText = "X";
        deletebutton.classList.add("delete_button");
        let cell2 = row.insertCell();
        cell2.appendChild(deletebutton);
    }
}

//deletes the row when click on the delete button 
table.addEventListener('click', function removeBook(e) {
  if (e.target.classList.contains("delete_button")) {
    const targetrow = e.target.parentNode.parentNode;
    targetrow.remove();
    const dataindex = targetrow.getAttribute("data-index");
    const targetedbook = myLibrary.find(item => item.id == dataindex);
    index = myLibrary.indexOf(targetedbook);
    myLibrary.splice(index,1);
  }
})

/*FORM*/

//function that add the new book to the table when submit the form
form.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(e.target);
      const bookObject = Object.fromEntries(formData);
      console.log(bookObject);
      addBookToLibrary(bookObject);
      displayBook();
      closeForm();
  }
)

//functions for hiding and showing the form depending on the pressed button
function openForm() {
  modal.style.visibility = "visible";
  big.classList.add("blur");
  }

function  closeForm() {
  modal.style.visibility = "hidden";
  form.reset();
  big.classList.remove("blur");
}