const searchBar = document.querySelector("[data-searchBar]");
const searchInput = document.querySelector("[data-searchInput]");
const searchBtn = document.querySelector("[data-searchBtn]");
const searchSuggest = document.querySelector("[data-searchSuggest]");
const locationName = document.querySelector("[data-locationName]");
const locationRegion = document.querySelector("[data-locationRegion]");
const currWeatherCondition = document.querySelector("[data-currWeatherCondition]");
const currentTemp = document.querySelector("[data-currentTemp]");
const feelsLike = document.querySelector("[data-feelsLike]");
const currWindspeed = document.querySelector("[data-currWindspeed]");
const currCloudiness = document.querySelector("[data-currCloudiness]");
const currHumidity = document.querySelector("[data-currHumidity]");
const loadingScreen = document.querySelector("[data-loadingScreen]");
const mainHomeScreen = document.querySelector("[data-mainHomeScreen]");


const APIKEY = "681a519968834de490b44801242804";


function loaddingOnHomeScreen(currState) {

    if (currState == "add"){

        mainHomeScreen.classList.remove("grid");
        mainHomeScreen.classList.add("hidden");
        loadingScreen.classList.remove("hidden");
        loadingScreen.classList.add("flex");
        
    }
    else if (currState == "remove"){
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("hidden");
        mainHomeScreen.classList.remove("hidden");
        mainHomeScreen.classList.add("grid");
    }
}


async function currentWeather(coordinates) {
    // Weather api to find the current weather of a particular location

    const { lat, lon } = coordinates;

    loaddingOnHomeScreen("add");

    try {

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${lat},${lon}`);

        const currWeatherdata = await response.json();

        loaddingOnHomeScreen("remove");
        showWeather(currWeatherdata);

        console.log("Weather data -> ", currWeatherdata);
        console.log("Current temperature : ", currWeatherdata?.current?.temp_c);

    } catch (error) {
        console.log("Error Occured : ", error);
        alert("Sorry!!, not able to get Weather");
        loaddingOnHomeScreen("remove");
    }
};

function showWeather(weatherdata) {
    if (weatherdata?.location?.name.length > 10) {
        locationName.classList.remove("text-7xl");
        locationName.classList.add("text-5xl");
    }
    else if (weatherdata?.location?.name.length > 15) {
        locationName.classList.remove("text-5xl");
        locationName.classList.add("text-2xl");
    }

    if (weatherdata?.location?.region.length + weatherdata?.location?.country.length > 30) {
        locationRegion.classList.remove("text-2xl");
        locationRegion.classList.add("text-xl");
    }
    else if (weatherdata?.location?.region.length + weatherdata?.location?.country.length > 40) {
        locationRegion.classList.remove("text-xl");
        locationRegion.classList.add("text-lg");
    }

    locationName.textContent = weatherdata?.location?.name;
    locationRegion.textContent = `${weatherdata?.location?.region}, ${weatherdata?.location?.country}`;
    currWeatherCondition.textContent = weatherdata?.current?.condition?.text;
    currentTemp.innerHTML = `${Math.round(weatherdata?.current?.temp_c)}&#8451;`;
    feelsLike.innerHTML = `${Math.round(weatherdata?.current?.feelslike_c)}&#8451;`;
    currWindspeed.innerText = weatherdata?.current?.wind_kph;
    currCloudiness.innerText = weatherdata?.current?.cloud;
    currHumidity.innerText = weatherdata?.current?.humidity;
}

function getLocation() {
    if (navigator.geolocation) {
        loaddingOnHomeScreen("add");
        navigator.geolocation.getCurrentPosition(showPosition);
        
    }
    else {
        alert(`Sorry, not able get your Location,
        Search for your City!!!`);
        loaddingOnHomeScreen("remove");
    }
}

function showPosition(position) {

    loaddingOnHomeScreen("remove");

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    currentWeather(userCoordinates);
}


async function searchSuggestions() {
    // Location suggestion api to suggest city names only with few starting letters as input

    try {
        let currentText = searchInput.value;

        if (currentText.length > 2) {
            const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${APIKEY}&q=${currentText}`);
            const data = await response.json();

            showSearchSuggestions(data.length, data);
            console.log(data);
        }
        else {
            showSearchSuggestions(0, []);
        }

    } catch (error) {
        console.log("Error Occured : ", error);
    }
};


function debounce(func, delay) {
    // using deboucing to add delay or hold utill users finish typing...

    let timeout;
    return (...args) => {
        clearTimeout(timeout); // resetting timeout if user clicks again before delay time complete
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const handleInput = debounce(() => {
    searchSuggestions();
    console.log('Input value:', searchInput.value);
}, 500);


function showSearchSuggestions(numOFSuggestions, data) {

    // numOfSuggestions values  : 
    // -1 : reset to default state
    // 0 : no data available
    // >2 : go ahead....

    if (searchInput.value != "" && numOFSuggestions != -1) {

        searchBar.classList.remove("rounded-xl", "bg-opacity-50");
        searchBar.classList.add("rounded-tl-xl", "rounded-tr-xl");

        // addding new divs

        for (let i = 0; i < numOFSuggestions; i++) {

            const newDiv = document.createElement("div");
            newDiv.classList.add("p-4", "text-white", "hover:bg-blue-900");
            if (i == numOFSuggestions - 1) {
                newDiv.classList.add("rounded-bl-xl", "rounded-br-xl");
            }
            newDiv.innerText = `${data[i].name}, ${data[i].region}, ${data[i].country}`;
            searchSuggest.appendChild(newDiv);
        }

        if (numOFSuggestions == 0) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("p-4", "text-white", "hover:bg-blue-900");
            newDiv.classList.add("rounded-bl-xl", "rounded-br-xl");
            newDiv.innerText = `No city found!!`;
            searchSuggest.appendChild(newDiv);
        }
    }
    else {
        searchBar.classList.remove("rounded-tl-xl", "rounded-tr-xl");
        searchBar.classList.add("rounded-xl", "bg-opacity-50");

        while (searchSuggest.firstChild) {
            searchSuggest.removeChild(searchSuggest.firstChild);
        }
    }
};


searchInput.addEventListener('input', () => {
    handleInput();
    showSearchSuggestions(-1, []);
});


searchBar.addEventListener("click", () => {
    searchInput.focus();
});


searchBtn.addEventListener("click", () => {

    if (searchInput.value.length > 2) {

        currentWeather();
        showSearchSuggestions(-1, []);
        searchInput.value = "";

    }
});


