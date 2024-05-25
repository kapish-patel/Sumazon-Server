
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

// get a specific user
async function userLogin(req){
    const {email, password} = req.body;
    const user = await getUser(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
};

// get a user
async function getUser(email){
    const filter = {email:email};
    const user = await userModel.findOne(filter).exec();
    return user;
}

// create a new user
async function addUser(req){
    const {email, password, userName} = req.body;
    const user_id = uuidv4();

    // check if the email already exists
    const user = await getUser(email);
    if (user == null) {
        const newUser = new userModel({
            user_id: user_id,
            user_oauth_id: '',
            userAvtar_url: '',
            email: email,
            password: password,
            name: userName,
            phone: ''
        });
        await newUser.save();
        return newUser;
    }
    return null;
}


async function updateUser(req) {
    try {
        const originalEmail = req.params.email;
        const { email, name, phone, id, password } = req.body;

        // Validation: Ensure the necessary fields are provided
        if (!email || !name || !phone || !id) {
            return null
        }
        console.log(email, name, phone, id, originalEmail)
        const existingUser = await getUser(email);

        // Check if another user with the same email exists
        if (existingUser && existingUser.user_id !== id) {
            console.log('User with email already exists');
            return null;
        }
        
        // Assuming getUser is an async function that fetches a user by email
        const user = await getUser(originalEmail);
        
        if (!user) {
            return null;
        }

        // Update user fields
        user.name = name;
        user.phone = phone;
        user.email = email;
        user.password = password || user.password;

        // Save the updated user object back to the database
        await user.save();

        // Send a success response to the client
        return user;

    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating user:', error);
        return null;
    }
}



module.exports = {userLogin, addUser, getUser, updateUser};