// this file contians the schema, model and methods for the user collection

const mongoose = require('mongoose');

const dbconnection = require('../dbconnection.js');
const { name } = require('ejs');

dbconnection.connect();

const userSchema = new mongoose.Schema({
    user_id: {type: String},
    user_oauth_id: {type: String},
    userAvtar_url: {type: String},
    email: {type: String},
    name: {type: String},
    password: {type: String},
    phone: {type: String},
});

module.exports = userModel = dbconnection.mongooseConnection.model('users', userSchema);
      