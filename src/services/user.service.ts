import { Model } from 'mongoose';
import { UserAttributeI } from '../interfaces/user.interface';
import { ConflictError } from '../errors';
import UserUtil from '../utils/user.util';
import bcryptUtil from '../utils/bcrypt.util';
import User from '../db/models/user.model';

class UserService {
  private userModel: Model<UserAttributeI>;

  private userUtil: UserUtil;

  constructor() {
    this.userModel = User;
    this.userUtil = new UserUtil();
  }

  async create(data: unknown): Promise<UserAttributeI> {
    // validate user data
    const { email, password } =
      await this.userUtil.createUserSchema.validateAsync(data);

    // check if user already exists
    await this.checkIfUserExists(email);

    // generate hased password
    const hashedPassword = bcryptUtil.hashPassword(password);

    // define attributes
    const attributes = {
      email,
      password: hashedPassword,
    };

    // Create a new user with the hashed password
    const newUser = new this.userModel(attributes);

    // Save the user to the database
    const savedUser = await newUser.save();

    // retrieve user without password
    const retrivedUser = this.getWithoutPassword(savedUser);
    return retrivedUser;
  }

  async findByEmail(email: string): Promise<UserAttributeI | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  getWithoutPassword(user: UserAttributeI): UserAttributeI {
    const userWithoutPassword = Object.assign({}, user.toObject());

    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictError('A user with this email already exists.');
    }
  }
}

export default new UserService();
