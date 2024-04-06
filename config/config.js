const mongoose = require('mongoose');

module.exports.connectDatabase = async () => {
    try {
        console.log(`your Database ${process.env.DATABASE_NAME} is connected successfully`);
        return mongoose.connect(process.env.DATABASE_URI + process.env.DATABASE_NAME);

    } catch (error) {
        console.log("Database not connected Error:", error);
    }
}