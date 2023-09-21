import { model, Schema } from 'mongoose';
import { ReservationAttributeI } from '../../interfaces/reservation.interface';

const reservationSchema: Schema = new Schema<ReservationAttributeI>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      code: { type: String, required: true },
      number: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    partySize: { type: Number, min: 1, required: true },
    depositAmount: { type: Number, min: 0, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true },
);

const Reservation = model<ReservationAttributeI>(
  'Reservation',
  reservationSchema,
);

export default Reservation;
