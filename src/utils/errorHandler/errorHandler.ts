import { NextFunction, Request, Response } from "express";
import loggerHandler from "../logger/loggerHandler";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    loggerHandler.errorLogger('Request error', err);
    return res.status(500).send('Something went wrong');
};
