import { Router, Request, Response } from 'express';
import { NotFoundError } from '../errors';
import serverConfig from '../config/server.config';
import UserRoutes from './user.route';
import ReservationRoutes from './reservation.route';
import AuthRoutes from './auth.route';
import authMiddleware from '../middlewares/auth.middleware';

class Routes {
  public router: Router;

  private authRoutes: AuthRoutes;

  private userRoutes: UserRoutes;

  private reservationRoutes: ReservationRoutes;

  constructor() {
    this.router = Router();
    this.authRoutes = new AuthRoutes();
    this.reservationRoutes = new ReservationRoutes();
    this.userRoutes = new UserRoutes();
    this.routes();
  }

  routes(): void {
    this.router.get('/', (req: Request, res: Response) => {
      return res.status(200).json({
        message: 'Welcome to Enish API',
        data: {
          service: 'enish-api',
          environment: serverConfig.NODE_ENV,
          version: '1.0.0',
        },
      });
    });

    this.router.use('/auth', this.authRoutes.router);

    this.router.use('/user', this.userRoutes.router);

    this.router.use(authMiddleware.validateUserAccess);

    this.router.use('/reservation', this.reservationRoutes.router);

    this.router.use('*', () => {
      throw new NotFoundError('Route not found.');
    });
  }
}

export default new Routes().router;
