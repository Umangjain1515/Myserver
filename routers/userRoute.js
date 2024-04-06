const express = require('express');
const userRoute = express();
userRoute.use(express.json());
const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
const userController = require('../controllers/userController')

// userController.getAllUser()

userRoute.post('/user/register', userController.registerUser);

userRoute.get('/user/get-all-user', userController.getAllUser);

userRoute.get('/user/user-delete', userController.deleteUser);

module.exports = userRoute