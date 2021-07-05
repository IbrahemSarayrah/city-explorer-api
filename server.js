'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

// for the localhost:3001/
server.get('/', (req, res) => {
  res.status(200).send('home');
});

// localhost:3001/weather?cityName=Seattle
server.get('/weather', (req, res) => {
  //   console.log(req.query);
  let cityWeather = weatherData.find(weather => {
    if (weather.city_name.toLocaleLowerCase() === req.query.cityName) {
      return weather;
    }
  });
    //   res.status(200).send(cityWeather.data);
  let dataForWeather = cityWeather.data.map(weather => {
    return new Forecast(weather);
  });
  res.status(200).send(dataForWeather);
});


server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});


class Forecast {
  constructor(forcast) {
    this.valid_date = forcast.valid_date;
    this.low_temp = forcast.low_temp;
    this.high_temp = forcast.high_temp;
    this.description = forcast.weather.description;
  }
}
