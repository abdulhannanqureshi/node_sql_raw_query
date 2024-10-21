const Joi = require('joi');

const validateCreateUser = (req, res, next) => {
    const { error } = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        dob: Joi.string()
    }).validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, details: error.details });
    }
    next();
};

const validateLoginSchema = (req, res, next) => {
    const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, details: error.details });
    }
    next();
};

const validateUserIdSchema = (req, res, next) => {
    const { error } = Joi.object({
        id: Joi.number().required()
    }).validate(req.params);

    if (error) {
        return res.status(400).json({ message: error.message, details: error.details });
    }
    next();
};

module.exports = {
    validateCreateUser,
    validateLoginSchema,
    validateUserIdSchema
}