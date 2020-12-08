const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: String,
    link: {type: String, required: true},
    userName: String
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;