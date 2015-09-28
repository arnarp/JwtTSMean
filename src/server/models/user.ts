import mongoose = require('mongoose');
import bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    displayName: String
});

userSchema.pre('save', function(next: Function) {
    var user: IUser = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err: Error, salt: string) {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { return next(err); }
            user.password = hash;
            next();
        })
    })
})

userSchema.method('toVm', function() {
    var user: IUser = this.toObject();
    delete user.password;
    console.log(user);
    return user;
})

userSchema.method('comparePasswords',
    function(password: string, callback: any) {
        bcrypt.compare(password, this.password, callback);
})

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    googleId: string;
    displayName: string;
    toVm(): IUser,
    comparePasswords(password: string,
        callback: (err: Error, same: boolean) => void): void;
}

export var repository = mongoose.model<IUser>('User', userSchema);