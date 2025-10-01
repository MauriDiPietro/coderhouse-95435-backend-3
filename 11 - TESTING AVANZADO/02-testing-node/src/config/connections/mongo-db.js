import { connect } from "mongoose";

export class ConnectMongoDB {
  static #instance;

  constructor() {
    connect(process.env.MONGO_URL);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("ya está conectado a mongodb");
      return this.#instance;
    }
    this.#instance = new ConnectMongoDB();
    console.log("Conectado a MongoDB!");
    return this.#instance;
  }
}
