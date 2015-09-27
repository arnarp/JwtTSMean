import express = require("express");
import mongoose = require("mongoose");
import userModel = require("../models/user");
//import jwtService = require('../services/jwtService');
import jwtService = require('jwt-simple');
import IUser = userModel.IUser;
import repository = userModel.repository;


export function register(req: express.Request, res: express.Response) {
    console.log('UserController register');
    console.log(req.body);
    var user = req.body;
    var newUser = new repository({
        email: user.email,
        password: user.password
    });
    var payload = {
        iss: req.hostname,
        sub: newUser._id
    };
    var token = jwtService.encode(payload, 'shh...');
    newUser.save(function(err) {
        res.status(200).send({ user: newUser.toVm(), token: token });
    });
}