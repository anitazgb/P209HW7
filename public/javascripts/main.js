// create data array for books
let bookArray = [];

//create books objects
let BookObject = function (pTitle, pYear, pGenre, pAuthor, pCountry) {
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;
    this.Author = pAuthor;
    this.Country = pCountry;
    this.ID = Math.random().toString(16).slice(5)   //bookArray.length + 1;
}

bookArray.push(new BookObject("HTML & CSS", 2011, "Nonfiction", "Jon Duckett", "United States"));
bookArray.push(new BookObject("JavaScript & jQuery", 2014, "Nonfiction", "Jon Duckett", "United States"));
bookArray.push(new BookObject("The Miracle Morning", 2017, "Action", "Hal Elrod", "United States"));

let selectGenre = "";

document.addEventListener('DOMContentLoaded', function () {
    createList();

    //add buttons events
    document.getElementById('buttonAdd').addEventListener('click', function () {
        bookArray.push(new BookObject(document.getElementById("title").value,
            selectGenre,
            document.getElementById("year").value,
            document.getElementById("author").value,
            document.getElementById("country").value));
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonClear").addEventListener('click', function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("author").value = "";
        document.getElementById("country").value = "";
    });
    $(document).bind("change", "#select-genre", function (event, ui) {
        selectGenre = $('#select-genre').val();
    });
    document.getElementById("buttonSortTitle").addEventListener("click", function () {
        bookArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });
    document.getElementById("buttonSortGenre").addEventListener("click", function () {
        bookArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListAll";
    });
    //missid #1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    //page before show code********************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {    //have to use jQuery
        createList();
    });
    //for datails page
    $(document).on("pagebeforeshow", "#details", function (event) {
        let localID = localStorage.getItem('parm');
        bookArray = JSON.parse(localStorage.getItem('bookArray'));
        let pointer = GetArrayPointer(localID);

        document.getElementById("oneTitle").innerHTML = "The book name is: " + bookArray[pointer].Title;
        document.getElementById("oneYear").innerHTML = "The date of book been released: " + bookArray[pointer].Year;
        document.getElementById("oneGenre").innerHTML = "The genre of book is: " + bookArray[pointer].Genre;
        document.getElementById("oneAuthor").innerHTML = "The author of the book is: " + bookArray[pointer].Author;
        document.getElementById("oneCountry").innerHTML = "The counry where book been written is: " + bookArray[pointer].Country;
    });
});   //End of DOMContentLoaded

function createList() {
    //clear prior data
    let myUL = document.getElementById("BookListUl");
    myUL.innerHTML = "";

    bookArray.forEach(function (book, index) {
        var myLi = document.createElement('li');
        myLi.classList.add('book');
        myLi.setAttribute("data-parm", book.ID);
        myLi.innerHTML = index + 1 + ": " + book.Title + " " + book.Author + " " + book.Genre;
        myUL.appendChild(myLi);
    });

    //display out list
    var liList = document.getElementsByClassName('book')
    let newBookArray = Array.from(liList);
    newBookArray.forEach(function (element) {
        element.addEventListener('click', function () {
            var parm = this.getAttribute("data-parm");
            localStorage.setItem('parm', parm);

            let stringBookArray = JSON.stringify(bookArray);
            localStorage.setItem('bookArray', stringBookArray);
            document.location.href = "index.html#details";
        });
    });
};

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

function GetArrayPointer(localID) {
    for (let i = 0; i < bookArray.length; i++) {
        if (localID === bookArray[i].ID) {
            return i;
        }
    }
}