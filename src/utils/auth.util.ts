import Joi from 'joi';
import serverConfig from '../config/server.config';
import { DecodedToken } from '../interfaces/auth.interface';
import { UserAttributeI } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

class AuthUtil {
  public loginUserSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });

  public generateAccessToken(user: UserAttributeI): string {
    const accessToken = jwt.sign(user, serverConfig.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn: serverConfig.JWT_EXPIRES_IN,
    });
    return accessToken;
  }

  public verifyToken(token: string): DecodedToken {
    try {
      const payload = jwt.verify(
        token,
        serverConfig.JWT_SECRET,
      ) as unknown as UserAttributeI;

      return {
        payload,
        expired: false,
      };
    } catch (error) {
      return {
        payload: null,
        expired: error.message.includes('expired') ? error.message : error,
      };
    }
  }
}

export default new AuthUtil();
