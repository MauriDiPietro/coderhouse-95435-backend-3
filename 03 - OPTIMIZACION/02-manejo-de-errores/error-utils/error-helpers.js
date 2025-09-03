import { NotFound, Unauthorized } from "./custom-error.js";

export const UnauthorizedError = (msg = 'No autorizado') => new Unauthorized(msg);

export const NotFoundError = (msg = 'No encontrado') => new NotFound(msg);

