'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./UsersModel');

var CitiesSchema = new Schema({
    City: {
        type: String
    },
    SubscribersList: [{ type: Schema.ObjectId }]
});

module.exports = mongoose.model('Cities', CitiesSchema);