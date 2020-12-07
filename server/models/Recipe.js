const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: String, 
    description: String, 
    pic: String 
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe