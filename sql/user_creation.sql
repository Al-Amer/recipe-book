/* Create new User wich only has Access to this specific DB */

/* Create new Role for specific DB */
CREATE ROLE recipeBookDev WITH LOGIN PASSWORD '@DevGroupOfRecipeBook01';

/* Add Permissions for DB Acces and Altering */
ALTER ROLE recipeBookDev CREATEDB