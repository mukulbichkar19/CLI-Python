'use strict';
 var mongoose = require('mongoose'), Users = mongoose.model('Users'),
 Cities = mongoose.model('Cities');

exports.getUsers = function(req, res){
  Users.find({}, function(err, users){
    if(err){
      res.send(err);
    }else{
      res.json(users);
    }
  });
};

async function checkIfUserExists(emailId){
  const query = Users.findOne({emailId: emailId});
  const user = await query.exec();
  return user;
}

async function CheckIfCityExists(city){
  const query = Cities.findOne({City:city});
  return await query.exec();
}

exports.createUser = function(req, res) {
  let emailId = req.body.emailId;
  let city = req.body.city;
  let newUser = {
    emailId: emailId,
    city: city
  }
  checkIfUserExists(emailId).then(result => {
    if(result == null){
        // Create a user here and add him to cities SubscribersList
        Users.create(newUser, function(err, user){
          if(err)
            res.status(500).send({message: 'Unable to create a user' + err});
          CheckIfCityExists(user.city).then(city => {
            if(city == null){
              let lcity = new Cities({ City: user.city, SubscribersList: [user._id]});
              Cities.create(lcity, function(err, city){
                if(err){
                  res.send(err);
                }
                res.status(200).send({message: 'User created successfully along with updated subscribers list for cities'});
              });
            }else{
                Cities.updateOne({ city: city.City }, { $push: { SubscribersList: user._id } },
                    function (err, item) {
                        if (err)
                            res.send(err)
                        res.status(200).send({ message: 'User created successfully along with updated list' + city });
                });
            }
          });
        });
    }else{
      res.status(403).send({message: 'User with same email address exists cannot create a new one.'});
    }
  }).catch(error => console.log(error));








}
