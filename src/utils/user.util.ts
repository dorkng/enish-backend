import Joi from 'joi';

class UserUtil {
  public createUserSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string()
      .min(8) // Minimum password length
      .max(30) // Maximum password length
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      )
      .required()
      .label('Password'), // At least 1 lowercase, 1 uppercase, 1 digit, 1 special character
  });
}

export default UserUtil;
