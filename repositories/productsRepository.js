const productModel = require('../models/productsmodel');

// get all the document
async function getTenDocuments(){
    const allItems = await productModel.find().limit(10).exec();
    return allItems;
};


// get a specific document
async function getDocument(DID){
    const filter = {product_id:DID}
    console.log(filter);
    const item = await productModel.findOne(filter).exec();
    // fetch the product category name from the category collection

    const category_id = item.category_id;
    console.log(category_id);
    

    return item;
}


// add a new document
// async function add_Document(req){
//     const {title, description} = req.body;
//     const UTC_date = get_Date();

//     const new_Document = new documentModel({
//         title: title,
//         description: description,
//         last_Update: UTC_date
//     });
//     const newdoc = await new_Document.save();
//     return newdoc;
// }

// // remove a document
// async function removeDocument(doc_ID){
//     await documentModel.deleteOne({_id: doc_ID});
//     return {success: "The document successfully deleted"}
// }

// // update a document
// async function updateDocument(req){
//     const doc_ID = req.params.DID;
//     const new_title = req.body.title;
//     const new_description = req.body.description;
//     const UTC_date = get_Date();

//     const filter = {_id: doc_ID}
//     const update = {title: new_title, description: new_description, last_Update: UTC_date }
    
//     const updaterecord = await documentModel.findOneAndUpdate(filter, update);
    
    
//     return updaterecord;
// }


module.exports = {getTenDocuments, getDocument};