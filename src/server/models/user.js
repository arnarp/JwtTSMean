var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
exports.userSchema = new mongoose.Schema({
    email: String,
    password: String
});
exports.userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
exports.userSchema.method('toVm', function () {
    var user = this.toObject();
    delete user.password;
    console.log(user);
    return user;
});
exports.repository = mongoose.model('User', exports.userSchema);
//# sourceMappingURL=user.js.map