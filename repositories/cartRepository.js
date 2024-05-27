const e = require('express');
const cartModel = require('../models/cartModel');

// get cart of a customer
async function getCartByCustomerId(customerId){
    const cartModel = await cartModel.findOne({customer_id: customerId}).exec();
    return cart;
}

// create or update cart of a customer
async function createOrUpdateCart(req){
    const { id, customer_id, quantity } = req.body;
    const filter = { customer_id: customer_id };

    try {
        let cart = await cartModel.findOne(filter).exec();
        if (cart) {
            cart.cart.set(id, quantity);  // `id` is the product_id here
            await cart.save();
            const newCart = await cartModel.findOne(filter).exec();
            return newCart;
        } else {
            console.log('Creating new cart');
            const newCart = new cartModel({
                customer_id: customer_id,
                cart: { [id]: quantity }  // `id` is the product_id here
            });
            console.log('newCart:', newCart);
            await newCart.save();
            return newCart;
        }
    } catch (error) {
        console.error('Error creating or updating cart:', error);
        throw error;
    }
}

// remove product from cart
async function removeProductFromCart(req){
    const { id, customer_id } = req.body;
    const filter = { customer_id: customer_id };

    try {
        let cart = await cartModel.findOne(filter).exec();
        if (cart) {
            cart.cart.delete(id);  // `id` is the product_id here
            await cart.save();
            const newCart = await cartModel.findOne(filter).exec();
            return newCart;
        } else {
            console.log('Cart not found');
            return null;
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
}

module.exports = {getCartByCustomerId, createOrUpdateCart, removeProductFromCart};