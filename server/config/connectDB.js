const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Can't connect to MongoDB:", error.message);
    }
};

module.exports = connectDB;