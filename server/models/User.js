const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: String,
    isPublic: {type: Boolean, default: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;