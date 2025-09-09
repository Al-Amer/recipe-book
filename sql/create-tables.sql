/* Make sure to specify/connect to correct Database before running */

CREATE TABLE IF NOT EXISTS categories (
 id  SERIAL PRIMARY KEY,
 name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS areas (
 id  SERIAL PRIMARY KEY,
 name TEXT UNIQUE NOT NULL
);
-- Optional: if you want to normalize measures; TheMealDB measures are often free text
CREATE TABLE IF NOT EXISTS measures (
 id  SERIAL PRIMARY KEY,
 name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS ingredients (
 id  SERIAL PRIMARY KEY,
 name TEXT UNIQUE NOT NULL
);
-- Meals
-- Use TheMealDB idMeal as the primary key to keep the ingest idempotent.
CREATE TABLE IF NOT EXISTS meals (
 id      INTEGER PRIMARY KEY,              -- idMeal
 name     TEXT NOT NULL,                 -- strMeal
 category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
 area_id   INTEGER REFERENCES areas(id)   ON DELETE SET NULL,
 instructions TEXT,                      -- strInstructions (nullable)
 thumb    TEXT,                      -- strMealThumb (nullable, long URLs)
 source    TEXT,                      -- strSource
 youtube   TEXT                      -- strYoutube
);
-- Ingredient mapping
-- Store both a normalized measure_id (optional) AND the original free-text measure, since API is messy.
CREATE TABLE IF NOT EXISTS meal_ingredients (
 meal_id    INTEGER NOT NULL REFERENCES meals(id)    ON DELETE CASCADE,
 ingredient_id INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
 measure_id  INTEGER REFERENCES measures(id)       ON DELETE SET NULL,
 measure_text TEXT,       -- e.g., '1 tsp', kept as-is from API
 -- Composite primary key prevents duplicates
 CONSTRAINT meal_ingredients_pkey PRIMARY KEY (meal_id, ingredient_id)
);
-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_meals_category  ON meals(category_id);
CREATE INDEX IF NOT EXISTS idx_meals_area    ON meals(area_id);
CREATE INDEX IF NOT EXISTS idx_meal_ingred_ing ON meal_ingredients(ingredient_id);






