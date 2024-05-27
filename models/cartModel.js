const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const cartSchema = new mongoose.Schema({
    customer_id: { type: String },
    cart: { 
        type:Map,
        of: Number
    }
});

module.exports = cartModel = dbconnection.mongooseConnection.model('cart', cartSchema);