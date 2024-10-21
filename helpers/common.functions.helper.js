const db = require('../config/db');
const jwt = require('jsonwebtoken');

const runSQLquery = (que) => {
    return new Promise((resolve, reject) => {
        db.query(que, (err, response) => {
            if (response) resolve(response);
            else reject(err);
        });
    });
}

const generateToken = (data, secret, expTime) => {
    return jwt.sign(data, secret, expTime);
}  

module.exports = {
    runSQLquery,
    generateToken
}