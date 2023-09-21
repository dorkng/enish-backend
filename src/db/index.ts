import { connect, set } from 'mongoose';
import serverConfig from '../config/server.config';

class DB {
  public async connect() {
    try {
      set('strictQuery', true);
      await connect(serverConfig.MONGODB_URI);
      serverConfig.DEBUG('Connection establised to database.');
    } catch (error) {
      serverConfig.DEBUG(`Failed to connect to database: ${error}`);
      throw error;
    }
  }
}

export default new DB();
