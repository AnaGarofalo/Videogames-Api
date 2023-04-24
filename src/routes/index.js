const { Router } = require("express");
const videogamesRouter = require("./videogames");
const genresRouter = require("./genres");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//* Defino los dos routers, videogames y genres
router.use("/videogames", videogamesRouter);

router.use("/genres", genresRouter);

module.exports = router;
