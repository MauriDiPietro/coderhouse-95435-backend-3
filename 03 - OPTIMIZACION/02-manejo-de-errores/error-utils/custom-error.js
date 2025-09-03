export class NotFound extends Error{
    constructor(message){
        super(message)
        this.name = 'NotFound'
    }
}

export class Unauthorized extends Error{
    constructor(message){
        super(message)
        this.name = 'Unauthorized'
    }
}

export class CustomError extends Error{
    constructor(message, status = 500){
        super(message)
        this.status = status
    }

}