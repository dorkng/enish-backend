import bcrypt from 'bcrypt';
import serverConfig from '../config/server.config';
import { UserAttributeI } from '../interfaces/user.interface';

class BcryptUtil {
  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, serverConfig.SALT_ROUNDS);
  }

  public validatePassword(user: UserAttributeI, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
  }
}

export default new BcryptUtil();
