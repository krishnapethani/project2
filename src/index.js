const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useMongoClient: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);


app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https', 
  apiKey: ' AIzaSyA6oeTBjzkaluuFGMJFgdEWoGfElxbfcCk', 
  formatter: 'json'       
};
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
var geocoder = NodeGeocoder(options);

geocoder.reverse({lat:25.2425166666667, lon:55.2984633333333}, function(err, res) {
  console.log(res);
});

app.listen(3000, () => {
  console.log('Server started.')
});