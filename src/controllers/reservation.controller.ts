import { Request, Response } from 'express';
import reservationService from '../services/reservation.service';
import { ReservationAttributeI } from '../interfaces/reservation.interface';
import { NextFunction } from 'connect';
import serverConfig from '../config/server.config';

export default class ReservationController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body: data } = req;

      // Create the reservation using the ReservationService
      const reservation: ReservationAttributeI =
        await reservationService.create(data);

      // return created reservation in response
      return res.status(201).json({
        message: 'Reservation created.',
        data: reservation,
      });
    } catch (error) {
      serverConfig.DEBUG(
        'Error in reservation create controller method:',
        error,
      );
      next(error);
    }
  }

  async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { id },
      } = req;

      // retrieve the reservation using the ReservationService
      const reservation: ReservationAttributeI =
        await reservationService.getById(id);

      // return retrieved reservation in response
      return res.status(200).json({
        message: 'Reservation retrieved.',
        data: reservation,
      });
    } catch (error) {
      serverConfig.DEBUG('Error in reservation get controller method:', error);
      next(error);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        query: { limit, offset },
      } = req;

      // retrieve all reservations using the ReservationService
      const data = await reservationService.getAll(
        limit as unknown as number,
        offset as unknown as number,
      );

      // return retrieved reservations in response
      return res.status(200).json({
        message: 'Reservations retrieved.',
        data,
      });
    } catch (error) {
      serverConfig.DEBUG(
        'Error in reservation index controller method:',
        error,
      );
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { id },
        body: data,
      } = req;

      // update the reservation using the ReservationService
      const reservation: ReservationAttributeI =
        await reservationService.update(id, data);

      // return updated reservation in response
      return res.status(200).json({
        message: 'Reservation updated.',
        data: reservation,
      });
    } catch (error) {
      serverConfig.DEBUG(
        'Error in reservation update controller method:',
        error,
      );
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        params: { id },
      } = req;

      // delete the reservation using the ReservationService
      await reservationService.delete(id);

      // return success message in response
      return res.status(200).json({
        message: 'Reservation deleted.',
      });
    } catch (error) {
      serverConfig.DEBUG(
        'Error in reservation delete controller method:',
        error,
      );
      next(error);
    }
  }
}
