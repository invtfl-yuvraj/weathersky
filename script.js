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
const loadingHourlyScreen = document.querySelector("[data-loadingHourlyScreen]");
const mainHomeScreen = document.querySelector("[data-mainHomeScreen]");
const currentDayLowTemp = document.querySelector("[data-currentDayLowTemp]");
const currentDayHighTemp = document.querySelector("[data-currentDayHighTemp]");
const grantLocation = document.querySelector("[data-grantLocation]");
const grantAccessBtn = document.querySelector("[data-grantAccessBtn]");
const hourlyWeather = document.querySelector("[data-hourlyWeather]");
const locationIcon = document.querySelector("[data-locationIcon]");


const APIKEY = "681a519968834de490b44801242804";

let hourlyTargetdivNumber;

getfromSessionStorage();
if (!locationIcon.classList.contains("hidden")) locationIcon.classList.add("hidden");


function loadingOnHomeScreen(currState) {

    if (currState == "add") {

        mainHomeScreen.classList.remove("grid");
        mainHomeScreen.classList.add("hidden");
        loadingScreen.classList.remove("hidden");
        loadingScreen.classList.add("flex");

    }
    else if (currState == "remove") {
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("hidden");
        mainHomeScreen.classList.remove("hidden");
        mainHomeScreen.classList.add("grid");
    }
}

function loadingOnHourlyScreen(currState) {
    if (currState == "add") {

        hourlyWeather.classList.remove("flex");
        hourlyWeather.classList.add("hidden");
        loadingHourlyScreen.classList.remove("hidden");
        loadingHourlyScreen.classList.add("flex");

    }
    else if (currState == "remove") {
        loadingHourlyScreen.classList.remove("flex");
        loadingHourlyScreen.classList.add("hidden");
        hourlyWeather.classList.remove("hidden");
        hourlyWeather.classList.add("flex");
    }
}

function grantAccessScreen(currState) {
    if (currState == "add") {

        mainHomeScreen.classList.remove("grid");
        mainHomeScreen.classList.add("hidden");
        grantLocation.classList.remove("hidden");
        grantLocation.classList.add("flex");

    }
    else if (currState == "remove") {
        grantLocation.classList.remove("flex");
        grantLocation.classList.add("hidden");
        mainHomeScreen.classList.remove("hidden");
        mainHomeScreen.classList.add("grid");
    }
}

function findWeatherState(weatherstate) {

    let imagePath = "";
    text = text.trim();

    (text, isDay) => {
        if (text == "Patchy light rain" || "Patchy rain nearby" || "Patchy rain possible" || "Patchy light drizzle" || "Light drizzle" || "Moderate rain at times" || ) {
            if (isDay) {
                imagePath = "./assets/weather_states/Drizzle_day.png";
            }
            else {
                imagePath = "./assets/weather_states/Drizzle_Night.png";
            }
        }
        else if (tect == "Partly Cloudy") {
            if (isDay) {
                imagePath = "./assets/weather_states/Mostly_Clear_Night_img.png";
            }
            else {
                imagePath = "./assets/weather_states/Mostly_clear.png";
            }
        }
        else if (text == "Clear") {
            imagePath = "./assets/weather_states/Clear.png";
        }
        else if (text == "Sunny") {
            imagePath = "./assets/weather_states/Sunny.png";
        }
        else if (text == "Light rain shower" || "Light rain" || "Mist" || "Patchy freezing drizzle possible" || "Freezing drizzle" || "Heavy freezing drizzle" || "Moderate rain" || "Light freezing rain") {
            imagePath = "./assets/weather_states/Light_Raining.png";
        }
        else if (text == "Heavy rain" || "Moderate or heavy rain shower" || "Torrential rain shower" || "Heavy rain at times" || "Moderate or heavy freezing rain") {
            imagePath = "./assets/weather_states/Heavy_Raining.png";
        }
        else if (text == "Overcast" || "Cloudy") {
            imagePath = "./assets/weather_states/All_Cloudy.png";
        }
        else if (text == "Patchy light rain in area with thunder" || "Patchy light rain with thunder" || "Patchy light snow with thunder") {
            imagePath = "./assets/weather_states/Thunderstorm.png";
        }
        else if (text == "Thundery outbreaks possible" || "Thundery outbreaks in nearby" || "Moderate or heavy rain with thunder" || "Moderate or heavy snow with thunder"){
            imagePath = "./assets/weather_states/Heavy_Thunderstorm.png";
        }
        else if (text == "Fog" || "Freezing fog") {
            imagePath = "./assets/weather_states/Windy.png";
        }
        else if (text == "Patchy snow possible" || "Patchy sleet possible" || "Blowing snow" || "Blizzard" || "Light sleet" || "Moderate or heavy sleet" || "Patchy light snow" || "Light snow" || "Patchy moderate snow" || "Moderate snow" || "Patchy heavy snow" || "Heavy snow" || "Ice pellets" || "Light sleet showers" || "Moderate or heavy sleet showers" || "Light snow showers" || "Moderate or heavy snow showers" || "Light showers of ice pellets" || "Moderate or heavy showers of ice pellets"){
            imagePath = "./assets/weather_states/Snow.png";
        }
    }


}


