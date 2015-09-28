var userModel = require("../models/user");
//import jwtService = require('../services/jwtService');
var jwtService = require('jwt-simple');
var repository = userModel.repository;
var passportLocal = require('passport-local');
var request = require('request');
var localStrat = passportLocal.Strategy;
/*export function login(req: express.Request, res: express.Response, next: Function) {
    passport.authenticate('local', function(err: Error, user: any) {
        if (err) { next(err); }
        req.login(user, function(err) {
            if (err) { next(err); }
            sendToken(user, req, res);
        })d
    })(req, res, next);
}*/
function login(req, res) {
    sendToken(req.user, req, res);
}
exports.login = login;
function register(req, res) {
    /*    console.log('UserController register');
        console.log(req.body);
        var user = req.body;
        var newUser = new repository({
            email: user.email,
            password: user.password
        });
        newUser.save(function(err) {
            sendToken(newUser, req, res);
        });*/
    sendToken(req.user, req, res);
}
exports.register = register;
function googleLogin(req, res, next) {
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: 'JiBHMfu3TooQudrhluAKmcbj'
    };
    var url = 'https://www.googleapis.com/oauth2/v3/token';
    var options = {
        json: true,
        form: params,
    };
    request.post(url, options, function (err, resp, token) {
        var accessToken = token.access_token;
        var headers = {
            'Authorization': "Bearer " + accessToken
        };
        var o;
        var apiUrl = 'https://www.googleapis.com/plus/v1/people/me';
        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function (err, resp, profile) {
            console.log(profile);
            repository.findOne({ googleId: profile.id }, function (err, foundUser) {
                if (foundUser) {
                    return sendToken(foundUser, req, res);
                }
                var newUser = new repository({
                    googleId: profile.id,
                    displayName: profile.displayName
                });
                newUser.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return sendToken(newUser, req, res);
                });
            });
        });
    });
}
exports.googleLogin = googleLogin;
function sendToken(user, req, res) {
    var payload = {
        iss: req.hostname,
        sub: user.id
    };
    var token = jwtService.encode(payload, 'shh...');
    res.status(200).send({ user: user.toVm(), token: token });
}
//# sourceMappingURL=userController.js.map