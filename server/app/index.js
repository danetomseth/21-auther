'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//app.use(require('./requestState.middleware'));
app.use(require('./sessions.middleware'));

app.use(require('./logging.middleware'));
// app.use(require('./login.middleware'));


app.use(require('./statics.middleware'));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./google.middleware'));



app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;