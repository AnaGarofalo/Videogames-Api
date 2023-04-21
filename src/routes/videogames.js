const { Router } = require("express");
const getVideogamesHandler = require("../handlers/01-getVideogamesHandler");
const getVideogameByIdHandler = require("../handlers/03-getVideogameByIdHandler");
const postVideogameHandler = require("../handlers/06-postVideogameHandler");
const postVideogameBulkHandler = require("../handlers/07-postVideogamesBulkHandler");
const getVideogamesSelectorsHandler = require("../handlers/05-getVideogamesSelectorsHandler");
const deleteVideogameHandler = require("../handlers/10-deleteVideogameHandler");
const putVideogameHandler = require("../handlers/11-putVideogameHandler");
const validate = require("../validations/postVideogame");

const videogamesRouter = Router();

//Rutas de URL_BASE/videogames
videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/byId/:idVideogame", getVideogameByIdHandler);
videogamesRouter.get("/byId", (req, res) =>
  res.status(400).json({ error: "Missing id" })
);

videogamesRouter.get("/selectors", getVideogamesSelectorsHandler);

videogamesRouter.post("/", validate, postVideogameHandler);

videogamesRouter.post("/bulk", postVideogameBulkHandler);

videogamesRouter.delete("/delete/:id", deleteVideogameHandler);

videogamesRouter.put("/put/:id", putVideogameHandler);

module.exports = videogamesRouter;
