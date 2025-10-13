import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const productSchemaBody = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(). min(5).max(50).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().required()
})

const productSchemaParams = Joi.object({
    id: Joi.string().min(10).required()
})

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const { error } = productSchemaBody.validate(req.body, { abortEarly: false })
    error ? res.status(400).send(error) : next()
}

export const validateParams = (req: Request, res: Response, next: NextFunction) => {
    const { error } = productSchemaParams.validate(req.params, { abortEarly: false })
    error ? res.status(400).send(error) : next()
}