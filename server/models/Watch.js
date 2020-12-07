const mongoose = require('mongoose')
const Schema = mongoose.Schema

const watchSchema = new Schema({
    title: String,
    type: String, 
    plot: String, 
    year: Number, 
    poster: String 
})

const Watch = mongoose.model('Watch', watchSchema)

module.exports = Watch