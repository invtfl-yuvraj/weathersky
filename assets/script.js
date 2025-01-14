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
const currWeatherState = document.querySelector("[data-currWeatherState]");
const hourlyWeatherDetailed = document.querySelector("[data-hourlyWeatherDetailed]");
const locationNameDetailed = document.querySelector("[data-locationNameDetailed]");
const currentTempDetailed = document.querySelector("[data-currentTempDetailed]");
const currWeatherConditionDetailed = document.querySelector("[data-currWeatherConditionDetailed]");
const sunriseTime = document.querySelector("[data-sunriseTime]");
const sunsetTime = document.querySelector("[data-sunsetTime]");
const moonriseTime = document.querySelector("[data-moonriseTime]");
const moonsetTime = document.querySelector("[data-moonsetTime]");
const airQuality = document.querySelector("[data-airQuality]");
const airQualitySlider = document.querySelector("[data-airQualitySlider]");
const uvIndex = document.querySelector("[data-uvIndex]");
const chanceOfRain = document.querySelector("[data-chanceOfRain]");
const gust = document.querySelector("[data-gust]");
const visibility = document.querySelector("[data-visibility]");
const dewPoint = document.querySelector("[data-dewPoint]");
const windSpeed = document.querySelector("[data-windSpeed]");
const windDegree = document.querySelector("[data-windDegree]");
const windDirection = document.querySelector("[data-windDirection]");
const heatIndex = document.querySelector("[data-heatIndex]");
const windChill = document.querySelector("[data-windChill]");
const detailedSection = document.querySelector("[data-detailedSection]");



const APIKEY = "681a519968834de490b44801242804";

let hourlyCurrHour;

getfromSessionStorage();
if (!locationIcon.classList.contains("hidden")) locationIcon.classList.add("hidden");


function loadingOnHomeScreen(currState) {

    if (currState == "add") {

        mainHomeScreen.classList.remove("grid");
        mainHomeScreen.classList.add("hidden");
        loadingScreen.classList.remove("hidden");
        loadingScreen.classList.add("flex");
        detailedSection.classList.add("hidden");

    }
    else if (currState == "remove") {
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("hidden");
        mainHomeScreen.classList.remove("hidden");
        mainHomeScreen.classList.add("grid");
        detailedSection.classList.remove("hidden");
    }
}

function loadingOnHourlyScreen(currState) {
    if (currState == "add") {

        hourlyWeather.classList.remove("flex");
        hourlyWeather.classList.add("hidden");
        loadingHourlyScreen.classList.remove("hidden");
        loadingHourlyScreen.classList.add("flex");
        detailedSection.classList.add("hidden");

    }
    else if (currState == "remove") {
        loadingHourlyScreen.classList.remove("flex");
        loadingHourlyScreen.classList.add("hidden");
        hourlyWeather.classList.remove("hidden");
        hourlyWeather.classList.add("flex");
        detailedSection.classList.remove("hidden");
    }
}

function grantAccessScreen(currState) {
    if (currState == "add") {

        mainHomeScreen.classList.remove("grid");
        mainHomeScreen.classList.add("hidden");
        grantLocation.classList.remove("hidden");
        grantLocation.classList.add("flex");
        detailedSection.classList.add("hidden");

    }
    else if (currState == "remove") {
        grantLocation.classList.remove("flex");
        grantLocation.classList.add("hidden");
        mainHomeScreen.classList.remove("hidden");
        mainHomeScreen.classList.add("grid");
        detailedSection.classList.remove("hidden");
    }
}



