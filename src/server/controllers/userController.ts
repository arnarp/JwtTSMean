import express = require("express");
import mongoose = require("mongoose");
import userModel = require("../models/user");
//import jwtService = require('../services/jwtService');
import jwtService = require('jwt-simple');
import IUser = userModel.IUser;
import repository = userModel.repository;
import passport = require('passport');
import passportLocal = require('passport-local');
var localStrat = passportLocal.Strategy;

/*export function login(req: express.Request, res: express.Response, next: Function) {
    passport.authenticate('local', function(err: Error, user: any) {
        if (err) { next(err); }
        req.login(user, function(err) {
            if (err) { next(err); }
            sendToken(user, req, res);
        })
    })(req, res, next);
}*/
export function login(req: express.Request, res: express.Response) {
    sendToken(req.user, req, res);
}

export function register(req: express.Request, res: express.Response) {
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

function sendToken(user: IUser, req: express.Request, res: express.Response) {
    var payload = {
        iss: req.hostname,
        sub: user.id
    };
    var token = jwtService.encode(payload, 'shh...');
    res.status(200).send({ user: user.toVm(), token: token });
}