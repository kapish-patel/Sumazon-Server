// all the user routes are defined here
const { addUser, userLogin } = require('../repositories/userRepository');
const { Router } = require('express');
const router = Router();

// get a specific user
router.post('/login', function (req, res, next) {
    userLogin(req).then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json("Invalid credentials");
        }
    }).catch((err) => {
        res.json(err);
    });
});

// create a new user
router.post('', function (req, res, next) {
    addUser(req).then(() => {
        res.status(201).json("User created");
    }).catch((err) => {
        res.json(err);
    });
});

// update a user
router.put('/:id', function (req, res, next) {
    res.json("update a user");
});

// delete a user
router.delete('/:id', function (req, res, next) {
    res.json("delete a user");
});

module.exports = router;