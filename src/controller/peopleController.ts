import { NextFunction, Request, Response } from "express";
import peopleService from "../service/peopleService";
import loggerHandler from "../utils/logger/loggerHandler";
import RedisSetup from "../utils/dbSetup/redisSetup";
class PeopleController {
    public async searchPeople(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.params.key;
            loggerHandler.infoLogger(`Request searchPeople ${key}`);
            const redisClient = new RedisSetup();
            const peopleCash = await redisClient.get(`people:${key}`);
            if (peopleCash) {
                loggerHandler.infoLogger('finds in people cache');
                res.status(200).json(peopleCash);
            } else {
                loggerHandler.infoLogger('search in people server');
                const people = await peopleService.searchPeople(key);
                await redisClient.setExpire(`people:${key}`, 3600, JSON.stringify(people));
                res.status(200).json(people);
            }
        } catch (error) {
            next(error)
        }
    }
}

const peopleController = new PeopleController();
export default peopleController;


