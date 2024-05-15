// Description: Model for categories collection
const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');

dbconnection.connect();

const categorySchema = new mongoose.Schema({
    _id: { type: String },
    id: { type: String },
    category_name: { type: String }
});

module.exports = categoryModel = dbconnection.mongooseConnection.model('categories', categorySchema);
      