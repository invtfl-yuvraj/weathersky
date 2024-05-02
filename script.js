const searchBar = document.querySelector("[data-searchBar]");
const searchInput = document.querySelector("[data-searchInput]");
const searchBtn = document.querySelector("[data-searchBtn]");
const searchSuggest = document.querySelector("[data-searchSuggest]");
const locationName = document.querySelector("[data-locationName]");
const locationRegion = document.querySelector("[data-locationRegion]");
const weatherCondition = document.querySelector("[data-weatherCondition]");
const currentTemp = document.querySelector("[data-currentTemp]");
const feelsLike = document.querySelector("[data-feelsLike]");

const APIKEY = "681a519968834de490b44801242804";


async function currentWeather() {
    // Weather api to find the current weather of a particular location

    try {
        let cityName = searchInput.value;

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityName}`);

        const data = await response.json();

        showWeather(data);

        console.log("Weather data -> ", data);
        console.log("Current temperature : ", data.current.temp_c);

    } catch (error) {
        console.log("Error Occured : ", error);
    }
};

function showWeather(data){
    locationName.textContent = data.location.name;
    locationRegion.textContent = `${data.location.region}, ${data.location.country}`;
    weatherCondition.textContent = data.current.condition.text;
    currentTemp.innerHTML = `${Math.round(data.current.temp_c)}&#8451;`;
    feelsLike.innerHTML = `${Math.round(data.current.feelslike_c)}&#8451;`;
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


