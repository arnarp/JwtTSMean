import mongoose = require('mongoose');
import bcrypt = require('bcrypt');

export var userSchema = new mongoose.Schema({
    email: String,
    password: String
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

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    toVm(): IUser
}

export var repository = mongoose.model<IUser>('User', userSchema);