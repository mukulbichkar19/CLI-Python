'use strict';

module.exports = function(app) {
    var citiesController = require('../controllers/CitiesController');

    app.route('/cities')
        .get(citiesController.getAllCities);
}