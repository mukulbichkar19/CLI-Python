'use strict';
 var mongoose = require('mongoose'),
 Cities = mongoose.model('Cities');

exports.getAllCities = function(req, res){
  console.log('Inside get all cities api');
  Cities.find({}, function(err, cities){
    if(err){
      res.send(err);
    }else{
      res.json(cities);
    }
  });
};
