const userModel = require('../models/userModel.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const dbConnection = require('../dbconnection.js');
const express = require('express');
const router = express.Router();


router.get('/auth/google', passport.authenticate('google'));