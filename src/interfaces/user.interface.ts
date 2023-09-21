import { Document } from 'mongoose';

export interface UserAttributeI extends Document {
  email: string;
  password: string;
}
