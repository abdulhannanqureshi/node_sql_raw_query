const express = require('express');
const routes = express.Router();
const controller = require('../../controller/users/user.controller');
const { verifyToken } = require('../../middleware/verify.token.middleware');
const { validateCreateUser, validateUserIdSchema, validateLoginSchema } = require('../../validations/user.validations');

routes.post('/create', validateCreateUser, controller.createUser);
routes.post('/login', validateLoginSchema, controller.loginUser);
routes.get('/list', verifyToken, controller.listUser);
routes.get('/user/:id', verifyToken, validateUserIdSchema, controller.getUser);
routes.put('/update/:id', verifyToken, validateUserIdSchema, controller.updateUser);
routes.delete('/delete/:id', verifyToken, validateUserIdSchema, controller.deleteUser);

module.exports = routes;