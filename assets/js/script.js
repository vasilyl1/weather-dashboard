let userInput = document.querySelector("#btnSearch");

let manageHistoryInput = function (input) {
    let searchHistory = document.querySelectorAll(".btnHistory"); // get input history
    let isInHistory = false;

    for (let i = 0; i < 7; i++) { // check if the input is in history
        if (input.toUpperCase() === searchHistory[i].textContent.toUpperCase()) {
            isInHistory = true;
        }
    };
        if (! isInHistory) { // the city is not in history
            for (i = 7; i > 0; i--){ // move the list down
                searchHistory[i].textContent = searchHistory[i-1].textContent;
            }
            searchHistory[0].textContent = input; // save input to the top
        }
};

let buttonClickHandler = function (event) { //search for the entered city name
    let searchInput = document.querySelector("#searchInput");// get the input search
    

    event.preventDefault();

    manageHistoryInput(searchInput.value);

}
  




userInput.addEventListener('click', buttonClickHandler); // listen to the search button click event
  