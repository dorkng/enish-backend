import { config } from 'dotenv';
import debug from 'debug';

config();

class ServerConfig {
  public NODE_ENV = process.env.NODE_ENV as string;

  public DEBUG = this.NODE_ENV === 'development' ? debug('dev') : console.log;

  public PORT = Number(process.env.PORT);

  public SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

  public JWT_SECRET = process.env.JWT_SECRET as string;

  public JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

  public ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS as string;

  public MONGODB_URI = process.env.MONGODB_URI as string;

  public EMAIL_HOST = process.env.EMAIL_HOST as string;

  public EMAIL_PORT = Number(process.env.EMAIL_PORT);

  public EMAIL_USER = process.env.EMAIL_USER as string;

  public EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

  public EMAIL_SENDER = process.env.EMAIL_SENDER as string;
}

export default new ServerConfig();
