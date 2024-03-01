import { NextFunction, Request, Response } from "express";
import loggerHandler from "../utils/logger/loggerHandler";
const checkRequest = async (req: Request, _res: Response, next: NextFunction) => {
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    loggerHandler.requestLogger(url, method, ip);
    next();
}

export {
    checkRequest
}