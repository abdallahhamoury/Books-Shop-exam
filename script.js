'use strict';

let myForm = document.getElementById('myForm');
let table = document.getElementById('table');

let tboodyEl = document.createElement('tbody');
table.appendChild(tboodyEl);

let tfootEl = document.createElement('foot');
table.appendChild(tfootEl);

Book.shopsBook = [];


// _________________________________________object___________________________________________________________==>
function Book(bookName, pages, bookPrice) {
    this.bookName = bookName;
    this.pages = pages;
    this.bookPrice = bookPrice;

    Book.shopsBook.push(this);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// __________________________________________________________________________________________________________==<
// _________________________________________object___________________________________________________________==>
myForm.addEventListener('submit', handelSubmit);
// _________________________________________________________________________________________________________==<

function handelSubmit(event) {
    event.preventDefault();

    let bookName = event.target.bookName.value;
    let pages = getRandomIntInclusive(1, 500);
    let bookPrice = event.target.bookPrice.value;

    new Book(bookName, pages, bookPrice);

    saveToLocalStoreg();
    renderTable();
}
// _________________________________________________________________________________________________________==<

// _________________________________________________________________________________________________________==>
function saveToLocalStoreg() {
    let data = JSON.stringify(Book.shopsBook);
    localStorage.setItem('books', data);
}

function readFromLocalStoreg() {
    let strigobj = localStorage.getItem('books');
    let normalObj = JSON.parse(strigobj);

    if (normalObj !== null) {
        Book.shopsBook = normalObj;
    }
}
// _________________________________________________________________________________________________________==<

function renderTable() {
    readFromLocalStoreg();
    tboodyEl.textContent = '';
    let total = 0;
    for (let i = 0; i < Book.shopsBook.length; i++) {
        let trEl = document.createElement('tr');
        let tdEl1 = document.createElement('td');
        tdEl1.textContent = Book.shopsBook[i].bookName;
        trEl.appendChild(tdEl1);

        let tdEl2 = document.createElement('td');
        tdEl2.textContent = Book.shopsBook[i].pages;
        trEl.appendChild(tdEl2);

        let tdEl3 = document.createElement('td');
        tdEl3.textContent = Book.shopsBook[i].bookPrice;
        total = total + Number(Book.shopsBook[i].bookPrice);
        trEl.appendChild(tdEl3);

        tboodyEl.appendChild(trEl);

    }
    tfootEl.textContent = '';
    let trElFoot = document.createElement('tr');
    let thElFoot = document.createElement('th');
    thElFoot.textContent = 'Total';

    let thEl1 = document.createElement('th');
    thEl1.textContent = `${total}`;

    trElFoot.appendChild(thElFoot);
    trElFoot.appendChild(thEl1);
    tfootEl.appendChild(trElFoot);

}

renderTable();