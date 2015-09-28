var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    displayName: String
});
userSchema.pre('save', function (next) {
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
userSchema.method('toVm', function () {
    var user = this.toObject();
    delete user.password;
    console.log(user);
    return user;
});
userSchema.method('comparePasswords', function (password, callback) {
    bcrypt.compare(password, this.password, callback);
});
exports.repository = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map