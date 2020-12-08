const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    type: String,
    plot: String,
    year: Number,
    pic: String,
    rate: Number,
    userName: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;