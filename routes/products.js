// Description: This file contains the routes for the products API.

const { getAllProducts, getProducts, getProductById, updateProduct, deleteProduct, addProduct } = require('../repositories/productsRepository');
const { Router } = require('express');
const router = Router();

// GET products listing
router.get('/', (req, res, next) => {
    getAllProducts().then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get all products for a specific user
router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId
    getProducts(userId).then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get a specific product
router.get('/detail/:id', (req, res, next) => {
    //get the product with the id from query parameter
    const id = req.params.id;
    console.log(id)
    getProductById(id).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});


// create a new product
router.post('/', (req, res, next) => {
    addProduct(req).then((item) => {
        item ? res.json(item) : res.status(400).send('Bad Request');
    }).catch((err) => {
        res.json(err);
    });
});

// update a product
router.put('/:id', (req, res, next) => {
    updateProduct(req).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});

// delete a product
router.delete('/:id', (req, res, next) => {
    deleteProduct(req).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;
