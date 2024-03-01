CREATE TABLE IF NOT EXISTS movies(
    _id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    episode_id INT NOT NULL CHECK (episode_id > 0),
    opening_crawl TEXT,
    director VARCHAR(255),
    producer VARCHAR(255),
    release_date varchar(255),
    created TIMESTAMP,
    edited TIMESTAMP,
    url VARCHAR(255),
    characters VARCHAR(255)[],
    planets VARCHAR(255)[],
    starships VARCHAR(255)[],
    vehicles VARCHAR(255)[],
    species VARCHAR(255)[]
);