const menuSection = document.getElementById('menuSection');
const weatherSection = document.getElementById('weatherSection');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');

startBtn.addEventListener('click', () => {
  menuSection.style.display = 'none';
  weatherSection.style.display = 'block';
});

backBtn.addEventListener('click', () => {
  weatherSection.style.display = 'none';
  menuSection.style.display = 'block';
  // Optionally clear results
  resultContainer.innerHTML = '';
  cityInput.value = '';
});const apiKey = '93769c6f2e6f50b9ecb7d56bf5584aa6';

const cities = [
  { name: 'Harare', lat: -17.8292, lon: 31.0522 },
  { name: 'Chinhoyi', lat: -17.3667, lon: 30.2000 },
  { name: 'Mutare', lat: -18.9707, lon: 32.6709 },
  { name: 'Gweru', lat: -19.4516, lon: 29.8175 },
  { name: 'Bulawayo', lat: -20.1324, lon: 28.6265 },
  { name: 'Kwekwe', lat: -18.9281, lon: 29.8152 },
  { name: 'Kadoma', lat: -18.3333, lon: 29.9167 },
  { name: 'Masvingo', lat: -20.0729, lon: 30.8333 },
  { name: 'Chiredzi', lat: -21.0514, lon: 31.6663 },
  { name: 'Zvishavane', lat: -20.3267, lon: 30.0665 },
  { name: 'Marondera', lat: -18.1853, lon: 31.5514 },
  { name: 'Bindura', lat: -17.3019, lon: 31.3306 },
  { name: 'Karoi', lat: -16.8133, lon: 29.6827 },
  { name: 'Rusape', lat: -18.5279, lon: 32.1284 },
  { name: 'Chivhu', lat: -19.0333, lon: 31.6500 },
  { name: 'Epworth', lat: -17.8667, lon: 31.1333 },
  { name: 'Victoria Falls', lat: -17.9270, lon: 25.8345 },
  { name: 'Beitbridge', lat: -22.2151, lon: 30.0009 },
  { name: 'Chegutu', lat: -18.1302, lon: 30.1407 },
  { name: 'Chipinge', lat: -20.1984, lon: 32.6336 },
  { name: 'Kariba', lat: -16.5167, lon: 28.8000 },
  { name: 'Hwange', lat: -18.3645, lon: 26.4988 },
  { name: 'Norton', lat: -17.8833, lon: 30.7000 },
  { name: 'Ruwa', lat: -17.8353, lon: 31.2158 },
  { name: 'Redcliff', lat: -19.0333, lon: 29.7833 },
  { name: 'Shurugwi', lat: -19.6553, lon: 30.0070 },
  { name: 'Gokwe', lat: -18.2167, lon: 28.9333 },
  { name: 'Plumtree', lat: -20.4833, lon: 27.8167 },
  { name: 'Murehwa', lat: -17.5333, lon: 31.6333 },
  { name: 'Mvurwi', lat: -17.0672, lon: 30.0000 },
  { name: 'Nyanga', lat: -18.1878, lon: 32.7515 },
  { name: 'Shamva', lat: -17.2167, lon: 31.5333 },
  { name: 'Mutoko', lat: -17.2153, lon: 32.1687 }
];

const resultContainer = document.getElementById('weatherResult');
const cityInput = document.getElementById('cityInput');
const recentSearchesContainer = document.getElementById('recentSearches');
const suggestionsContainer = document.getElementById('suggestions');
let recentSearches = [];

// Auto-suggest city names as user types
cityInput.addEventListener('input', function () {
  const value = cityInput.value.trim().toLowerCase();
  if (!value) {
    suggestionsContainer.innerHTML = '';
    return;
  }
  const matches = cities.filter(c => c.name.toLowerCase().startsWith(value));
  if (matches.length === 0) {
    suggestionsContainer.innerHTML = '';
    return;
  }
  suggestionsContainer.innerHTML = `
    <ul>
      ${matches.map(c => `<li onclick="selectSuggestion('${c.name}')">${c.name}</li>`).join('')}
    </ul>
  `;
});

function selectSuggestion(name) {
  cityInput.value = name;
  suggestionsContainer.innerHTML = '';
}

// Recent searches logic
function updateRecentSearches(cityName) {
  if (!recentSearches.includes(cityName)) {
    recentSearches.unshift(cityName);
    if (recentSearches.length > 5) recentSearches.pop();
  }
  recentSearchesContainer.innerHTML = `
    <h4>Recent Searches:</h4>
    <ul>
      ${recentSearches.map(city => `<li onclick="searchRecent('${city}')">${city}</li>`).join('')}
    </ul>
  `;
}

function searchRecent(cityName) {
  cityInput.value = cityName;
  getWeather();
}

// Main weather fetch function
function getWeather() {
  resultContainer.innerHTML = `<div class="spinner"></div>`; // Show loading spinner
  const cityName = cityInput.value.trim();
  const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (!city) {
    resultContainer.innerHTML = `<p>City not found.</p>`;
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod && data.cod !== 200) {
        resultContainer.innerHTML = `<p>${data.message || 'Error fetching weather data.'}</p>`;
        return;
      }
      const icon = data.weather[0].icon;
      resultContainer.innerHTML = `
        <h3>${city.name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      updateRecentSearches(city.name);
    })
    .catch(err => {
      resultContainer.innerHTML = `<p>Error loading weather data. Please check your internet connection or try again later.</p>`;
    });
}