async function currWeather(coordinates) {
    // Weather api to find the current weather of a particular location

    const { lat, lon } = coordinates;

    loadingOnHomeScreen("add");

    try {

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${lat},${lon}&aqi=yes&days=3`);

        const currWeatherdata = await response.json();
        console.log("fetch request using lat, lon successful!!");

        loadingOnHomeScreen("remove");
        showCurrWeather(currWeatherdata);
        showHourlyWeather(currWeatherdata);
        showHourlyWeatherDetailed(currWeatherdata);
        detailedWeather(currWeatherdata);
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

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${cityName}&aqi=yes&days=3`);

        const currWeatherdata = await response.json();
        console.log("fetch request using city name successful!!")

        loadingOnHomeScreen("remove");
        showCurrWeather(currWeatherdata);
        showHourlyWeather(currWeatherdata);
        showHourlyWeatherDetailed(currWeatherdata);
        detailedWeather(currWeatherdata);
        setTimeout(() => {
            showHourlyFocus();
        }, 500);

        console.log("Weather data -> ", currWeatherdata);
        console.log("Current temperature : ", currWeatherdata?.current?.temp_c);

    } catch (error) {
        console.log("Error Occured : ", error);
        alert("Sorry!!, not able to find Weather at this Location");
        loadingOnHomeScreen("remove");
        getfromSessionStorage();
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
    locationNameDetailed.textContent = weatherdata?.location?.name;
    locationRegion.textContent = `${weatherdata?.location?.region}, ${weatherdata?.location?.country}`;
    currWeatherCondition.textContent = weatherdata?.current?.condition?.text;
    currWeatherConditionDetailed.textContent = weatherdata?.current?.condition?.text;
    currentTemp.innerHTML = `${Math.round(weatherdata?.current?.temp_c)}&#8451;`;
    currentTempDetailed.innerHTML = `${Math.round(weatherdata?.current?.temp_c)}&#8451;`;
    feelsLike.innerHTML = `${Math.round(weatherdata?.current?.feelslike_c)}&#8451;`;
    currWindspeed.innerText = weatherdata?.current?.wind_kph;
    currCloudiness.innerText = weatherdata?.current?.cloud;
    currHumidity.innerText = weatherdata?.current?.humidity;
    currentDayLowTemp.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.day?.maxtemp_c)}&#8451;`;
    currentDayHighTemp.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.day?.mintemp_c)}&#8451;`;

    const text = (weatherdata?.current?.condition.text).toLowerCase().trim();
    const isDay = weatherdata?.current?.is_day;
    currWeatherState.src = findWeatherState(text, isDay);
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
            weatherStateImg.src = "";

            const text = (weatherdata?.forecast?.forecastday[0]?.hour[i]?.condition.text).toLowerCase().trim();
            const isDay = weatherdata?.forecast?.forecastday[0]?.hour[i]?.is_day;

            weatherStateImg.src = findWeatherState(text, isDay);
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
    hourlyCurrHour = findHourlyCurrHour(weatherdata);

}

function findHourlyCurrHour(weatherdata) {
    const currentTime = `${weatherdata?.current?.last_updated.split(' ')[1].split(":")[0]}:00`;

    for (let i = 0; i < 24; i++) {
        const hourlyTime = weatherdata?.forecast?.forecastday[0]?.hour[i]?.time.split(' ')[1];
        // console.log(hourlyTime);
        // console.log(currentTime);

        if (hourlyTime == currentTime) {

            const targetDiv = i;
            return targetDiv;
        }
    }
}


function findWeatherState(text, isDay) {

    let imagePath = "";

    if (text == "patchy light rain" ||
        text == "patchy rain nearby" ||
        text == "patchy rain possible" ||
        text == "patchy light drizzle" ||
        text == "light drizzle" ||
        text == "moderate rain at times") {
        if (isDay == 1) {
            imagePath = "./assets/weather_states/Drizzle_day.png";
        }
        else {
            imagePath = "./assets/weather_states/Drizzle_Night.png";
        }
    }
    else if (text == "partly cloudy") {
        if (isDay == 1) {
            imagePath = "./assets/weather_states/Mostly_clear.png";
        }
        else {
            imagePath = "./assets/weather_states/Mostly_Clear_Night_img.png";
        }
    }
    else if (text == "clear") {
        imagePath = "./assets/weather_states/Clear.png";
    }
    else if (text == "sunny") {
        imagePath = "./assets/weather_states/Sunny.png";
    }
    else if (text == "light rain shower" ||
        text == "light rain" ||
        text == "patchy freezing drizzle possible" ||
        text == "freezing drizzle" ||
        text == "heavy freezing drizzle" ||
        text == "moderate rain" ||
        text == "light freezing rain") {
        imagePath = "./assets/weather_states/Light_Raining.png";
    }
    else if (text == "heavy rain" ||
        text == "moderate or heavy rain shower" ||
        text == "torrential rain shower" ||
        text == "heavy rain at times" ||
        text == "moderate or heavy freezing rain") {
        imagePath = "./assets/weather_states/Heavy_Raining.png";
    }
    else if (text == "overcast" ||
        text == "Cloudy") {
        imagePath = "./assets/weather_states/All_Cloudy.png";
    }
    else if (text == "patchy light rain in area with thunder" ||
        text == "patchy light rain with thunder" ||
        text == "patchy light snow with thunder") {
        imagePath = "./assets/weather_states/Thunderstorm.png";
    }
    else if (text == "thundery outbreaks possible" ||
        text == "thundery outbreaks in nearby" ||
        text == "moderate or heavy rain with thunder" ||
        text == "moderate or heavy snow with thunder") {
        imagePath = "./assets/weather_states/Heavy_Thunderstorm.png";
    }
    else if (text == "fog" ||
        text == "mist" ||
        text == "freezing fog") {
        imagePath = "./assets/weather_states/Windy.png";
    }
    else if (text == "patchy snow possible" ||
        text == "patchy sleet possible" ||
        text == "blowing snow" ||
        text == "blizzard" ||
        text == "light sleet" ||
        text == "moderate or heavy sleet" ||
        text == "patchy light snow" ||
        text == "light snow" ||
        text == "patchy moderate snow" ||
        text == "moderate snow" ||
        text == "patchy heavy snow" ||
        text == "heavy snow" ||
        text == "ice pellets" ||
        text == "light sleet showers" ||
        text == "moderate or heavy sleet showers" ||
        text == "light snow showers" ||
        text == "moderate or heavy snow showers" ||
        text == "light showers of ice pellets" ||
        text == "moderate or heavy showers of ice pellets") {
        imagePath = "./assets/weather_states/Snow.png";
    }
    else {
        imagePath = "./assets/weather_states/All_Cloudy.png";
    }

    return imagePath;

}

