// this file contians the schema, model and methods for the products collection

const mongoose = require('mongoose');

const dbconnection = require('../dbconnection');

const connection = dbconnection.connect();

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

const documentModel = dbconnection.mongooseConnection.model('products', productSchema);

// get all the document
async function getTenDocuments(){
    const allItems = await documentModel.find().limit(10).exec();
    return allItems;
};
// get a specific document
async function get_Document(DID){
    const filter = {_id:DID}
    const item = await documentModel.findOne(filter).exec();
    return item;
}

// add a new document
async function add_Document(req){
    const {title, description} = req.body;
    const UTC_date = get_Date();

    const new_Document = new documentModel({
        title: title,
        description: description,
        last_Update: UTC_date
    });
    const newdoc = await new_Document.save();
    return newdoc;
}

// remove a document
async function removeDocument(doc_ID){
    await documentModel.deleteOne({_id: doc_ID});
    return {success: "The document successfully deleted"}
}

// update a document
async function updateDocument(req){
    const doc_ID = req.params.DID;
    const new_title = req.body.title;
    const new_description = req.body.description;
    const UTC_date = get_Date();

    const filter = {_id: doc_ID}
    const update = {title: new_title, description: new_description, last_Update: UTC_date }
    
    const updaterecord = await documentModel.findOneAndUpdate(filter, update);
    
    
    return updaterecord;
}


module.exports = {getTenDocuments, get_Document, add_Document, removeDocument, updateDocument};
      