const Joi = require("joi");

const authSchema = {
signUpSchema : Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().max(300).lowercase().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
}),

loginSchema : Joi.object({
    email: Joi.string().max(300).lowercase().required(),
    password: Joi.string().required(),
})


};

export default authSchema;
