'use strict';

module.exports = function(app) {
    var userController = require('../controllers/UsersController');

    app.route('/users')
        .get(userController.getUsers)
        .post(userController.createUser);
}