function showHourlyFocus() {
    let targetDivNum = `.hour-${hourlyCurrHour}`;

    const targetDiv = document.querySelectorAll(targetDivNum);

    for (i = 0; i < targetDiv.length; i++) {
        targetDiv[i].classList.remove("bg-opacity-20");
        targetDiv[i].classList.add("customHourlyAnimation");

        // Calculate the position of the target div relative to the main container

        let containerRect;
        if (i == 0) {
            containerRect = hourlyWeather.getBoundingClientRect();
        }
        else {
            containerRect = hourlyWeatherDetailed.getBoundingClientRect();
        }

        const targetRect = targetDiv[i].getBoundingClientRect();

        // Check if the target div is already in view
        if (!isElementInViewport(targetRect, containerRect)) {

            const scrollTop = targetRect.top - containerRect.top + hourlyWeather.scrollTop - (containerRect.height - targetRect.height) / 2;
            const scrollMid = targetRect.left - containerRect.left + hourlyWeatherDetailed.scrollLeft - (containerRect.width - targetRect.width) / 2;

            // Scroll the main container to the calculated position
            hourlyWeather.scrollTo({ top: scrollTop, behavior: 'smooth' });
            hourlyWeatherDetailed.scrollTo({ left: scrollMid, behavior: 'smooth' });
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

function getLocationWithTimeout(timeout = 10000) {
    loadingOnHomeScreen("add");
    return new Promise((resolve, reject) => {

        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        navigator.geolocation.getCurrentPosition(
            position => {
                clearTimeout(timer); // Clear the timeout if the position is obtained
                resolve(position);
            },
            error => {
                clearTimeout(timer); // Clear the timeout if an error occurs
                reject(error);
            }
        );

    });
}


// function getLocation() {
//     if (navigator.geolocation) {
//         loadingOnHomeScreen("add");
//         navigator.geolocation.getCurrentPosition(showPosition);

//     }
//     else {
//         alert(`Sorry, not able get your Location,
//         Search for your City!!!`);
//         loadingOnHomeScreen("remove");
//     }
// }

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
        alert("Not able to find this location");
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
}, 800);


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
            newDiv.classList.add("p-4", "text-white", "hover:bg-blue-900", "cursor-pointer");
            if (i == numOFSuggestions - 1) {
                newDiv.classList.add("rounded-bl-xl", "rounded-br-xl");
            }
            newDiv.innerText = `${data[i].name}, ${data[i].region}, ${data[i].country}`;
            searchSuggest.appendChild(newDiv);
        }

        if (numOFSuggestions == 0) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("p-4", "text-white", "hover:bg-blue-900", "cursor-pointer");
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

function searchBtnClick() {

    if (searchInput.value.length > 2) {

        grantAccessScreen("remove");
        cityWeather(searchInput.value);
        showSearchSuggestions(-1, []);
        searchInput.value = "";

    }
}

searchBtn.addEventListener("click", searchBtnClick());
searchInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        searchBtnClick();
    }
})

searchSuggest.addEventListener("click", (event) => {
    // console.log(event.target.textContent);
    searchInput.value = event.target.textContent;
    searchBtnClick()
});

grantAccessBtn.addEventListener('click', () => {

    grantAccessScreen("remove");
    // getLocation();

    getLocationWithTimeout(8000)
        .then(position => {
            console.log('Position obtained:', position);
            navigator.geolocation.getCurrentPosition(showPosition);
        })
        .catch(err => {
            if (err.message === 'Request timed out') {
                alert(`Sorry, not able get your Location,
            Search for your City!!!`);
            } else {
                console.error('Geolocation error:', err);
            }
            loadingOnHomeScreen("remove");
            grantAccessScreen("add");
        });

    if (!locationIcon.classList.contains("hidden")) locationIcon.classList.add("hidden");

});


