import { Request, Response, NextFunction } from 'express';
import serverConfig from '../config/server.config';
import { BadRequestError, UnauthorizedError } from '../errors';
import userService from '../services/user.service';
import authUtil from '../utils/auth.util';

class AuthMiddleware {
  public async validateUserAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new BadRequestError('No token provided.');

      // remove Bearer from token
      const [, token] = authorization.split(' ');

      if (!token) throw new BadRequestError('No token provided.');

      const { payload, expired } = authUtil.verifyToken(token);

      if (expired) throw new UnauthorizedError('Please provide a valid token.');

      const { email } = payload;

      // find user by email
      const user = await userService.findByEmail(email);

      if (!user) throw new UnauthorizedError('Please provide a valid token.');

      // get user without password
      const userWithoutPassword = userService.getWithoutPassword(user);

      req.user = userWithoutPassword;
      return next();
    } catch (error) {
      serverConfig.DEBUG(
        `Error in authentication middleware validate user access method: ${error}`,
      );
      next(error);
    }
  }
}

export default new AuthMiddleware();
