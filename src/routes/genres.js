const { Router } = require("express");
const getGenresHandler = require("../handlers/08-getGenresHandler");
const postGenresBulkHandler = require("../handlers/09-postGenresBulkHandler");

const genresRouter = Router();

//* Una ruta que trae todos los géneros
genresRouter.get("/", getGenresHandler);

//* Una ruta que lleva todos los videojuegos de la api a la bdd
genresRouter.post("/bulk", postGenresBulkHandler);

module.exports = genresRouter;
