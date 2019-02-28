'use strict';

module.exports = function(app) {
    const citiesController = require('../controllers/CitiesController');

    app.route('/cities')
        .get(citiesController.getAllCities);
}
