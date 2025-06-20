import Joi from "joi";

export const createUser = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .allow(""),
  avatar: Joi.string().optional().allow(""),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});

// Update schema - không cho phép null values
export const updateUser = Joi.object({
  name: Joi.string().min(2).max(50).optional().not(null),
  username: Joi.string().min(2).max(30).optional().not(null),
  email: Joi.string().email().optional().not(null),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .allow("")
    .not(null),
  avatar: Joi.string().optional().allow("").not(null),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional().not(null),
  isDeleted: Joi.boolean().optional().not(null),
});