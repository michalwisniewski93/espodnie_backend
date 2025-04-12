const mongoose = require('mongoose')

const favouritesSchema = new mongoose.Schema({
    user: {type: String, required: true},
    favourites: {type: Array, required: false}
})




const Favourites = mongoose.model("Favourites", favouritesSchema)

module.exports = Favourites