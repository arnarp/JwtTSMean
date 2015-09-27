var userModel = require("../models/user");
//import jwtService = require('../services/jwtService');
var jwtService = require('jwt-simple');
var repository = userModel.repository;
function register(req, res) {
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
    newUser.save(function (err) {
        res.status(200).send({ user: newUser.toVm(), token: token });
    });
}
exports.register = register;
//# sourceMappingURL=userController.js.map