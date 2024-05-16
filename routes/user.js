// all the user routes are defined here
const { addUser, userLogin, updateUser } = require('../repositories/userRepository');
const { Router } = require('express');
const router = Router();

// get a specific user
router.post('/login', function (req, res, next) {
    userLogin(req).then((user) => {
        if (!user) {
            res.status(401).json({validity: false});
        } else {
            res.status(200).json({validity: true, user: user});
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
router.patch('/:email', function (req, res, next) {
    updateUser(req).then((user) => {
        if (!user) {
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json({message: "User updated", user: user});
        }
    }).catch((err) => {
        res.json(err);
    });
});

// delete a user
router.delete('/:id', function (req, res, next) {
    res.json("delete a user");
});

module.exports = router;