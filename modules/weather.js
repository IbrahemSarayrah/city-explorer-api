'use strict';

const axios = require('axios');

module.exports = getWeatherHandler;

function getWeatherHandler(req, res) {

  let cityName = req.query.cityName;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;

  axios
    .get(url)
    .then(weatherData => {
      let dataForWeather = weatherData.data.data.map(weather => {
        return new Forecast(weather);
      });
      res.status(200).send(dataForWeather);

    }).catch(err => {
      res.status(500).send(`Internal Server Error 500 ${err}`);
    });
}

class Forecast {
  constructor(forcast) {
    this.valid_date = forcast.valid_date;
    this.low_temp = forcast.low_temp;
    this.high_temp = forcast.high_temp;
    this.description = forcast.weather.description;
  }
}
