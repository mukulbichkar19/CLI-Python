'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  emailId: {
    type: String,
    required: 'Mandatory field'
  },
  city: {
    type: String
  },
  subscribedOn: {
    type: Date,
    default: Date.now
  },
  lastEmailSent: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Users', UsersSchema);
