# Weather App

A simple, responsive weather application for Zimbabwean cities.  
Users can search for weather by city name, view weather icons, humidity, wind speed, and easily navigate between the main menu and search page.

## Features

- Search weather by city name
- Displays temperature, condition, humidity, wind speed, and weather icon
- Responsive design for mobile and desktop
- Recent searches for quick access
- Auto-suggest city names as you type
- Error handling for invalid cities and network issues
- Easy navigation between menu and weather search

## Getting Started

1. **Clone or download this repository.**
2. **Add your OpenWeatherMap API key**  
   Edit `script.js` and replace the value of `apiKey` with your own key.

3. **Add your weather app icon**  
   Place your icon file (e.g., `icon.png`) in the project folder and update the `<link rel="icon">` in `index.html` if needed.

4. **Run the app locally:**  
   Open a terminal in the project folder and run:
   npx serve .
   or
   python -m http.server
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click **Check Weather** on the menu page.
- Enter a city name and click **Get Weather**.
- View weather details and recent searches.
- Click **← Back** to return to the menu.

## Customization

- **Cities:** Edit the `cities` array in `script.js` to add/remove cities.
- **Styling:** Modify `style.css` for colors, fonts, and layout.
- **Icon:** Replace `icon.png` or update the `<img>` and `<link rel="icon">` in `index.html`.

## Credits

- Weather data from [OpenWeatherMap](https://openweathermap.org/)
- App icon by you or from [icon sources](https://www.flaticon.com/)