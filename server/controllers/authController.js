const { hashPassword, comparePassword } = require('../helpers/hashPassword');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const checkEmail = await userModel.findOne({ email }).select('-password');

        if (!checkEmail) {
            return res.status(400).json({
                message: "User does not exist",
                error: true
            });
        }

        return res.status(200).json({
            message: "Email verified",
            success: true,
            data: checkEmail
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body;

        const checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                message: "User already exists",
                error: true
            });
        }

        const hashedPassword = await hashPassword(password);

        const payload = {
            name,
            email,
            profile_pic,
            password: hashedPassword
        };

        const user = new userModel(payload);
        const userSave = await user.save();

        return res.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

const checkPassword = async (req, res) => {
    try {
        const { password, userId } = req.body;

        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Password does not match",
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};



const logout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now())
        };

        return res.cookie('token', '', cookieOptions).status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = {
    checkEmail,
    register,
    checkPassword,
    logout
};
