const mongoose = require('mongoose')

const productcategoriesSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

const ProductCategories = mongoose.model("ProductCategories", productcategoriesSchema)

module.exports = ProductCategories