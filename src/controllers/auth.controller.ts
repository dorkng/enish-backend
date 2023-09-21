import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import serverConfig from '../config/server.config';
import authService from '../services/auth.service';

export default class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;

      // retrive user and token from body
      const data = await authService.login(body);

      // return user & token in response
      return res.status(200).json({
        message: 'User logged in successfully.',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG('Error in auth login controller method:', error);
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { user } = req;

      // return user in response
      return res.status(200).json({
        message: 'User retrieved successfully.',
        data: user,
      });
    } catch (error) {
      serverConfig.DEBUG('Error in auth me controller method:', error);
      next(error);
    }
  }
}
