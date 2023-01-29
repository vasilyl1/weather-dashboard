let userInput = document.querySelector("#btnSearch");
let geoData = {};
let weatherData = {};


let manageHistoryInput = function (input) {
    let searchHistory = document.querySelectorAll(".btnHistory"); // get input history
    let isInHistory = false;

    for (let i = 0; i < 7; i++) { // check if the input is in history
        if (input.toUpperCase() === searchHistory[i].textContent.toUpperCase()) {
            isInHistory = true;
        }
    };
    if (!isInHistory) { // the city is not in history
        for (i = 7; i > 0; i--) { // move the list down
            searchHistory[i].textContent = searchHistory[i - 1].textContent;
        }
        searchHistory[0].textContent = input; // save input to the top
    }
};

let geoCode = function (city) { //return geo coordinates by city name
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + secret.openWeatherAPI)
        .then(function (response) {
            if (response.status === 404) { //checks for fetching errors
                //document.location.replace(redirectUrl);
                console.log("err loading location data");
            } else {
                return response.json();
            }
        }).then(function (data) {
            geoData = {
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon,
                state: data[0].state,
                name: data[0].name
            }


            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + geoData.lat + "&lon=" + geoData.lon + "&appid=" + secret.openWeatherAPI)
                .then(function (response) { // returns 6 days weather data
                    if (response.status === 404) { //checks for fetching errors
                        //document.location.replace(redirectUrl);
                        console.log("err loading weather data");
                    } else {
                        return response.json();
                    }
                }).then(function (data) {
                    weatherData = data;

                    console.log(data);

                });

        });

};

let buttonClickHandler = function (event) { //search for the entered city name
    let searchInput = document.querySelector("#searchInput");// get the input search
    let geoData1 = {};

    event.preventDefault();

    manageHistoryInput(searchInput.value); // manage history of requests
    geoCode(searchInput.value); // render weather info

};





userInput.addEventListener('click', buttonClickHandler); // listen to the search button click event
