// Description: This file contains the routes for the products API.

const { getTenDocuments, getDocument } = require('../repositories/productsRepository');
const { Router } = require('express');
const router = Router();

// GET products listing

// get all products
router.get('/', (req, res, next) =>{
    getTenDocuments().then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});

// get a specific product
router.get('/:id', (req, res, next) =>{
    //get the product with the id from query parameter
    const id = req.params.id;

    getDocument(id).then((item) => {
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