async function currWeather(coordinates) {
    // Weather api to find the current weather of a particular location

    const { lat, lon } = coordinates;

    loadingOnHomeScreen("add");

    try {

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${lat},${lon}`);

        const currWeatherdata = await response.json();

        loadingOnHomeScreen("remove");
        showCurrWeather(currWeatherdata);
        showHourlyWeather(currWeatherdata);
        setTimeout(() => {
            showHourlyFocus();
        }, 500);

        console.log("Weather data -> ", currWeatherdata);
        console.log("Current temperature : ", currWeatherdata?.current?.temp_c);

    } catch (error) {
        console.log("Error Occured : ", error);
        alert("Sorry!!, not able to get Weather");
        loadingOnHomeScreen("remove");
    }
};

async function cityWeather(cityName) {

    loadingOnHomeScreen("add");

    try {

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${cityName}`);

        const currWeatherdata = await response.json();

        loadingOnHomeScreen("remove");
        showCurrWeather(currWeatherdata);
        showHourlyWeather(currWeatherdata);
        setTimeout(() => {
            showHourlyFocus();
        }, 500);

        console.log("Weather data -> ", currWeatherdata);
        console.log("Current temperature : ", currWeatherdata?.current?.temp_c);

    } catch (error) {
        console.log("Error Occured : ", error);
        alert("Sorry!!, not able to get Weather");
        loadingOnHomeScreen("remove");
    }

    if (locationIcon.classList.contains("hidden")) locationIcon.classList.remove("hidden");
}

function showCurrWeather(weatherdata) {
    if (weatherdata?.location?.name.length > 10) {
        locationName.classList.remove("text-7xl");
        locationName.classList.add("text-5xl");
    }
    else if (weatherdata?.location?.name.length > 15) {
        locationName.classList.remove("text-5xl");
        locationName.classList.add("text-2xl");
    }
    else {
        if (locationName.classList.contains("text-5xl")) locationName.classList.remove("text-5xl");
        if (locationName.classList.contains("text-2xl")) locationName.classList.remove("text-2xl");
        if (!locationName.classList.contains("text-7xl")) locationName.classList.add("text-7xl");
    }

    if (weatherdata?.location?.region.length + weatherdata?.location?.country.length > 30) {
        locationRegion.classList.remove("text-2xl");
        locationRegion.classList.add("text-xl");
    }
    else if (weatherdata?.location?.region.length + weatherdata?.location?.country.length > 40) {
        locationRegion.classList.remove("text-xl");
        locationRegion.classList.add("text-lg");
    }
    else {
        if (locationRegion.classList.contains("text-xl")) locationRegion.classList.remove("text-xl");
        if (locationRegion.classList.contains("text-lg")) locationRegion.classList.remove("text-lg");
        if (!locationRegion.classList.contains("text-2xl")) locationRegion.classList.add("text-2xl");
    }

    locationName.textContent = weatherdata?.location?.name;
    locationRegion.textContent = `${weatherdata?.location?.region}, ${weatherdata?.location?.country}`;
    currWeatherCondition.textContent = weatherdata?.current?.condition?.text;
    currentTemp.innerHTML = `${Math.round(weatherdata?.current?.temp_c)}&#8451;`;
    feelsLike.innerHTML = `${Math.round(weatherdata?.current?.feelslike_c)}&#8451;`;
    currWindspeed.innerText = weatherdata?.current?.wind_kph;
    currCloudiness.innerText = weatherdata?.current?.cloud;
    currHumidity.innerText = weatherdata?.current?.humidity;
    currentDayLowTemp.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.day?.maxtemp_c)}&#8451;`;
    currentDayHighTemp.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.day?.mintemp_c)}&#8451;`;
}

