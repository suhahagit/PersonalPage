const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    title: {type: String, required: true},
    plot: String,
    year: Number,
    pic: String,
    rate: Number,
    userName: String,
    count: Number
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;