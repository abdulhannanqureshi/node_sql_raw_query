const jwt = require('jsonwebtoken');
const resMessage = require('../helpers/response.messages.helper');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ status: false, msg: resMessage.NOT_PROVIDED_TOKEN });

    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
        if (err) return res.status(403).json({ status: false, msg: resMessage.INVALID_TOKEN });
        req.userData = userData;
        next();
    });
};

module.exports = {
    verifyToken
}