const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    productname: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageurl: {type: String, required: false},
    storepieces: {type: Number, required: true}
})

const Products = mongoose.model("Products", productsSchema)

module.exports =  Products