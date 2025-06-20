import mongoose from 'mongoose';
import dev from '../config/env.config.js'

const { host, port, name, user, pass } = dev.db;

// Tạo connection string với authentication
const connectString = user && pass 
  ? `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`
  : `mongodb://${host}:${port}/${name}`;

class Mongodb {
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
    if (!Mongodb.instance) {
      Mongodb.instance = new Mongodb();
    }

    return Mongodb.instance;
  }
}

export default Mongodb.getInstance();
