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

// Update a customer
async function updateCustomer(req) {
    try {
        console.log('req.body:', req.body);
        const { name, email, phone, address, password, originalEmail } = req.body;

        // Assuming getCustomer is an async function that fetches a customer by email
        const existingCustomer = await getCustomer(email);

        // check if the customer exists and the email is not the same as the original email
        if (existingCustomer && existingCustomer.id !== id) {
            console.log('Customer already exists');
            return null;
        }

        const customer = await getCustomer(originalEmail);

        if (!customer) {
            return null;
        }

        // Update customer fields
        customer.name = name || customer.name;
        customer.phone = phone || customer.phone;
        customer.email = email || customer.email;
        customer.address = address || customer.address;
        customer.password = password || customer.password;

        // Save the updated customer object back to the database
        const updatedCustomer = await customer.save();
        return updatedCustomer;
    } catch (error) {
        console.error('Error updating customer:', error);
        return null;
    }
}


module.exports = { addCustomer, loginCustomer, getCustomer, updateCustomer };
