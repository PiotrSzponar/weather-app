import { getCity, getWeather } from './forecast.js';

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {
  const { cityInfo, weather } = data;

  // update info template
  details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;

  // update the day/night and icons
  const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  const timeSrc = weather.IsDayTime ? './img/day.svg' : './img/night.svg';
  time.setAttribute('src', timeSrc);

  // d-none class - delete if true
  if (card.classList.contains('d-none')) card.classList.remove('d-none');
};

const updateCity = async city => {
  const cityInfo = await getCity(city);
  const weather = await getWeather(cityInfo.Key);

  return { cityInfo, weather };
};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
