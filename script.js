let weather = {
    // saving the API key in weather.apiKey
    "apiKey": "863230eb62c4be916a0c02d94685e9f1",

    // creating a function inside the weather object to fetch the data through OpenWeather's API
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    // function for fetching data from API, saving it into variables and displaying the data as content on the front-end
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");

        // setting the background image according to the searched word
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    // function to fetch the Weather information for the city inputted in the search field
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

// function that makes sure, when the search icon is clicked, the search function runs
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

// function that makes sure that the search can be initiated by hitting the Enter key
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

// the city, which weather will be shown on the load of the page
weather.fetchWeather("Amsterdam");