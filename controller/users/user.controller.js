const bcryptjs = require('bcryptjs');
const userModel = require("../../models/users/users.model");
const resMessage = require('../../helpers/response.messages.helper');
const commonFun = require('../../helpers/common.functions.helper');

const createUser = async (req, res) => {
    try {
        const isEmailExist = await userModel.isEmailExist(req.body.email);

        // 409 Conflict
        if (isEmailExist.length) return res.status(409).json({ success: false, message: resMessage.EMAIL_EXIST });

        req.body.password = await bcryptjs.hash(req.body.password, 10);
        const newUser = await userModel.createUser(req.body);
        const userDetails = await userModel.selectUser(newUser.insertId);
        delete userDetails[0].password;
        res.status(201).json({ success: true, message: resMessage.USER_CREATE, data: userDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.SERVER_ERROR, error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const isEmailExist = await userModel.isEmailExist(req.body.email);

        // 401 Unauthorized
        if (!isEmailExist.length) return res.status(401).json({ success: false, message: resMessage.INVALID_EMAIL });

        const isPasswordMatch = await bcryptjs.compare(req.body.password, isEmailExist[0].password);

        // 401 Unauthorized
        if (!isPasswordMatch) return res.status(401).json({ success: false, message: resMessage.INVALID_PASS });

        delete isEmailExist[0].password;
        const userData = { ...isEmailExist[0] };

        const token = commonFun.generateToken(userData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = commonFun.generateToken(userData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

        res.status(200).json({ success: true, message: resMessage.LOGIN, data: { ...userData, token, refreshToken } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: resMessage.LOGIN_FAILED, error: error.message });
    }
};

const listUser = async (req, res) => {
    try {
        const userList = await userModel.selectUserList();
        res.status(200).json({ success: true, message: resMessage.DATA_FOUND, data: userList });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.SERVER_ERROR, error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const user = await userModel.selectUser(req.params.id);
        // 404 Not Found
        if (!user) return res.status(404).json({ success: false, message: resMessage.NO_DATA_FOUND });

        res.status(200).json({ success: true, message: resMessage.DATA_FOUND, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.SERVER_ERROR, error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userModel.selectUser(req.params.id);
        // 404 Not Found
        if (!user.length) return res.status(404).json({ success: false, message: resMessage.INVALID_ID });
        console.log(req.file)
        
        await userModel.updateUser(req.params.id, req.body);

        res.status(200).json({ success: true, message: resMessage.UPDATE_SUCC });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.UPDATE_FAILED, error: error.message });
    }
};

const updateUserMulti = async (req, res) => {
    try {
        const user = await userModel.selectUser(req.params.id);
        // 404 Not Found
        if (!user.length) return res.status(404).json({ success: false, message: resMessage.INVALID_ID });
        console.log(req.files)
        await userModel.updateUser(req.params.id, req.body);

        res.status(200).json({ success: true, message: resMessage.UPDATE_SUCC });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.UPDATE_FAILED, error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.selectUser(req.params.id);
        // 404 Not Found
        if (!user.length) return res.status(404).json({ success: false, message: resMessage.INVALID_ID });

        await userModel.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: resMessage.DELETE_SUCC });
    } catch (error) {
        res.status(500).json({ success: false, message: resMessage.DELETE_FAILED, error: error.message });
    }
};

module.exports = {
    createUser,
    listUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    updateUserMulti
}