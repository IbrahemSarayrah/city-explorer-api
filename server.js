'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

const axios = require('axios');

server.use(cors());

// for the localhost:3001/
server.get('/', handleHomeTest);

function handleHomeTest(req, res) {
  res.status(200).send('home');
}

// localhost:3001/weather?cityName=Seattle
server.get('/weather', getWeatherHandler);

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

// localhost:3001/movie?movieName=Seattle
server.get('/movie', getMovieHandler);

function getMovieHandler(req, res) {

  let movieName = req.query.movieName;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`;

  axios
    .get(url)
    .then(movieData => {
      let dataForMovie = movieData.data.results.map(movies => {
        return new Movie(movies);
      });
      res.status(200).send(dataForMovie);

    }).catch(err => {
      res.status(500).send(`Internal Server Error 500 ${err}`);
    });
}


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

class Movie {
  constructor(movies) {
    this.title = movies.title;
    this.overview = movies.overview;
    this.vote_average = movies.vote_average;
    this.vote_count = movies.vote_count;
    this.poster_path = movies.poster_path;
    this.popularity = movies.popularity;
    this.release_date = movies.release_date;
  }
}

