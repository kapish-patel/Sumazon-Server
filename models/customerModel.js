
const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const customerSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String, default: ''},
    password: {type: String},
    previous_order: {type: Array, default: []},
});

module.exports = userModel = dbconnection.mongooseConnection.model('customers', customerSchema);
      