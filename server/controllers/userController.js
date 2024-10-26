const getUserInfoFromToken = require('../helpers/getUserInfoFromToken');
const { hashPassword, comparePassword } = require('../helpers/hashPassword');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userDetails = async (req, res) => {
    try {
        const token = req.cookies.token || "";

        const user = await getUserInfoFromToken(token);
        if (user.logout) {
            return res.status(401).json({
                message: user.message,
                error: true
            });
        }

        return res.status(200).json({
            message: "User details",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

const updateUserDetail = async (req, res) => {
    try {
        const token = req.cookies.token || "";
        const { name, profile_pic } = req.body;

        const user = await getUserInfoFromToken(token);

        await userModel.updateOne(
            { _id: user._id },
            {
                name: name,
                profile_pic: profile_pic
            }
        );

        const userInfo = await userModel.findById(user._id).select('-password');

        return res.json({
            message: "User updated successfully",
            data: userInfo,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = {
    userDetails,
    updateUserDetail
}