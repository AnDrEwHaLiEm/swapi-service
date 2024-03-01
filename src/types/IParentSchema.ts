interface ISearchResponse {
    count: number;
    next: string;
    previous: string;
}

interface IParentSchema {
    species: Array<string>;
    starships: Array<string>;
    vehicles: Array<string>;
    url: string;
    created: string;
    edited: string;
}

export { ISearchResponse, IParentSchema };

