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

 exports.createUser = function(req, res){
   console.log('Inside createUser: ');
   console.log(req.body.emailId);
   console.log(req.body.city);
   
   var emailId = req.body.emailId;
   var city = req.body.city;
   var newUser = new Users(
     {
       emailId: emailId,
       city: city
     }
   );


   console.log(newUser);

   var newUserId = 0;
   // Check if user does not exists in the database
   Users.find({ emailId: emailId}, function(err, user){
     if(err)
      res.send(err)
    else {
      if(user.length > 0){
        res.status(403).send({message: 'User with same email address exists cannot create a new one.'})
      }else{
        // Create a new user
         Users.create(newUser, function(err, user){
           if(err){
             res.status(500).send({message: 'Unable to create a user' + err});
           }
           Cities.find({City:user.city}, function(err, city){
             if(err){
               res.send(err);
             }else if(city.length == 0)
             {
               let lcity = new Cities({ City: user.city, SubscribersList: [user._id]});
               Cities.create(lcity, function(err, city){
                 if(err){
                   res.send(err);
                 }
                 res.status(200).send({message: 'User created successfully along with subscribers list create'});
               });
             }else{
               console.log('Enters this update and push branch');
               var subscriberList = city[0].SubscribersList;
               subscriberList.push(user._id);
               var CityName = city[0].City;
               let lcity = new Cities({ City: CityName, SubscribersList: subscriberList});
               Cities.deleteOne({City:city[0].City}, function(err, city){
                 if(err){
                   res.send(err);
                 }
                 Cities.create(lcity, function(err, city){
                   if(err){
                     res.send(err);
                   }
                   res.status(200).send({message: 'User created successfully along with updated list' + city});
                 });
               });

               /*city[0].SubscribersList.push(user._id);
               city.save(function(err){
                 if(err){
                   return res.send(err);
                 }
                 res.status(200).send({message: 'User created successfully along with subscribers update'+city});
               });
               console.log('Subscriber list after update ');
               console.log(subscriberList);
               Cities.updateOne({ _id: city._id}, { $set: { SubscribersList: subscriberList } },
               function(err, city){
                 if(err){
                    res.send(err)
                 }
                 console.log(city);
                 res.status(200).send({message: 'User created successfully along with subscribers update'+city});
               });*/
             }
           });
         });
      }
    }
  });

};
