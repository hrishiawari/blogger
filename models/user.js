const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}
const emailValidator = [
    { validator: emailLengthChecker, message: 'email must be > 5 and < 30' }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidator },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    })

});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('user', userSchema);