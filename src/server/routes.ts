import express = require('express');
var router = express.Router();
import * as four0four from './utils/404';
import data = require('./data');
import mongoose = require('mongoose');
import userController = require("./controllers/userController");
//import jwtService = require('./services/jwtService');
import jwtService = require('jwt-simple');
import passport = require('passport');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.post('/register', passport.authenticate('local-register'), userController.register);
router.post('/login', passport.authenticate('local-login') ,userController.login);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req: express.Request,
    res: express.Response, next: Function) {

    if (req.headers['authorization'] === undefined) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    } else {
        var token = req.headers['authorization'].split(' ')[1];
        var payload = jwtService.decode(token, 'shh...');
        if (!payload.sub) {
            res.status(401).send({
                message: 'Auth failed'
            });
        }
    }
    res.status(200).send(data.getPeople());
}

function getPerson(req: express.Request, res: express.Response, next: Function) {
    var id = +req.params.id;
    var person = data.getPeople().filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}