import { Request, Response } from 'express';
import userService from '../services/user.service';
import { UserAttributeI } from '../interfaces/user.interface';
import { NextFunction } from 'connect';
import serverConfig from '../config/server.config';

export default class UserController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body: data } = req;

      // Create the user using the UserService
      const user: UserAttributeI = await userService.create(data);

      // return created user in response
      return res.status(201).json({
        message: 'User created.',
        data: user,
      });
    } catch (error) {
      serverConfig.DEBUG('Error in user create controller method:', error);
      next(error);
    }
  }
}
