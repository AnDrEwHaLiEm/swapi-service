import {IParentSchema, ISearchResponse} from "./IParentSchema";

interface IFilmSearchResponse extends ISearchResponse {
    results: Array<IFilmSchema>;
}


interface IFilmSchema extends IParentSchema {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director:string;
    producer: string;
    release_date: string;
    characters: Array<string>;
    planets: Array<string>;
}

export { IFilmSearchResponse, IFilmSchema };