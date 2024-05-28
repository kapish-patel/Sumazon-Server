
const cartModel = require('../models/cartModel');
const productModel = require('../models/productsModel');

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

// function to complete the checkout cart
async function checkoutCart(req){
    const { id } = req.body;
    const filter = { customer_id: id };

    try {
        let cart = await cartModel.findOne(filter).exec();
        if (cart) {
            // reduce the quantity of each product in the cart from the product document
            for (const [product_id, quantity] of cart.cart.entries()) {
                console.log('product_id:', product_id);
                const product = await productModel.findOne({ product_id: product_id }).exec();
                if (product) {
                    product.quantity -= quantity;
                    await product.save();
                }
            }
            cart.cart.clear();
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

module.exports = {getCartByCustomerId, createOrUpdateCart, removeProductFromCart, checkoutCart};