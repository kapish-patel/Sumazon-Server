const productModel = require('../models/productsModel');
const { v4: uuidv4 } = require('uuid');

const categoryIdToNameMap = {
    "8": "Male Clothing & Accessories",
    "4": "Female Clothing & Accessories",
    "7": "Kids & Toys",
    "9": "Sports & Fitness",
    "3": "Electronics & Technology",
    "6": "Home & Lifestyle",
    "1": "Pets & Animals",
    "5": "Health & Wellness",
    "2": "DIY & Industrial",
    "10": "Automotive & Vehicle"
};

function getCategoryId(categoryName) {
    for (const [id, name] of Object.entries(categoryIdToNameMap)) {
        if (name === categoryName) {
            return id;
        }
    }
    return null; // return null if the category name is not found
}

// get all the products
async function getAllProducts() {
    try {
        const allItems = await productModel.find().exec(); // Fetch all products

        // Transform each product with additional async category lookup
        const transformedItems = allItems.map(item => ({
            id: item.product_id,
            productName: item.title,
            image: item.imgUrl,
            quantity: item.quantity,
            price: item.price,
            description: item.description,
            category: categoryIdToNameMap[item.category_id] || "Unassigned",
            ratings: item.stars,
            bestSeller: item.isBestSeller,
        }));
        return transformedItems;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Throw error to handle it elsewhere if needed
    }
}

// get all the document
async function getProducts(userId) {
    try {
        const filter = { seller_id: userId }
        const allItems = await productModel.find(filter).exec(); // Fetch all products

        // Transform each product with additional async category lookup
        const transformedItems = allItems.map(item => ({
            id: item.product_id,
            productName: item.title,
            quantity: item.quantity,
            price: item.price,
            description: item.description,
            category: categoryIdToNameMap[item.category_id] || "Unassigned",
            ratings: item.stars,
            bestSeller: item.isBestSeller,
        }));
        return transformedItems; // Return transformed product array
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Throw error to handle it elsewhere if needed
    }
}


// get a specific product
async function getProductById(DID) {
    try {
        const filter = { product_id: DID }
        const item = await productModel.findOne(filter).exec(); // Fetch all products

        // Transform each product with additional async category lookup
        const transformedItems = {
            id: item.product_id,
            productName: item.title,
            productImage: item.imgUrl,
            quantity: item.quantity,
            price: item.price,
            description: item.description,
            category: categoryIdToNameMap[item.category_id] || "Unassigned",
            ratings: item.stars,
            bestSeller: item.isBestSeller,
        };
        return transformedItems; // Return transformed product array
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Throw error to handle it elsewhere if needed
    }
}

// add a new document
async function addProduct(req) {
    const { name, description, price, quantity, category, image, userId } = req.body;
    console.log(req.body)
    const product_id = uuidv4();

    const new_Document = new productModel({
        product_id: product_id,
        title: name,
        quantity: parseInt(quantity) || 0,
        price: parseFloat(price) || 0.0,
        description: description,
        category_id: getCategoryId(category),
        imgUrl: image,
        stars: 0,
        isBestSeller: false,
        seller_id: userId
    });
    console.log(new_Document)
    const newdoc = await new_Document.save();

    // transform the document and return it

    const transformedItems = {
        id: newdoc.product_id,
        productName: newdoc.title,
        productImage: newdoc.imgUrl,
        quantity: newdoc.quantity,
        price: newdoc.price,
        description: newdoc.description,
        category: categoryIdToNameMap[newdoc.category_id] || "Unassigned",
        ratings: newdoc.stars,
        bestSeller: newdoc.isBestSeller,
    };

    return transformedItems;
}

// remove a document
async function deleteProduct(req) {
    const filter = { product_id: req.params.id }
    const deletedProduct = await productModel.findOneAndDelete(filter).exec();
    return deletedProduct !== null;
}

// update a document
async function updateProduct(req) {
    const filter = { product_id: req.params.id }
    const update = {
        title: req.body.productName || product.productName,
        quantity: req.body.quantity || product.quantity,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        imgUrl: req.body.productImage || product.image,
    }
    console.log(update)
    const updatedProduct = await productModel.findOneAndUpdate(filter, update, { new: true }).exec();
    return updatedProduct;
}


module.exports = { getAllProducts, getProducts, getProductById, updateProduct, deleteProduct, addProduct, getCategoryId };