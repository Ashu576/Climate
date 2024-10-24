async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = 'e177466e572d4138bb208c558e2a654b'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (response.ok) {
            displayWeather(data);
        } else {
            document.getElementById("weatherDisplay").innerHTML = "City not found!";
        }
    } catch (error) {
        document.getElementById("weatherDisplay").innerHTML = "Error fetching data!";
    }
}

const container = document.querySelector('.container');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none'; 
        moonIcon.style.display = 'inline'; 
    } else {
        sunIcon.style.display = 'inline'; 
        moonIcon.style.display = 'none'; 
    }
    
    if (container.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none'; 
        moonIcon.style.display = 'inline'; 
    } else {
        sunIcon.style.display = 'inline'; 
        moonIcon.style.display = 'none'; 
    }
}

sunIcon.addEventListener('click', toggleTheme);
moonIcon.addEventListener('click', toggleTheme);


function displayWeather(data) {
    const weatherDisplay = document.getElementById("weatherDisplay");
    weatherDisplay.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

const currentLocationBtn = document.getElementById('currentLocationBtn');

async function getLocationWeather() {
    if (navigator.geolocation) {
      
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            
            const apiKey = 'e177466e572d4138bb208c558e2a654b'; 
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                displayWeather(data); 
            } catch (error) {
                weatherDisplay.innerHTML = "Error fetching current location weather!";
            }
        }, () => {
            weatherDisplay.innerHTML = "Unable to retrieve your location.";
        });
    } else {
        weatherDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

currentLocationBtn.addEventListener('click', getLocationWeather);
