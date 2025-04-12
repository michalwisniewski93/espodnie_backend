const mongoose = require('mongoose')


const shopDataSchema = new mongoose.Schema({
    shoptitle: {type: String, required: true},
    companyname: {type: String, required: true},
    companystreet: {type: String, required: true},
    companypostcode: {type: String, required: true},
    companycity: {type: String, required: true},
    companynip: {type: Number, required: true},
    companyemail: {type: String, required: true},
    companyphonenumber: {type: String, required: true}
})


const ShopData = mongoose.model("ShopData", shopDataSchema)

module.exports = ShopData