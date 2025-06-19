import mongoose from 'mongoose';
import dev from '../config/env.config.js'
const { host, port, name } = dev.db;
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = `mongodb`) {
    mongoose
      .connect(connectString)
      .then((_) => console.log(`Connect Mongodb Success`))
      .catch((err) => console.log(`Error Connect: ${err.message}!!`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export default Database;
