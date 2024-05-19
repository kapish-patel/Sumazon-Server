const express = require('express');
const router = express.Router();
const {addCustomer, getCustomer, loginCustomer} = require('../repositories/customerRepository');

router.get('/:email', async (req, res) => {
    res.json("Get customer by email")
});

// create a new customer
router.post('/', async (req, res) => {
    addCustomer(req).then(() => {
        res.status(201).json("Customer created");
    }).catch((err) => {
        res.json(err);
    });
});

// login a customer
router.post('/login', async (req, res) => {
    loginCustomer(req).then((customer) => {
        if (customer) {
            res.status(200).json({status: true, data: customer});
        } else {
            res.status(401).json({status: false});
        }
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;