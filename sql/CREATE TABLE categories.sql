/* Make sure to specify/connect to correct Database before running */

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS areas
(
id serial not null unique primary key,
name varchar(255) unique not null
);

CREATE TABLE IF NOT EXISTS measure (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS meals(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    mealCategory INTEGER REFERENCES categories(id),
    mealArea INTEGER REFERENCES areas(id),
    instructions TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS meal_ingred (
    id SERIAL NOT NULL PRIMARY KEY,
    ingredID INTEGER REFERENCES ingredients(id),
    mealId INTEGER REFERENCES meals(id),
    measureId INTEGER REFERENCES measure(id),
    amount VARCHAR(255) NOT NULL
);