var express = require('express');
app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Users = require('./api/models/UsersModel'),
    Cities = require('./api/models/CitiesModel'),
    bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/EmailApp');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Needed for CORS
app.use(cors());
app.options('*', cors());

var citiesRoute = require('./api/routes/CitiesRoute');
var userroutes = require('./api/routes/UsersRoute'); //importing route
userroutes(app); //register the route
citiesRoute(app);


app.listen(port);

// Add invalid path error message
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

console.log(`API backend server is up and running on port: `, port);