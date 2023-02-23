import Joi from "@hapi/joi"

const authSchema = {
 signUpSchema : Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().max(300).email().lowercase().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
}),

loginSchema : Joi.object({
    email: Joi.string().max(300).lowercase().required(),
    password: Joi.string().required(),
}),

getQuery : Joi.object({
    id: Joi.string().required()
}),

postAddress: Joi.object({
    full_name: Joi.string().required(),
    userId: Joi.string().required(),
    address: Joi.string().required()
})


};

export default authSchema;
