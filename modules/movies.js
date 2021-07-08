'use strict';

const axios = require('axios');

module.exports = getMovieHandler;

let inMemory = {};


function getMovieHandler(req, res) {

  let movieName = req.query.movieName;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`;

  if (inMemory[movieName] !== undefined) {
    console.log('Data From Server');
    res.status(200).send(inMemory[movieName]);
  } else {
    axios
      .get(url)
      .then(movieData => {
        let dataForMovie = movieData.data.results.map(movies => {
          return new Movie(movies);
        });
        inMemory[movieName] = movieData.data.results;
        console.log('Data from req');
        res.status(200).send(dataForMovie);

      }).catch(err => {
        res.status(500).send(`Internal Server Error 500 ${err}`);
      });
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
