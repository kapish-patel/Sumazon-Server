// Description: Model for categories collection
const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const categorySchema = new mongoose.Schema({
    _id: { type: String },
    category_name: { type: String },
    category_id: { type: Number },
});

module.exports = categoryModel = dbconnection.mongooseConnection.model('categories', categorySchema);
      