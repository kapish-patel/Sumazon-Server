// this file contians the schema, model and methods for the products collection

const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const productSchema = new mongoose.Schema({
    product_id: { type: String, unique: true },
    title: { type: String },
    imgUrl: { type: String },
    stars: { type: Number, default: 0 },
    price: { type: Number },
    category_id: { type: Number },
    description: {type: String},
    isBestSeller: { type: Boolean, default: false },
    seller_id: { type: String },
    quantity: { type: Number }
});

module.exports = productsModel = dbconnection.mongooseConnection.model('products', productSchema);
