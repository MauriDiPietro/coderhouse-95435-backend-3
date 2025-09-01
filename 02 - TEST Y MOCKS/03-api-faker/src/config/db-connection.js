import config from "./config.js";
import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    await connect(config.MONGO_URL);
  } catch (error) {
    throw new Error(error);
  }
};
