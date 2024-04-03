// Description: This file contains the routes for the products API.

var productsRepository = require('../repositories/productsRepository');
var express = require('express');
var router = express.Router();

// GET products listing

// get all products
router.get('/', (req, res, next) =>{
    console.log(process.env.USER);
    productsRepository.getTenDocuments().then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get a specific product
router.get('/:id', (req, res, next) =>{
    //get the product with the id from query parameter
    const id = req.params.id;

    console.log(id);
    productsRepository.getDocument(id).then((item) => {
        res.json(item);
    }).catch((err) => {
        res.json(err);
    });
});

// // create a new product
// router.post('/', (req, res, next) =>{
//     res.json("create a new product");
// });

// // update a product
// router.put('/:id', (req, res, next) =>{
//     res.json("update a product");
// });

// // delete a product
// router.delete('/:id', (req, res, next) =>{
//     res.json("delete a product");
// });


module.exports = router;
