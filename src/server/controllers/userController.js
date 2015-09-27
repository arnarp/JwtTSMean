//import jwtService = require('../services/jwtService');
var jwtService = require('jwt-simple');
var passportLocal = require('passport-local');
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
function sendToken(user, req, res) {
    var payload = {
        iss: req.hostname,
        sub: user.id
    };
    var token = jwtService.encode(payload, 'shh...');
    res.status(200).send({ user: user.toVm(), token: token });
}
//# sourceMappingURL=userController.js.map