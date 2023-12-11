class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.makeRequest(url);
  }

  async getCityCoordinates(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`;
    return this.makeRequest(url);
  }

  async makeRequest(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error making weather request:", error);
      throw error;
    }
  }
}

class WeatherCache {
  constructor() {
    this.cache = {};
  }

  set(key, value) {
    this.cache[key] = value;
  }

  get(key) {
    return this.cache[key];
  }
}

class WeatherApp {
  constructor(apiKey) {
    this.api = new WeatherApi(apiKey);
    this.cache = new WeatherCache();
  }

  async findCoordinates(cityName) {
    try {
      const cachedData = this.cache.get(cityName);
      if (cachedData) {
        return cachedData;
      }

      const data = await this.api.getCityCoordinates(cityName);
      this.cache.set(cityName, data);
      return data;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  }

  async loadWeather(lat, lon) {
    try {
      const cachedData = this.cache.get(`${lat}-${lon}`);
      if (cachedData) {
        this.displayWeather(cachedData);
      } else {
        const data = await this.api.getWeatherByCoordinates(lat, lon);
        this.cache.set(`${lat}-${lon}`, data);
        this.displayWeather(data);
      }
    } catch (error) {
      console.error("Error loading weather:", error);
      throw error;
    }
  }

  displayWeather(response) {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = this.buildWeatherHTML(response);
  }

  buildWeatherHTML(response) {
    return `
            <div class="weather-element">
                <img id="weather-icon" src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">
                <div id="temperature">${response.main.temp}&#8451;</div>
            </div>
            <div class="weather-element">
                <div><b>Pressure</b></div>
                <div id="pressure">${response.main.pressure} мм.рт.ст</div>
            </div>
            <div class="weather-element">
                <div><b>Humidity</b></div>
                <div id="humidity">${response.main.humidity}%</div>
            </div>
            <div class="weather-element">
                <div><b>Description</b></div>
                <div id="description">${response.weather[0].description}</div>
            </div>
            <div class="weather-element">
                <div><b>Minimal temperature</b></div>
                <div id="temp-min">${response.main.temp_min}&#8451;</div>
            </div>
            <div class="weather-element">
                <div><b>Maximum temperature</b></div>
                <div id="temp-max">${response.main.temp_max}&#8451;</div>
            </div>
            <div class="weather-element">
                <div><b>Wind</b></div>
                <div id="wind">${response.wind.speed} м/с</div>
            </div>
            <div class="weather-element">
                <div><b>Sea level</b></div>
                <div id="sea-level">${response.main.sea_level} м</div>
            </div>
        `;
  }
}

const apiKey = "577b3bd2eec54e5a84a1ae825e746783";
const weatherApp = new WeatherApp(apiKey);

async function findCoordinates() {
  const cityName = document.getElementById("city").value;
  try {
    const data = await weatherApp.findCoordinates(cityName);

    if (data.length === 0) {
      alert("No city found, try another one");
      document.getElementById("city").value = "";
    } else {
      const { lat, lon } = data[0];
      await weatherApp.loadWeather(lat, lon);
    }
  } catch (error) {
    console.error("Error finding coordinates:", error);
  }
}

function updateDate() {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").innerHTML = currentDate.toLocaleString(
    "ru",
    options
  );
}

updateDate();
