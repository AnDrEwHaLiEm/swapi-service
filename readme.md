
# Documentation for SWAPI Service

## Overview
This document provides information about the SWAPI (Star Wars API) service, which is a web service built to consume the SWAPI API, perform operations such as searching for movies and people, migrating movie data to a local database, adding logging and error handling, implementing a caching layer using Redis, and running tests.

## Components
The SWAPI service consists of the following components:
1. Node.js application
2. Postgres SQL database
3. Redis caching layer

## Requirements
To run the SWAPI service, you will need:
- Docker installed on your machine
- Access to the internet to fetch data from the SWAPI API
## Building
to run build
```
yarn build:docker
```


## Docker Testing
To run tests inside a Docker container:

```
yarn run test:docker
```
##### Note:
- Before running yarn test:docker, ensure that you have run yarn build:docker
- Before running yarn test:docker, ensure that you haven't already started yarn start:docker. If it's running, use yarn stop:service first.
- Upon successful completion of tests, all Docker services will be automatically stopped and closed.

## Running the Service
Follow these steps to run the SWAPI service:


1. Start the Docker containers:
   ```
   yarn run start:docker
   ```

2. Access the SWAPI service:
   - Once the containers are up and running, you can access the SWAPI service at `http://localhost:3000`.

## Cleaning Up
To stop and remove the Docker containers:

```
yarn run stop:service
```

## APis

#### search films
##### request

```
GET => /films/:key
```
##### response

```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "title": "The Empire Strikes Back",
            "episode_id": 5,
            "opening_crawl": "It is a dark time for the ...",
            "director": "Irvin Kershner",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1980-05-17",
            "characters": ["https://swapi.dev/api/people/1/","https://swapi.dev/api/people/2/"],
            "planets": ["https://swapi.dev/api/planets/5/""https://swapi.dev/api/planets/4/"],
            "starships": ["https://swapi.dev/api/starships/3/", "https://swapi.dev/api/starships/10/"],
            "vehicles": ["https://swapi.dev/api/vehicles/8/","https://swapi.dev/api/vehicles/14/"],
            "species": ["https://swapi.dev/api/species/1/","https://swapi.dev/api/species/2/"],
            "created": "2014-12-12T11:26:24.656000Z",
            "edited": "2014-12-15T13:07:53.386000Z",
            "url": "https://swapi.dev/api/films/2/"
        }
    ]
}
```


#### search people
##### request

```
GET => people/:key
```
##### response

```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "name": "C-3PO",
            "height": "167",
            "mass": "75",
            "hair_color": "n/a",
            "skin_color": "gold",
            "eye_color": "yellow",
            "birth_year": "112BBY",
            "gender": "n/a",
            "homeworld": "https://swapi.dev/api/planets/1/",
            "films": ["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/"],
            "species": ["https://swapi.dev/api/species/2/" ],
            "vehicles": [],
            "starships": [],
            "created": "2014-12-10T15:10:51.357000Z",
            "edited": "2014-12-20T21:17:50.309000Z",
            "url": "https://swapi.dev/api/people/2/"
        }
    ]
}
```

#### migration films
##### request

```
POST => /films/migration
```
##### response

```json
{
    "newFilms": [ "The Empire Strikes Back", "A New Hope","Return of the Jedi","The Phantom Menace"],
    "savedFilmsTitles": null,
    "unSavedFilmsTitles": []
}
```

## APis documents
in this link you will find postman APis [API Documentation](https://documenter.getpostman.com/view/27394446/2sA2xb6bQs)