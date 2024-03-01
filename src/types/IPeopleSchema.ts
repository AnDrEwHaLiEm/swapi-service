import { IParentSchema, ISearchResponse } from "./IParentSchema";

interface IPeopleSearchResponse extends ISearchResponse {
    results: Array<IPeopleSchema>;
}

interface IPeopleSchema extends IParentSchema {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: Array<string>;
}

export { IPeopleSearchResponse };