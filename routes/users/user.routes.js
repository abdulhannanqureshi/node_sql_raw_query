const express = require('express');
const routes = express.Router();
const controller = require('../../controller/users/user.controller');
const { verifyToken } = require('../../middleware/verify.token.middleware');
const { uploadImage } = require('../../middleware/upload.middleware');
const { validateCreateUser, validateUserIdSchema, validateLoginSchema, validateUpdateUser } = require('../../validations/user.validations');

routes.post('/create', validateCreateUser, controller.createUser);
routes.post('/login', validateLoginSchema, controller.loginUser);
routes.get('/list', verifyToken, controller.listUser);
routes.get('/user/:id', verifyToken, validateUserIdSchema, controller.getUser);
routes.put('/update/:id', verifyToken, validateUpdateUser, uploadImage.single('image'), controller.updateUser);
routes.put('/updateMulti/:id', verifyToken, validateUpdateUser, uploadImage.any(), controller.updateUserMulti);
routes.delete('/delete/:id', verifyToken, validateUserIdSchema, controller.deleteUser);

module.exports = routes;    