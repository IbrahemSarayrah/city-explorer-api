'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

const getWeatherHandler = require('./modules/weather');

const getMovieHandler = require('./modules/movies');

const getRestaurantsHandler = require('./modules/restaurants');

const handleHomeTest = require('./modules/test');

// localhost:3001/
server.get('/', handleHomeTest);

// localhost:3001/weather?cityName=Seattle
server.get('/weather', getWeatherHandler);

// localhost:3001/movie?movieName=Seattle
server.get('/movie', getMovieHandler);

// localhost:3001/restaurants?restaurantsName=Seattle
server.get('/restaurants', getRestaurantsHandler);

server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
