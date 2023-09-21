import { Model } from 'mongoose';
import { ReservationAttributeI } from '../interfaces/reservation.interface';
import ReservationUtil from '../utils/reservation.util';
import { ConflictError, NotFoundError } from '../errors';
import Reservation from '../db/models/reservation.model';

class ReservationService {
  private reservationModel: Model<ReservationAttributeI>;

  private reservationUtil: ReservationUtil;

  constructor() {
    this.reservationModel = Reservation;
    this.reservationUtil = new ReservationUtil();
  }

  async create(data: unknown): Promise<ReservationAttributeI> {
    // validate reservation data
    const attributes =
      await this.reservationUtil.createReservationSchema.validateAsync(data);

    const { date, time } = attributes;

    await this.checkIfAlreadyReserved(date, time);

    // create a new reservation
    const newReservation = new this.reservationModel(attributes);

    // save the new reservation to the database
    const savedReservation = await newReservation.save();
    return savedReservation;
  }

  async getById(id: string): Promise<ReservationAttributeI> {
    const reservation = await this.reservationModel.findById(id);

    if (!reservation) {
      throw new NotFoundError('Reservation not found.');
    }

    return reservation;
  }

  async getAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<{
    result: ReservationAttributeI[];
    totalCount: number;
  }> {
    const options = {
      limit,
      offset,
    };

    const [reservations, totalCount] = await Promise.all([
      this.reservationModel.find({}).skip(offset).limit(limit).exec(),
      this.reservationModel.countDocuments({}).exec(),
    ]);

    return { result: reservations, totalCount };
  }

  async update(id: string, data: unknown): Promise<ReservationAttributeI> {
    // validate data to be updated
    const attributes =
      await this.reservationUtil.createReservationSchema.validateAsync(data);

    const { date, time } = attributes;

    const reservation = await this.getById(id);

    if (reservation.date !== date || reservation.time !== time) {
      await this.checkIfAlreadyReserved(date, time);
    }

    const updatedReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      attributes,
      { new: true },
    );

    return updatedReservation;
  }

  async delete(id: string): Promise<void> {
    const deletedReservation =
      await this.reservationModel.findByIdAndDelete(id);

    if (!deletedReservation) {
      throw new NotFoundError('Reservation not found.');
    }
  }

  private async checkIfAlreadyReserved(
    date: string,
    time: string,
  ): Promise<void> {
    const reservation = await this.reservationModel.findOne({
      date,
      time,
    });

    if (reservation) {
      throw new ConflictError('This date and time is already reserved.');
    }
  }
}

export default new ReservationService();
