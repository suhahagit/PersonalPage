const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isPublic: {type: Boolean, default: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;