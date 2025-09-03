import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import {
  CustomError,
  NotFound,
  Unauthorized,
} from "./error-utils/custom-error.js";
import { httpResponse } from "./utils/http-response.js";
import {
  NotFoundError,
  UnauthorizedError,
} from "./error-utils/error-helpers.js";
import { asyncHandler } from "./utils/async-handler.js";

const app = express();

app.get("/products", (req, res) => {
  //.........
  // throw new Unauthorized('No esta autorizado')
  // const user = {
  //     name: 'Juan',
  //     role: 'admin'
  // }
  // return httpResponse.Ok(res, user)
  // throw new CustomError('Producto no encontrado', 404)
  // throw UnauthorizedError()
  throw NotFoundError();
});

const controller = asyncHandler((req, res, next) => {
  return httpResponse.Ok(res, "ok");
});

app.get("/", controller);

app.use(errorHandler);

app.listen(8080, () => console.log("server ok"));
