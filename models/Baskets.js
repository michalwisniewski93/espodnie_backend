const mongoose = require('mongoose')

const basketsSchema = new mongoose.Schema({
    user: {type: String, required: true},
    boughtProducts: {type: Array, required: false}
})

const Baskets = mongoose.model("Baskets", basketsSchema)

module.exports = Baskets