const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    title: String,
    link: {type: String, required: true},
    userName: String
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;