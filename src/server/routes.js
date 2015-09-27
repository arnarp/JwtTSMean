var express = require('express');
var router = express.Router();
var four0four = require('./utils/404');
var data = require('./data');
var userController = require("./controllers/userController");
//import jwtService = require('./services/jwtService');
var jwtService = require('jwt-simple');
router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/*', four0four.notFoundMiddleware);
module.exports = router;
//////////////
function getPeople(req, res, next) {
    if (req.headers['authorization'] === undefined) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }
    else {
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
function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.getPeople().filter(function (p) {
        return p.id === id;
    })[0];
    if (person) {
        res.status(200).send(person);
    }
    else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}
//# sourceMappingURL=routes.js.map