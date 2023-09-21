import { Router } from 'express';
import UserController from '../controllers/user.controller';

class UserRoutes extends UserController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.route('/').post(this.create);
  }
}

export default UserRoutes;
