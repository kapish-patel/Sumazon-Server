// Description: This file contains the routes for the products API.

const { getProducts, getProductById, updateProduct, deleteProduct } = require('../repositories/productsRepository');
const { Router } = require('express');
const router = Router();

// GET products listing

// get all products for a specific user
router.get('/:userId', (req, res, next) =>{
    const userId = req.params.userId
    getProducts(userId).then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get a specific product
router.get('/detail/:id', (req, res, next) =>{
    //get the product with the id from query parameter
    const id = req.params.id;
    console.log(id)
    getProductById(id).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});



// // create a new product
// router.post('/', (req, res, next) =>{
//     res.json("create a new product");
// });

// update a product
router.put('/:id', (req, res, next) =>{
    updateProduct(req).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});

// delete a product
router.delete('/:id', (req, res, next) =>{
    deleteProduct(req).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;
