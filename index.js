require('dotenv').config();
const config = require("./config/config");
const express = require('express');
const App = express();
App.use(express.json());
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST_NAME || "http://localhost";


//Home Route
App.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

//get all user route
const userRoute =require("./routers/userRoute")
App.use('/api',userRoute)
//when not found 
App.get('*', (req, res) => {
    res.status(404).send({ success: false, message: "404 not found" })
});

const serverStart = async () => {
await config.connectDatabase();
    try {
        App.listen(PORT, () => {
            console.log(`Server is listen on link ${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

serverStart();