hourlyWeather.addEventListener("scroll", () => {
    handleScroll();
});

locationIcon.addEventListener("click", () => {
    getfromSessionStorage();
    if (!locationIcon.classList.contains("hidden")) locationIcon.classList.add("hidden");
});


//  next section

function showHourlyWeatherDetailed(weatherdata) {

    while (hourlyWeatherDetailed.firstChild) {
        hourlyWeatherDetailed.removeChild(hourlyWeatherDetailed.firstChild);
    }

    loadingOnHourlyScreen("add");


    for (let i = 0; i < 24; i++) {

        const hourlyDiv = document.createElement("div");
        hourlyDiv.classList.add("flex", "h-full", "items-center", "w-60", "bg-opacity-20", "bg-lightBlue", "rounded-xl", "shadow-[inset_-4px_-4px_8.0px_0.0px_rgba(0,0,0,0.38)]", `hour-${i}`);

        try {

            // creating a div for time data and a para in it
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("text-sm", "text-center");

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



            // creating a div for temperature data and a para in it
            const tempDiv = document.createElement("div");
            tempDiv.classList.add("w-16", "text-center", "text-semibold");

            const tempPara = document.createElement("p");
            tempPara.innerHTML = `${Math.round(weatherdata?.forecast?.forecastday[0]?.hour[i]?.temp_c)}<span>&#8451;</span>`;
            tempDiv.appendChild(tempPara);


            // creating a img to show weather state
            const weatherStateImg = document.createElement("img");
            weatherStateImg.classList.add("w-16", "aspect-square");
            weatherStateImg.src = "";

            const text = (weatherdata?.forecast?.forecastday[0]?.hour[i]?.condition.text).toLowerCase().trim();
            const isDay = weatherdata?.forecast?.forecastday[0]?.hour[i]?.is_day;

            weatherStateImg.src = findWeatherState(text, isDay);


            // adding all above to main div
            hourlyDiv.appendChild(weatherStateImg);

            const timeAndTempDiv = document.createElement("div");
            timeAndTempDiv.classList.add("flex", "flex-col", "bg-transparent", "rounded-xl", "w-36", "h-full", "justify-center", "items-center", "pr-2")

            timeAndTempDiv.appendChild(timeDiv);
            timeAndTempDiv.appendChild(tempDiv);
            hourlyDiv.appendChild(timeAndTempDiv);


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
        hourlyWeatherDetailed.appendChild(hourlyDiv);
    }

    loadingOnHourlyScreen("remove");
    // hourlyCurrHour = findHourlyCurrHour(weatherdata);

}

hourlyWeatherDetailed.addEventListener("scroll", () => {
    handleScroll();
    console.log("scrollllllllled")
});

function airQualityFind(weatherdata) {

    switch (weatherdata?.current?.air_quality?.['us-epa-index']) {
        case 1:
            return "Good";
        case 2:
            return "Moderate";
        case 3:
            return "Quite Unhealthy";
        case 4:
            return "Unhealthy";
        case 5:
            return "Very Unhealthy";
        case 6:
            return "Hazardous";
        default:
            return "Not available"
    }

}

function detailedWeather(weatherdata) {
    sunriseTime.textContent = weatherdata?.forecast?.forecastday[0]?.astro?.sunrise;
    sunsetTime.textContent = weatherdata?.forecast?.forecastday[0]?.astro?.sunset;
    moonriseTime.textContent = weatherdata?.forecast?.forecastday[0]?.astro?.moonrise;
    moonsetTime.textContent = weatherdata?.forecast?.forecastday[0]?.astro?.moonset;
    airQuality.textContent = airQualityFind(weatherdata);
    airQualitySlider.value = weatherdata?.current?.air_quality?.['us-epa-index'];
    uvIndex.textContent = weatherdata?.current?.uv;
    chanceOfRain.textContent = weatherdata?.current?.cloud;
    gust.textContent =  weatherdata?.current?.gust_kph;
    visibility.textContent =  weatherdata?.current?.vis_km;
    dewPoint.textContent =  weatherdata?.current?.dewpoint_c;
    windSpeed.textContent =  weatherdata?.current?.wind_kph;
    windDegree.textContent =  weatherdata?.current?.wind_degree;
    windDirection.textContent =  weatherdata?.current?.wind_dir;
    heatIndex.textContent =  weatherdata?.current?.heatindex_c;
    windChill.textContent =  weatherdata?.current?.windchill_c;

}

