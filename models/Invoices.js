const mongoose = require('mongoose')

const invoicesSchema = new mongoose.Schema({
    customername: {type: String, required: true},
    customersurname: {type: String, required: true},
    customercompanyname: {type: String, required: true},
    customercompanystreet: {type: String, required: true},
    customercompanypostcode: {type: String, required: true},
    customercompanycity: {type: String, required: true},
    customeremail: {type: String, required: true},
    customerphonenumber: {type: String, required: true},
    customercompanynip: {type: Number, required: true},
    customercompanyregon: {type: Number, required: true},
    boughtProducts: {type: Object, required: true},
    date: {type: String, required: true},
    amount: {type: Number, required: true}
})

const Invoices = mongoose.model("Invoices", invoicesSchema)

module.exports = Invoices