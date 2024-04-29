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

clickBtn.addEventListener("click", () => {
    currentWeather();
});



