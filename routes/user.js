// all the user routes are defined here

var express = require('express');
var router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
    res.json("respond with a resource");
});

// get a specific user
router.get('/:id', function(req, res, next) {
    res.json("respond with a specific user");
});

// create a new user
router.post('/', function(req, res, next) {
    res.json("create a new user");
});

// update a user
router.put('/:id', function(req, res, next) {
    res.json("update a user");
});

// delete a user
router.delete('/:id', function(req, res, next) {
    res.json("delete a user");
});
