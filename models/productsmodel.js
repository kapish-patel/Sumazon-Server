// this file contians the schema, model and methods for the products collection

const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const productSchema = new mongoose.Schema({
    _id: {type: String},
    product_id: {type: String},
    title: {type: String},
    imgUrl: {type: String},
    productURL: {type: String},
    stars: {type: String},
    reviews: {type: String},
    price: {type: String},
    listPrice: {type: String},
    category_id: {type: String},
    isBestSeller: {type: String},
    boughtInLastMonth: {type: String}
});

module.exports = productsModel = dbconnection.mongooseConnection.model('products', productSchema);
      