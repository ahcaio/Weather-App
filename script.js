const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');



function initAutocomplete() {
    const input = document.querySelector('#autocomplete');
    const autocomplete = new google.maps.places.Autocomplete(input);
  }

function searchWeather() {

    const APIKey = '7e8ceaea20f6ffba42c9e95827db3b58';
    const city = document.querySelector('#autocomplete').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/clear.png';
                    break;

                case 'Rain':
                    image.src = 'assets/rain.png';
                    break;

                case 'Snow':
                    image.src = 'assets/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'assets/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'assets/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });
    }


input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        searchWeather();
    }
});

search.addEventListener('click', () => {
    searchWeather();
});

window.addEventListener('load', () => {
    initAutocomplete();
    searchWeather();
  });

