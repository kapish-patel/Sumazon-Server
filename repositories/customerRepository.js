const customerModel = require('../models/customerModel');
const { v4: uuidv4 } = require('uuid');

// get a specific customer by email
async function getCustomer(email) {
    const filter = { email: email };
    const customer = await customerModel.findOne(filter).exec();
    return customer;
}

//add a new customer
async function addCustomer(req) {
    const { email, name, password } = req.body;
    const customer_id = uuidv4();
    const newCustomer = new customerModel({
        id: customer_id,
        email: email,
        name: name,
        phone: '',
        password: password,
        address: '',
        previous_order: []
    });
    console.log('newCustomer:', newCustomer);
    try {
        await newCustomer.save();
        return true;
    } catch (error) {
        console.error('Error saving customer:', error);
        return false;
    }
}

// login a customer
async function loginCustomer(req){
    const {email, password} = req.body;
    const customer = await getCustomer(email);
    if (customer && customer.password === password) {
        return customer;
    }
    return null;
}

module.exports = { addCustomer, loginCustomer, getCustomer };