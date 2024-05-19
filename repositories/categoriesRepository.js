const categoryModel = require('../models/categoryModel');

// get all the document
async function getAllCategory(){
    const allItems = await categoryModel.find().exec();
    return allItems;
};

async function getCategoryById(categoryId){
    const category = await categoryModel.findOne({category_id: categoryId}).exec();
    return category;
}

module.exports = {getAllCategory, getCategoryById};