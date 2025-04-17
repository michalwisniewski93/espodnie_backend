const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    customername: {type: String, required: true},
    customersurname: {type: String, required: true},
    customerstreet: {type: String, required: true},
    customerpostcode: {type: String, required: true},
    customercity: {type: String, required: true},
    customercompanyname: {type: String, required: false},
    customercompanystreet: {type: String, required: false},
    customercompanypostcode: {type: String, required: false},
    customercompanycity: {type: String, required: false},
    customeremail: {type: String, required: true},
    customerinvoice: {type: Boolean, required: true},
    customerlogin: {type: String, required: true},
    customernewsletter: {type: Boolean, required: false},
    customerpassword: {type: String, required: true},
    customerphonenumber: {type: String, required: true},
    customerregulations: {type: Boolean, required: true},
    customercompanynip: {type: Number, required: false},
    customercompanyregon: {type: Number, required: false},
    boughtProducts: {type: Object, required: true},
    date: {type: String, required: true},
    amount: {type: Number, required: true}
})

const Orders = mongoose.model("Orders", ordersSchema)

module.exports = Orders