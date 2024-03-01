// src/services/filmService.ts
import { IFilmSchema, IFilmSearchResponse } from '../types/IFilmSchema';
import DbSetup from '../utils/dbSetup/database';
import loggerHandler from '../utils/logger/loggerHandler';
import AxiosService from './axiosSetup';

class FilmService extends AxiosService {
    async searchFilms(key: string): Promise<IFilmSearchResponse> {
        try {
            return await this.instance.get(`/films/?search=${key}`);
        } catch (error) {
            loggerHandler.errorLogger('Error in searchFilms service', error as Error);
            throw error;
        }
    }

    async getAllFilms(): Promise<IFilmSearchResponse> {
        try {
            return await this.instance.get(`/films/`);
        } catch (error) {
            loggerHandler.errorLogger('Error in getAllFilms service', error as Error);
            throw error;
        }
    }

    async saveFilm(film: IFilmSchema): Promise<boolean> {
        const query = `INSERT INTO movies 
        (
            title,episode_id,opening_crawl,director,
            producer,release_date,created,edited,url,
            characters,planets,starships,vehicles,species
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;

        const values = [
            film.title, film.episode_id, film.opening_crawl, film.director,
            film.producer, film.release_date, film.created, film.edited, film.url,
            film.characters, film.planets, film.starships, film.vehicles, film.species
        ];

        const dbSetup = new DbSetup();
        const result = await dbSetup.executeQuery(query, values);

        if (result && result.rowCount && result.rowCount > 0)
            return true;

        return false;
    }
}

const filmService = new FilmService();
export default filmService;
