const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
// console.log(process.env);
const path = require('path');
const result = require('dotenv').config({ path:  path.join(__dirname, '../../.env') });


if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    // console.log("Environment variables loaded successfully");
}


const setupDBClient = () => {
    const uri = process.env.URL;
    const uriAtlas = process.env.URL3;

    // console.log("MongoDB URL:", process.env.URL3);
    // console.log(process.env);

    if (!uri) {
        console.error("MongoDB URL is undefined. Please check your .env file.");
        return;
    }
    return mongoose.connect(uriAtlas)
        .then(() => console.log('MongoDB connected'))
        .catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
            setTimeout(setupDBClient, 5000);
        });
};

module.exports = setupDBClient;
