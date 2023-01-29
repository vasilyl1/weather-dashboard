let userInput = document.querySelector("#btnSearch");
let geoData = [];


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

let geoCode = function (city) { //return geo coordinates by city name
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + secret.openWeatherAPI)
  .then(function (response) {
    if (response.status === 404) {
        //document.location.replace(redirectUrl);
    } else {
        return response.json();
    }
  }). then (function(data){
   /* geoData = {
        country: data[0].country, 
        lat: data[0].lat,
        lon: data[0].lon,
        state: data[0].state,
        name: data[0].name
    } */
    geoData[0] = data[0].lat;
    geoData[1] = data[0].lon;
    console.log(data[0]);
    console.log(geoData);
  });
    return(geoData);
};

let weatherUpdate = function (data1) { // get JSON object and render weather info
   
   console.log(geoCode(data1));
    
    //console.log(data[0].length + " " + data[0].name + " lat:" + data[0].lat + " lon:" + data[0].lon + " country:" + data[0].country);
};

let buttonClickHandler = function (event) { //search for the entered city name
    let searchInput = document.querySelector("#searchInput");// get the input search
    let geoData;

    event.preventDefault();

    manageHistoryInput(searchInput.value); // manage history of requests
    geoData = weatherUpdate(searchInput.value); // render weather info
    console.log (geoData);
};
  




userInput.addEventListener('click', buttonClickHandler); // listen to the search button click event
  