function showHourlyWeather(weatherdata) {

    while (hourlyWeather.firstChild) {
        hourlyWeather.removeChild(hourlyWeather.firstChild);
    }

    loadingOnHourlyScreen("add");


    for (let i = 0; i < 24; i++) {

        const hourlyDiv = document.createElement("div");
        hourlyDiv.classList.add("text-lg", "flex", "justify-between", "h-20", "items-center", "w-full", "bg-lightBlue", "bg-opacity-20", "rounded-xl", "px-8", "shadow-[inset_-4px_-4px_8.0px_0.0px_rgba(0,0,0,0.38)]", `hour-${i}`);

        try {

            // creating a div for time data and a para in it
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("w-24", "text-center");

            const timePara = document.createElement("p");
            let hourlyTime = weatherdata?.forecast?.forecastday[0]?.hour[i]?.time.split(' ')[1];
            if (hourlyTime.split(":")[0] < 12) {
                timePara.innerText = `${hourlyTime}AM`;
            }
            else if (hourlyTime.split(":")[0] == 12) {
                timePara.innerText = `${hourlyTime}PM`;
            }
            else {
                const afterNoonTime = () => {

                    if (hourlyTime.split(":")[0] - 12 < 10) {
                        return `0${hourlyTime.split(":")[0] - 12}:00PM`;
                    }
                    else {
                        return `${hourlyTime.split(":")[0] - 12}:00PM`;
                    }
                }
                timePara.innerText = afterNoonTime();
            }
            timeDiv.appendChild(timePara);
            hourlyDiv.appendChild(timeDiv);


            // creating a div for temperature data and a para in it
            const tempDiv = document.createElement("div");
            tempDiv.classList.add("w-16", "text-center");

            const tempPara = document.createElement("p");
            tempPara.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.hour[i]?.temp_c)}<span>&#8451;</span>`;
            tempDiv.appendChild(tempPara);
            hourlyDiv.appendChild(tempDiv);


            // creating a div for cloudiness data and a para in it
            const cloudinessDiv = document.createElement("div");
            cloudinessDiv.classList.add("w-16", "text-center");

            const cloudinessPara = document.createElement("p");
            cloudinessPara.innerText = `${weatherdata?.forecast?.forecastday[0]?.hour[i]?.cloud}%`;
            cloudinessDiv.appendChild(cloudinessPara);
            hourlyDiv.appendChild(cloudinessDiv);


            // creating a img to show weather state
            const weatherStateImg = document.createElement("img");
            weatherStateImg.classList.add("w-16", "aspect-square");
            weatherStateImg.src = "./assets/weather_states/Mostly Clear.png";
            hourlyDiv.appendChild(weatherStateImg);


        } catch (error) {
            const hourlyError = document.createElement("p");
            hourlyError.innerText = "Something went wrong..";
            hourlyError.classList.add("py-4");
            hourlyDiv.appendChild(hourlyError);
            hourlyDiv.classList.remove("justify-between");
            hourlyDiv.classList.add("justify-center");

            console.log("Error in hourly data input : ", error);
        }

        // adding all hours data one by one
        hourlyWeather.appendChild(hourlyDiv);
    }

    loadingOnHourlyScreen("remove");
    hourlyTargetdivNumber = hourlyTargetDivNum(weatherdata);

}

function hourlyTargetDivNum(weatherdata) {
    const currentTime = `${weatherdata?.current?.last_updated.split(' ')[1].split(":")[0]}:00`;

    for (let i = 0; i < 24; i++) {
        const hourlyTime = weatherdata?.forecast?.forecastday[0]?.hour[i]?.time.split(' ')[1];
        console.log(hourlyTime);
        console.log(currentTime);

        if (hourlyTime == currentTime) {

            const targetDiv = `.hour-${i}`;
            return targetDiv;
        }
    }
}

function showHourlyFocus() {
    console.log(hourlyTargetdivNumber);

    const targetDiv = document.querySelector(hourlyTargetdivNumber);
    targetDiv.classList.remove("bg-opacity-20");
    targetDiv.classList.add("customHourlyAnimation");

    // Calculate the position of the target div relative to the main container
    const containerRect = hourlyWeather.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();


    // Check if the target div is already in view
    if (!isElementInViewport(targetRect, containerRect)) {

        const scrollTop = targetRect.top - containerRect.top + hourlyWeather.scrollTop - (containerRect.height - targetRect.height) / 2;

        // Scroll the main container to the calculated position
        hourlyWeather.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }

    function isElementInViewport(targetRect, containerRect) {
        return (
            targetRect.top >= containerRect.top &&
            targetRect.left >= containerRect.left &&
            targetRect.bottom <= containerRect.bottom &&
            targetRect.right <= containerRect.right
        );
    }
}


function getfromSessionStorage() {

    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if (!localCoordinates) {
        grantAccessScreen("add");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        currWeather(coordinates);
    }

}


function getLocation() {
    if (navigator.geolocation) {
        loadingOnHomeScreen("add");
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else {
        alert(`Sorry, not able get your Location,
        Search for your City!!!`);
        loadingOnHomeScreen("remove");
    }
}

function showPosition(position) {
    loadingOnHomeScreen("remove");

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    currWeather(userCoordinates);
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

const handleScroll = debounce(() => {
    showHourlyFocus();
    console.log('Input value:', searchInput.value);
}, 3000);


searchInput.addEventListener('input', () => {
    showSearchSuggestions(-1, []);
    handleInput();
});


searchBar.addEventListener("click", () => {
    searchInput.focus();
});


searchBtn.addEventListener("click", () => {

    if (searchInput.value.length > 2) {

        grantAccessScreen("remove");
        cityWeather(searchInput.value);
        showSearchSuggestions(-1, []);
        searchInput.value = "";

    }
});


grantAccessBtn.addEventListener('click', () => {

    grantAccessScreen("remove");
    getLocation();

});


hourlyWeather.addEventListener("scroll", () => {
    handleScroll();
});

locationIcon.addEventListener("click", () => {
    getfromSessionStorage();
    if (!locationIcon.classList.contains("hidden")) locationIcon.classList.add("hidden");
});
