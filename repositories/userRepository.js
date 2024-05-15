
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');
const { name } = require('ejs');

// get a specific user
async function userLogin(req){
    const {email, password} = req.body;
    const filter = {email:email};
    const user = await userModel.findOne(filter).exec();
    if (email === user.email && password === user.password){
        console.log(user);
        return user;
    }
};

// create a new user
async function addUser(req){
    const {email, password, userName} = req.body;
    const user_id = uuidv4();
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
}


module.exports = {userLogin, addUser};