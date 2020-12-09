const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    description: String,
    pic: {type: String, required: true},
    userName: String,
    count: Number,
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;