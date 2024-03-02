import { NextFunction, Request, Response } from "express";
import filmService from "../service/filmService";
import loggerHandler from "../utils/logger/loggerHandler";
import { IFilmSchema } from "../types/IFilmSchema";
import RedisSetup from "../utils/dbSetup/redisSetup";
class FilmController {
    public async searchFilms(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.params.key;
            loggerHandler.infoLogger(`Request searchFilms ${key}`);
            const redis = new RedisSetup();
            const filmCash = await redis.get(`movies:${key}`);
            if (filmCash) {
                loggerHandler.infoLogger('finds in film cache');
                res.status(200).json(filmCash);
            } else {
                loggerHandler.infoLogger('search in film server');
                const films = await filmService.searchFilms(key);
                await redis.setExpire(`movies:${key}`, 3600, JSON.stringify(films));
                res.status(200).json(films);
            }
        } catch (error) {
            next(error);
        }
    }

    async migrationFilms(_req: Request, res: Response, next: NextFunction) {
        try {
            const films = await filmService.getAllFilms();
            const filmsTitle = films.results.map((film) => film.title);
            const redisClient = new RedisSetup();
            const savedFilmsTitles = await redisClient.get('movies:title');

            if (savedFilmsTitles && savedFilmsTitles.length === filmsTitle.length) {
                const newFilms: Array<string> = [];
                const unSavedFilmsTitles: Array<string> = filmsTitle.filter((film) => !savedFilmsTitles.includes(film));
                await Promise.all(films.results.map(async (item: IFilmSchema) => {
                    if (unSavedFilmsTitles.includes(item.title)) {
                        if (await filmService.saveFilm(item)) {
                            newFilms.push(item.title);
                        }
                        else {
                            unSavedFilmsTitles.push(item.title);
                        }
                    }
                }
                ));
                loggerHandler.infoLogger(`new movies saved : ${newFilms}`);
                loggerHandler.infoLogger(`previous movies : ${savedFilmsTitles}`);
                loggerHandler.infoLogger(`error when save : ${unSavedFilmsTitles}`);
                await redisClient.set('movies:title', JSON.stringify([...savedFilmsTitles, ...newFilms]));
                res.status(200).json({ newFilms, savedFilmsTitles, unSavedFilmsTitles });
            }
            else {
                const newFilms: Array<string> = [];
                const unSavedFilmsTitles: Array<string> = [];
                await Promise.all(films.results.map(async (item: IFilmSchema) => {
                    if (await filmService.saveFilm(item)) {
                        newFilms.push(item.title);
                    }
                    else {
                        unSavedFilmsTitles.push(item.title);
                    }
                }))
                loggerHandler.infoLogger(`new movies saved : ${newFilms}`);
                loggerHandler.infoLogger(`previous movies : ${savedFilmsTitles}`);
                loggerHandler.infoLogger(`error when save : ${unSavedFilmsTitles}`);
                await redisClient.set('movies:title', JSON.stringify(newFilms));
                res.status(200).json({ newFilms, savedFilmsTitles, unSavedFilmsTitles });
            }
        } catch (error) {
            next(error);
        }
    }
}

const filmController = new FilmController();
export default filmController;
