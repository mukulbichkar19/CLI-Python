'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CitiesSchema = new Schema({
    City: {
        type: String
    },
    SubscribersList: [{ type: Schema.ObjectId }]
});

module.exports = mongoose.model('Cities', CitiesSchema);
