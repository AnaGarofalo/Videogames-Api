const { Router } = require("express");
const getGenresHandler = require("../handlers/08-getGenresHandler");
const postGenresBulkHandler = require("../handlers/09-postGenresBulkHandler");

const genresRouter = Router();

genresRouter.get("/", getGenresHandler);

genresRouter.post("/bulk", postGenresBulkHandler);

module.exports = genresRouter;
