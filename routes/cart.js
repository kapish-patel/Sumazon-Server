const { getCartByCustomerId, createOrUpdateCart, removeProductFromCart } = require('../repositories/cartRepository')
const { Router } = require('express');
const router = Router();

// get cart of a customer
router.get('/:id', (req, res, next) =>{
    const customerId = req.params.id;
    getCartByCustomerId(customerId).then((cart) => {
        res.json(cart);
    }).catch((err) => {
        res.json(err);
    });
});

// create or update cart of a customer
router.post('/', (req, res, next) => {
    createOrUpdateCart(req).then((cart) => {
        res.status(201).json({status: true, data: cart});
    }).catch((err) => {
        res.json(err);
    });
});

// remove product from cart
router.delete('/', (req, res, next) => {
    removeProductFromCart(req).then((cart) => {
        res.status(200).json({status: true, data: cart});
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;