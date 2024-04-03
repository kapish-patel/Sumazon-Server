// all the routes for the checkout page

var express = require('express');
var router = express.Router();

// GET checkout page
router.get('/', function(req, res, next) {
    res.json("respond with a checkout page");
});

// create a new order
router.post('/', function(req, res, next) {
    res.json("create a new order");
});

// update an order
router.put('/:id', function(req, res, next) {
    res.json("update an order");
});

// delete an order
router.delete('/:id', function(req, res, next) {
    res.json("delete an order");
});
