import User from '../db/models/user.model';
import { ConflictError } from '../errors';
import { UserAttributeI } from '../interfaces/user.interface';
import authUtil from '../utils/auth.util';
import bcryptUtil from '../utils/bcrypt.util';
import userService from './user.service';

class AuthService {
  async login(data: unknown): Promise<{ user: UserAttributeI; token: string }> {
    // validate login data
    const { email, password } =
      await authUtil.loginUserSchema.validateAsync(data);

    const user = await userService.findByEmail(email);

    if (!user) {
      throw new ConflictError('Email/password is incorrect');
    }

    if (!bcryptUtil.validatePassword(user, password)) {
      throw new ConflictError('Email/password is incorrect');
    }

    const userWithoutPassword = userService.getWithoutPassword(user);

    // hash user without password data
    const token = authUtil.generateAccessToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }
}

export default new AuthService();
