"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPass = exports.createHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const createHash = (password) => (0, bcryptjs_1.hashSync)(password, 10);
exports.createHash = createHash;
const isValidPass = (passwordPlain, passwordHash) => (0, bcryptjs_1.compareSync)(passwordPlain, passwordHash);
exports.isValidPass = isValidPass;
//# sourceMappingURL=bcrypt.js.map