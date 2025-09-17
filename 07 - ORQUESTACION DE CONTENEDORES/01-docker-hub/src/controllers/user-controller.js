import * as userRepository from "../repositories/user-repository.js";

export const createUsers = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await userRepository.createUsersMock(cant);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const response = await userRepository.getUsers();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
