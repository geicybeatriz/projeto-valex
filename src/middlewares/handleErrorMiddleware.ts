import { NextFunction, Request, Response} from "express";

const serviceErrorToStatusCode = {
    unauthorized: 401,
    conflict: 409,
    notFound: 404,
    unprocessable: 422
};

export function unauthorizedError() {
    return { type: "unauthorized" };
}

export function unprocessableEntity(){
    return {type: "unprocessable entity"}
}

export default function handleErrorsMiddleware(error: { type: string | number; }, req:Request, res:Response, next:NextFunction) {
    if (error.type) {
        res.sendStatus(serviceErrorToStatusCode[error.type]);
    }

    res.sendStatus(500);
}

