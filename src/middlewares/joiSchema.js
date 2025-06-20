import { BadRequestError } from '../utils/error.response.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      throw new BadRequestError(message);
    }
    
    next();
  };
};