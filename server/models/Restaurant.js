const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: String, 
    city: String, 
    description: String, 
    pic: String 
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant