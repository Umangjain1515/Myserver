const userModel = require('../models/userModel');
const helper = require('../utils/helper');
const { ObjectId } = require("mongodb");


module.exports.getAllUser = async (req, res) => {
    try {
        const userName = req.query.name;
        const userEmail = req.query.email;
        const userMobile = req.query.mobile;
        const userAge = req.query.age;
        const userStatus = req.query.status;
        const userRole = req.query.role;

        let findAllusers;
        let conditionObj = {}

        if (userName) {
            conditionObj.name = { $regex: new RegExp(userName, "i") };
        }
        if (userEmail) {
            conditionObj.email = { $regex: new RegExp(userEmail, "i") };
        }
        if (userMobile) {
            conditionObj.mobile = userMobile
        }
        if (userAge) {
            conditionObj.age = userAge
        }
        if (userStatus) {
            conditionObj.status = { $regex: new RegExp(userStatus, "i") };
        }
        if (userRole) {
            conditionObj.role = { $regex: new RegExp(userRole, "i") };
        }
        // console.log(conditionObj);
        findAllusers = await userModel.find(conditionObj)

        res.status(200).send({
            success: true,
            message: "All users list gesuccesfully",
            data: findAllusers,
        });

    } catch (error) {
        console.log("error", error);
        res.status(200).send({ success: false, message: " Not Found" });
    }
}

module.exports.registerUser = async (req, res) => {
    try {

        const userName = req.body.name
        const userEmail = req.body.email
        const createPassword =  req.body.password
        const userMobile = req.body.mobile
        const userRole = req.body.role
        const bcryptPassword = await helper.createPassword(createPassword)
        const firstLetterCapital = await helper.capitalizeFirstLetter(userName)

        const emailExit = await userModel.findOne({ email: userEmail });
        // console.log(emailExit);


        if (emailExit) {

            res.status(200).send({
                success: false,
                message: "This email is already exist",
            })
        } else {
            const setUserData = new userModel(
                {
                    name: firstLetterCapital,
                    email: userEmail,
                    mobile: userMobile,
                    password: bcryptPassword,
                    role: userRole
                }
            )

            const saveData = await setUserData.save()
            res.status(200).send({
                success: true,
                message: firstLetterCapital + ", thank you for register wih us.",

            })
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.query;
        const findUser = await userModel.findOne({ _id: new ObjectId(_id) })
        if (findUser) {
            const deleteUser = await userModel.deleteOne({ _id });

            res.status(200).send({
                success: true,
                message: "User has been delete successfully",
                data: deleteUser
            })
        } else {
            res.status(400).send({
                success: false,
                message: "User can't find"
            });
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
