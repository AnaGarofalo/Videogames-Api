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

//*Rutas de URL_BASE/videogames

//* Ruta que trae todos los videoguegos
videogamesRouter.get("/", getVideogamesHandler);

//*Ruta que trae 1 videojuegos por id
videogamesRouter.get("/byId/:idVideogame", getVideogameByIdHandler);
videogamesRouter.get(
  "/byId",
  (
    req,
    res // chequea que haya mandado una id por params
  ) => res.status(400).json({ error: "Missing id" })
);

//* Ruta que trae los videojuegos según género y origen
videogamesRouter.get("/selectors", getVideogamesSelectorsHandler);

//* Ruta que crea un videojuego en la bdd
videogamesRouter.post("/", validate, postVideogameHandler);

//*Ruta que crea varios videojuegos a la vez (utilizado en la fase de desarrollo)
videogamesRouter.post("/bulk", postVideogameBulkHandler);

//*EXTRA Ruta que borra un videojuego
videogamesRouter.delete("/delete/:id", deleteVideogameHandler);

//*EXTRA Ruta que modifica un videojuego
videogamesRouter.put("/put/:id", validate, putVideogameHandler);

module.exports = videogamesRouter;
