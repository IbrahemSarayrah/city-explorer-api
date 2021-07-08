'use strict';

const axios = require('axios');

module.exports = getRestaurantsHandler;

let inMemory = {};


function getRestaurantsHandler(req, res) {

  let restaurantsName = req.query.restaurantsName;

  let url = {
    baseURL: 'https://api.yelp.com/v3/',
    headers: {
      Authorization: `Bearer ${process.env.RESTAURANTS_API_KEY}`,
      'Content-type': 'application/json',
    },
  };

  if (inMemory[restaurantsName] !== undefined) {
    console.log('Data From Server');
    res.status(200).send(inMemory[restaurantsName]);
  } else {

    let createData = axios.create(url);

    createData('/businesses/search', {
      params: {
        location: restaurantsName,
        term: restaurantsName,
        limit: 20,
      },
    }).then(({ data }) => {
      let dataForRestaurant = data.businesses.map(restaurants => {
        return new Restaurant(restaurants);
      });
      inMemory[restaurantsName] = data.businesses;
      console.log('Data from req');

      res.status(200).send(dataForRestaurant);


    }).catch (err => {
      res.status(500).send(`Internal Server Error 500 ${err}`);
    });

  }

}


class Restaurant {
  constructor(restaurants) {
    this.name = restaurants.name;
    this.image_url = restaurants.image_url;
    this.price = restaurants.price;
    this.rating = restaurants.rating;
    this.url = restaurants.url;
  }
}

