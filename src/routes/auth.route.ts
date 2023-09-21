import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

class AuthRoutes extends AuthController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router
      .route('/')
      .post(this.login)
      .get(authMiddleware.validateUserAccess, this.me);
  }
}

export default AuthRoutes;
