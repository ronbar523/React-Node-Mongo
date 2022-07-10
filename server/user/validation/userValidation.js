const joi = require('joi')

const loginSkeleton = {
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}

const registerSkeleton = {
  ...loginSkeleton,
  isAdmin: joi.boolean(),
  userName: joi.string().min(2).max(10).required(),
};


const loginSchema = joi.object(loginSkeleton);
const registerSchema = joi.object(registerSkeleton);


module.exports = {
  loginSchema,
  registerSchema,
};