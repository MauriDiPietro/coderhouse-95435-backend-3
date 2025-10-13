import { Document } from "mongoose";

export type UserInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  role?: string;
};

export type UserDB = UserInput & Document;
