// Weather App: 

var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
//Find a way to slip these into the functions themselves? Less global variables
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city){
    var apiKey = "8b59dbc3208e6ab628c932c0dbe224fb"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value= " ";
    } else {
        alert("Please enter a city!")
    }
    saveSearch();
    pastSearchButtonEl(city);
}

// Function: DoResults
// 1. Call function AddSearchTermtoResults
// 2. Call function AddTodaysResults
// 3. Call function Add5DayResults
// 4. Clear textbox

var displayWeather = function(weather, searchCity){
    weatherContainerEl.textContent=" ";
    citySearchInputEl.textContent=searchCity;
    console.log(weather);

    //Create Date element
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);

    //creating image element 
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    citySearchInputEl.appendChild(weatherIcon);

    //create a span to hold temp data
    var tempEl = document.createElement("span")
    tempEl.textContent= "Temperature: " + weather.main.temp + " °F";
    tempEl.classList = "list-group-item"

    //create a span to hold humidity data 
    var humidityEl = document.createElement("span")
    humidityEl.textContent= "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item";

    //create a span to hold wind index
    var windEl = document.createElement("span")
    windEl.textContent= "Wind Speed: " + weather.wind.speed + "MPH";
    windEl.classList = "list-group-item";

      //append to container
   weatherContainerEl.appendChild(temperatureEl);

   //append to container
   weatherContainerEl.appendChild(humidityEl);

   //append to container
   weatherContainerEl.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey="8b59dbc3208e6ab628c932c0dbe224fb"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
            console.log(data);
        });
    });
    console.log(lon);
    console.log(lat);
}


// //Recent Searches
// Function: AddSearchTermtoResults
// //Parameter in Search Term
// 1. Add a button to the screen with a data attribute that stores the search terms

// Function: Event Listener
// 1. Read the data attribute to get the search term. 
// 2. Call search function 

// //Results Today
// Function: AddToday'sResults

// //Results 5Days
// Function: Add 5day results

// 1. 

//Results today

//Results 5 Days