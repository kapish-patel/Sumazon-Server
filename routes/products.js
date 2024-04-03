// all the routes related to products will be in routes/products.js

var products = require('../models/productsmodel');
var express = require('express');
var router = express.Router();

// GET products listing

// get all products
router.get('/', (req, res, next) =>{
    products.getTenDocuments().then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get a specific product
router.get('/:id', (req, res, next) =>{
    products.get_Document(req.params.id).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});

// create a new product
router.post('/', (req, res, next) =>{
    res.json("create a new product");
});

// update a product
router.put('/:id', (req, res, next) =>{
    res.json("update a product");
});

// delete a product
router.delete('/:id', (req, res, next) =>{
    res.json("delete a product");
});


module.exports = router;
