// all the user routes are defined here
const e = require('express');
const { addUser, userLogin, updateUser, getUser } = require('../repositories/userRepository');
const { Router } = require('express');
const router = Router();

// userLogin
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

// get a specific user
router.get('/:email', function (req, res, next) {
    const email = req.params.email;
    getUser(email).then((user) => {
        if (user == null) {
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json({message: "User found", user: user});
        }
    }).catch((err) => {
        res.json(err);
    });
});


// create a new user
router.post('', function (req, res, next) {
    addUser(req).then((user) => {
        if (user == null) {
            res.status(409).json({message: "User already exists"});
        } else {
            res.status(201).json({message: "User created"});
        }
    }).catch((err) => {
        res.json(err);
    });
});

// update a user
router.patch('/:email', function (req, res, next) {
    updateUser(req).then((user) => {
        if (!user) {
            res.status(404).json({message: "User not updated or user with similar Email exists"});
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