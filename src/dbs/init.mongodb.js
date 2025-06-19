import mongoose from 'mongoose';
import dev from '../config/env.config.js'
const { host, port, name } = dev.db;
const connectString = `mongodb://${host}:${port}/${name}`;

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
