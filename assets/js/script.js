let userInput = document.querySelector("#btnSearch"); // search button
let searchInput = document.querySelector("#searchInput");// search input
let searchHistory = document.querySelectorAll(".btnHistory"); //  history buttons
let geoData = {}; // geolocation data
let weatherData = {}; // weather data
let storedInput = []; // array of searches stored in a browser


let manageHistoryInput = function (input) {
    let isInHistory = false;

    for (let i = 0; i < 7; i++) { // check if the input is in history
        if (input.toUpperCase() === searchHistory[i].textContent.toUpperCase()) {
            isInHistory = true;
        }
    };
    if (!isInHistory) { // the city is not in history
        for (i = 7; i > 0; i--) { // move the list down
            searchHistory[i].textContent = searchHistory[i - 1].textContent;
            storedInput[i] = searchHistory[i].textContent; // store new history to localStorage
        }
        searchHistory[0].textContent = input; // save input to the top
        storedInput[0] = input; // update local storage
        localStorage.setItem("storedInput", JSON.stringify(storedInput));
    }
};

let geoCode = function (city) { //return geo coordinates by city name
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + secret.openWeatherAPI)
        .then(function (response) {
            if (response.status === 404) { //checks for fetching errors
                //document.location.replace(redirectUrl);
                console.log("err loading location data");
            } else {
                return response.json();
            }
        }).then(function (data) { // assign location data
            if (data.length > 0) { // geolocation returned
                geoData = {
                    country: data[0].country,
                    lat: data[0].lat,
                    lon: data[0].lon,
                    state: data[0].state,
                    name: data[0].name
                }
            } else {
                console.log("invalid city input");
                return;
            }

            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + geoData.lat + "&lon=" + geoData.lon + "&units=metric&appid=" + secret.openWeatherAPI)
                .then(function (response) { // returns 6 days weather data
                    if (response.status === 404) { //checks for fetching errors
                        //document.location.replace(redirectUrl);
                        console.log("err 404: API weather provider network connection");
                    } else {
                        return response.json();
                    }
                }).then(function (data) {
                    if (data.cod === "200") { // onenWeather returns 200 code if ok

                        //take every 8 records as the forecast is 5 days and 40 records - every 3 hour
                        //updating day0 data
                        let day = new Date(data.list[0].dt * 1000); //take date as object
                        document.querySelector("#day0City").textContent = data.city.name + ", " + data.city.country + " (" + day.toLocaleDateString() + ")";
                        document.querySelector("#weatherData0").children[0].textContent = "Temp: " + data.list[0].main.temp + " oC";
                        document.querySelector("#weatherData0").children[1].textContent = "Wind: " + data.list[0].wind.speed + " KPH";
                        document.querySelector("#weatherData0").children[2].textContent = "Humidity: " + data.list[0].main.humidity + " %";
                        document.querySelector(".box4-2").children[0].src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
                        document.querySelector(".box4-2").children[1].textContent = data.list[0].weather[0].description;
                        //updating day1 data
                        day = new Date(data.list[0].dt * 1000);
                        document.querySelector(".box6").children[0].textContent = day.toLocaleDateString();
                        document.querySelector("#weatherData1").children[0].textContent = "Temp: " + data.list[0].main.temp + " oC";
                        document.querySelector("#weatherData1").children[1].textContent = "Wind: " + data.list[0].wind.speed + " KPH";
                        document.querySelector("#weatherData1").children[2].textContent = "Humidity: " + data.list[0].main.humidity + " %";
                        document.querySelector(".box6").children[1].src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
                        //updating day2 data
                        day = new Date(data.list[8].dt * 1000);
                        document.querySelector(".box7").children[0].textContent = day.toLocaleDateString();
                        document.querySelector("#weatherData2").children[0].textContent = "Temp: " + data.list[8].main.temp + " oC";
                        document.querySelector("#weatherData2").children[1].textContent = "Wind: " + data.list[8].wind.speed + " KPH";
                        document.querySelector("#weatherData2").children[2].textContent = "Humidity: " + data.list[8].main.humidity + " %";
                        document.querySelector(".box7").children[1].src = "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png";
                        //updating day3 data
                        day = new Date(data.list[16].dt * 1000);
                        document.querySelector(".box8").children[0].textContent = day.toLocaleDateString();
                        document.querySelector("#weatherData3").children[0].textContent = "Temp: " + data.list[16].main.temp + " oC";
                        document.querySelector("#weatherData3").children[1].textContent = "Wind: " + data.list[16].wind.speed + " KPH";
                        document.querySelector("#weatherData3").children[2].textContent = "Humidity: " + data.list[16].main.humidity + " %";
                        document.querySelector(".box8").children[1].src = "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png";
                        //updating day4 data
                        day = new Date(data.list[24].dt * 1000);
                        document.querySelector(".box9").children[0].textContent = day.toLocaleDateString();
                        document.querySelector("#weatherData4").children[0].textContent = "Temp: " + data.list[24].main.temp + " oC";
                        document.querySelector("#weatherData4").children[1].textContent = "Wind: " + data.list[24].wind.speed + " KPH";
                        document.querySelector("#weatherData4").children[2].textContent = "Humidity: " + data.list[24].main.humidity + " %";
                        document.querySelector(".box8").children[1].src = "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png";
                        //updating day5 data
                        day = new Date(data.list[32].dt * 1000);
                        document.querySelector(".box10").children[0].textContent = day.toLocaleDateString();
                        document.querySelector("#weatherData5").children[0].textContent = "Temp: " + data.list[32].main.temp + " oC";
                        document.querySelector("#weatherData5").children[1].textContent = "Wind: " + data.list[32].wind.speed + " KPH";
                        document.querySelector("#weatherData5").children[2].textContent = "Humidity: " + data.list[32].main.humidity + " %";
                        document.querySelector(".box10").children[1].src = "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png";


                    } else {
                        console.log("err API on getting weather data");
                    }

                });

        });

};

let searchClick = function (event) { //search for the entered city name

    event.preventDefault();

    manageHistoryInput(searchInput.value); // manage history of requests
    geoCode(searchInput.value); // render weather info

};





userInput.addEventListener("click", searchClick); // listen to the search button click event
for (let i = 0; i < 8; i++) { // listen for history buttons click events
    searchHistory[i].addEventListener("click", function (event) { // change input value and call the search function 
        searchInput.value = searchHistory[i].textContent;
        searchClick(event);
    });
};

storedInput = JSON.parse(localStorage.getItem("storedInput"));// history of locations stored in browser
if (storedInput === null) {//nothing in local storage
    for (let i = 0; i < 8; i++) { // fill in the pre-defined values
        storedInput[i] = searchHistory[i].textContent;
    }
} else { // something is stored - restore
    for (let i = 0; i < 8; i++) {
        searchHistory[i].textContent = storedInput[i];
    }
}
