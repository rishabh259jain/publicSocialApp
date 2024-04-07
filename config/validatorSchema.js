const Joi = require("joi");

// Validate user registration data
const ValidateCreateUser = Joi.object({
  phone: Joi.string().pattern(/^\+[0-9]+$/).optional().messages({
    "string.pattern.base": "Invalid phone number format",
  }),
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .message(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required(),
});

const ValidateSocialLogin = Joi.object({
  provider: Joi.string().valid('google', 'facebook', 'twitter').required(),
  token: Joi.string().required(),
});

const ValidateEmailArray = Joi.object({
  userArr: Joi.array().items(Joi.string().email()).optional(),
});

const ValidateLogin = Joi.object().keys({
  phone: Joi.string().pattern(/^\+[0-9]+$/).optional(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .message(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required(),
});

const ValidateProfile = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+[0-9]+$/).optional(),
  name: Joi.string().optional(),
  bio: Joi.string().max(200).optional().messages({
    "string.max": "Bio should be less than 200 characters",
  }),
  photo: Joi.alternatives()
    .try(
      Joi.string().uri().messages({
        "string.uri": "Provide a valid image URL",
      }),
      Joi.object({
        mimetype: Joi.string()
          .valid("image/png", "image/jpeg", "image/gif")
          .required(),
        size: Joi.number()
          .max(2 * 1024 * 1024)
          .required(),
      }).required()
    )
    .optional()
    .messages({
      "alternatives.types": "Provide either an image URL or upload a file",
    }),
});

exports = module.exports = {
  ValidateCreateUser,
  ValidateLogin,
  ValidateProfile,
  ValidateSocialLogin,
  ValidateEmailArray
};
