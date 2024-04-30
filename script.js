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

function showSearchSuggestions(numOFSuggestions, data) {

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
    
}
