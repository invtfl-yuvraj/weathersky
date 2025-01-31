# Weather Application

A modern weather application built with Vanilla JavaScript and styled using Tailwind CSS. The app fetches weather data using a weather API, includes city search functionality with debouncing to reduce unnecessary API calls, and integrates geolocation to provide real-time weather updates. Additionally, the app features dynamic scrolling and automatic return to the current hour's weather after a few seconds.

## Preview link
    
- https://weathersky.vercel.app/
    

## Features

- **Weather API Integration**: Fetches real-time weather data for any city.
- **City Search with Debouncing**: Optimizes API calls by debouncing the city search input.
- **Geolocation**: Automatically fetches weather data based on the user's current location.
- **Dynamic Hourly Scroll**: Automatically scrolls back to the current hourly weather after a few seconds if the user scrolls to another time.
- **Modern UI with Tailwind CSS**: Clean, and visually appealing design.

## Technologies Used

- **JavaScript**: For the logic and DOM manipulation.
- **Tailwind CSS**: For responsive and modern styling.
- **Weather API**: To fetch weather data.
- **Geolocation API**: To get the user's current location.
- **Debouncing Technique**: To avoid unnecessary calls.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/weather-app.git

2. Open the `index.html` file in your browser.

## Usage

- The weather app automatically detects the user's location and displays weather information for the current city.
- To search for a different city, simply type the city name into the search bar and press enter.
- The app will update the weather data and show the current conditions, hourly forecast, and more.

## Future Improvements

- Add responsiveness for mobile and tablet devices.
- Create the 10days weather data section.
- Add error handling for API requests.
- Implement a feature to save favorite cities.
- Show extended weather data (e.g., weekly forecast).
- Improve performance optimization techniques.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
