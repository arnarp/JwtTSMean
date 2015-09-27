var userModel = require("../models/user");
//import jwtService = require('../services/jwtService');
var jwtService = require('jwt-simple');
var repository = userModel.repository;
var passport = require('passport');
var passportLocal = require('passport-local');
var localStrat = passportLocal.Strategy;
function login(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            next(err);
        }
        req.login(user, function (err) {
            if (err) {
                next(err);
            }
            sendToken(user, req, res);
        });
    })(req, res, next);
}
exports.login = login;
function register(req, res) {
    console.log('UserController register');
    console.log(req.body);
    var user = req.body;
    var newUser = new repository({
        email: user.email,
        password: user.password
    });
    newUser.save(function (err) {
        sendToken(newUser, req, res);
    });
}
exports.register = register;
function sendToken(user, req, res) {
    var payload = {
        iss: req.hostname,
        sub: user.id
    };
    var token = jwtService.encode(payload, 'shh...');
    res.status(200).send({ user: user.toVm(), token: token });
}
//# sourceMappingURL=userController.js.map