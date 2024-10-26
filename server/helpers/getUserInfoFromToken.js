const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const getUserInfoFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session out",
            logout: true
        };
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decode.id }).select('-password');
        if (!user) {
            return {
                message: "User not found",
                logout: true
            };
        }

        return user;
    } catch (error) {
        return {
            message: "Invalid token",
            logout: true
        };
    }
}

module.exports = getUserInfoFromToken;