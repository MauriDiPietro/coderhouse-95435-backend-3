import {
  CustomError,
  NotFound,
  Unauthorized,
} from "../error-utils/custom-error.js";
import { httpResponse } from "../utils/http-response.js";

export const errorHandler = (error, req, res, next) => {
  /*
{
        message: 'error products',
        name: 'Error',
        stack:     at file:///D:/CODERHOUSE/BACKEND/coderhouse-95435-backend-3/03%20-%20OPTIMIZACION/02-manejo-de-errores/server.js:7:11
            at Layer.handleRequest (D:\CODERHOUSE
}
    */
  console.log(error);

  if (error instanceof NotFound) return httpResponse.NotFound(res, error);
  if (error instanceof Unauthorized) return httpResponse.Unauthorized(res, error);
  if (error instanceof CustomError) return httpResponse.CustomError(res, error);

  return httpResponse.ServerError(res, error);
};
