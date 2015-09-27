/*jshint node:true*/
'use strict';

import express = require('express');
var app: express.Express = express();

import bodyParser = require('body-parser');
import favicon = require('serve-favicon');
import logger = require('morgan');
var port = process.env.PORT || 8001;
import { send404 } from './utils/404';  // use latest TS 1.5, inspired from ES6

import passport = require('passport');
import passportLocal = require('passport-local');
var LocalStrategy = passportLocal.Strategy;


import mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jwt');

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(passport.initialize());
passport.serializeUser(function(usr, done) {
    done(null, usr.id);
});

/*app.use(function(req: express.Request, res: express.Response, next: Function) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});*/
import userModel = require("./models/user");
import IUser = userModel.IUser;
import repository = userModel.repository;
var strategyOptions = { usernameField: 'email' };
var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
    repository.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Wrong Email/Password' });
        }
        user.comparePasswords(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false, { message: 'Wrong Email/Password' });
            } else {
                return done(null, user);
            }
        })
    });
});
var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
    repository.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
            return done(null, false, { message: 'Email exists' });
        }
    });
    var newUser = new repository({
        email: email,
        password: password
    });
    newUser.save(function(err) {
        done(null, newUser);
    });
})
passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var notFoundRequestHandler: express.RequestHandler = function(req: express.Request, res: express.Response, next: Function): any {

}

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});