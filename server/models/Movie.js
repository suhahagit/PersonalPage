const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    plot: String,
    year: Number,
    pic: String,
    rate: Number,
    userName: String,
    count: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;