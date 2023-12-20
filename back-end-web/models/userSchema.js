const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    given_name: String,
    family_name: String,
    picture: String,
    email: String,
    classes: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
