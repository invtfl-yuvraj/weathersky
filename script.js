const searchBar = document.querySelector("[data-searchBar]");
const searchInput = document.querySelector("[data-searchInput]");
const searchBtn = document.querySelector("[data-searchBtn]");
const searchSuggest = document.querySelector("[data-searchSuggest]");

const APIKEY = "681a519968834de490b44801242804"


searchBar.addEventListener("click", () => {
    searchInput.focus();
})

async function currentWeather() {
    let cityName = searchInput.value;

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityName}`);

    const data = await response.json();

    console.log("Weather data -> ", data);
    console.log("Current temperature : ", data.current.temp_c);
}

searchBtn.addEventListener("click", () => {
    currentWeather();
});


function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout); // resetting timeout if user clicks again before delay time complete
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


const handleInput = debounce(() => {
    console.log('Input value:', searchInput.value);
    searchSuggestions();

}, 500);

searchInput.addEventListener('input', () => {
    handleInput();
    showSearchSuggestions(-1, []);
});


async function searchSuggestions() {

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
}


