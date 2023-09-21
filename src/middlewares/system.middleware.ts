import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import serverConfig from '../config/server.config';
import { SystemError } from '../errors';

class SystemMiddleware {
  public async errorHandler(
    error: SystemError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const isProduction = serverConfig.NODE_ENV === 'production';

    const errorCode = error.code || 500;
    let errorMessage: SystemError | object = {};

    if (res.headersSent) {
      next(error);
    }

    if (!isProduction) {
      serverConfig.DEBUG(error.stack);
      errorMessage = error;
    }

    if (error instanceof Joi.ValidationError) {
      return res.status(400).json({
        message: 'Validation error.',
        error: error.details,
      });
    }

    if (errorCode === 500 && isProduction) {
      return res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }

    return res.status(errorCode).json({
      message: error.message,
      error: {
        ...(error.errors && { error: error.errors }),
        ...(!isProduction && { trace: errorMessage }),
      },
    });
  }
}

export default new SystemMiddleware();
