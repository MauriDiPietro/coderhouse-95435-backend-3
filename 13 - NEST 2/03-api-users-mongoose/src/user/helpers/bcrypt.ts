import { compareSync, hashSync } from "bcryptjs"

export const createHash = (password: string) => hashSync(password, 10);

export const isValidPass = (passwordPlain: string, passwordHash: string) => compareSync(passwordPlain, passwordHash);