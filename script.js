const searchBar = document.querySelector("[data-searchBar]");
const searchInput = document.querySelector("[data-searchInput]");
const clickBtn = document.querySelector("[data-generateBtn]")

const APIKEY = "681a519968834de490b44801242804"


searchBar.addEventListener("click", () => {
    searchInput.focus();
})

async function currentWeather() {
    let cityName = "Farrukhabad";

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityName}`);

    const data = await response.json();

    console.log("Weather data -> ", data);
    console.log("Current temperature : ", data.current.temp_c);
}

// clickBtn.addEventListener("click", () => {
//     currentWeather();
// });


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
}, 500);

searchInput.addEventListener('input', () => {
    handleInput();
});

