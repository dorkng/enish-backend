import { Router } from 'express';
import ReservationController from '../controllers/reservation.controller';

class ReservationRoutes extends ReservationController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.route('/').post(this.create).get(this.index);

    this.router
      .route('/:id')
      .get(this.get)
      .put(this.update)
      .delete(this.delete);
  }
}

export default ReservationRoutes;
