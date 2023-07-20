import { NextFunction, Request, Response } from "express";
export enum ERRORS {
    INPUT,
    AUTH,
    OTHER
}

export const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
        if ((err as any).type === ERRORS.INPUT) {
            res.status(400);
            res.json({message: "Invalid Inputs ⌨️, please try again 😕"});
        } else if ((err as any).type === ERRORS.AUTH) {
            res.status(400);
            res.json({message: "Cannot Authenticate 🔑, please try again 😕"});
        } else if ((err as any).type === ERRORS.OTHER) {
            res.status(500);
            res.json({message: "Internal Problem 💻, please try again 😕"});
        } else {
            res.status(500);
            res.json({message: "Internal Problem 💻, please try again 😕"});
        }
}

process.on('uncaughtException',() => {
    console.log("UNCAUGHT EXCEPTION !");
})
process.on('unhandledRejection',() => {
    console.log("UNHANDLED REJECTION !");
})