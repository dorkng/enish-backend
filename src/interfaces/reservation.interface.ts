import { Document } from 'mongoose';

export interface ReservationAttributeI extends Document {
  name: string;
  phone: {
    code: string;
    number: string;
  };
  email: string;
  partySize: number;
  depositAmount: number;
  time: string;
  date: string;
}
