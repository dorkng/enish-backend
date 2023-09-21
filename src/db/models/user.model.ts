import { model, Schema } from 'mongoose';
import { UserAttributeI } from '../../interfaces/user.interface';

const userSchema: Schema = new Schema<UserAttributeI>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = model<UserAttributeI>('User', userSchema);
export default User;
