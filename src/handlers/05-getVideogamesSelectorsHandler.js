const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");
const getVideogamesHandler = require("./01-getVideogamesHandler");
const getVideogamesByGenreHandler = require("./04-getVideogamesByGenreHandler");
const getVideogamesByOriginHandler = require("./05-getVideogamesByOriginHandler");

//* Ruta que implementa la búsqueda combinando género y origen
const getVideogamesSelectorsHandler = async (req, res) => {
  try {
    const { genre, origin } = req.query;
    //* necesita tanto género como origen, aunque se soliciten todos los juegos
    if (!genre || !origin) res.status(400).json({ error: "Incomplete Data" });

    //* si se solicitan todos los juegos, llama al handler de la ruta que trae a todos los juegos
    if ((origin === "all") & (genre === "all"))
      return getVideogamesHandler(req, res);

    //* si sólo se selecciona por género llama al handler que corresponde y viceversa
    if (origin === "all") return getVideogamesByGenreHandler(genre, res);
    if (genre === "all") return getVideogamesByOriginHandler(origin, res);

    //* selecciona tanto por origen como por género
    let allGames;
    if (origin === "api") allGames = await getApiVideogamesController();
    else allGames = await getDBVideogamesController();

    const newGames = [];
    allGames.forEach((game) => {
      let flag = false;
      game.genres.forEach((gameGenre) => {
        if (gameGenre.name === genre) flag = true;
      });
      if (flag) newGames.push(game);
    });

    //* en esta implementación del front end, se fija si la respuesta es o no un array para saber si
    //* lo debe mapear o si no llegaron resultados, de esta manera lo distingue del array vacío cuando
    //* está esperando los resultados
    if (!newGames.length)
      return res.status(200).json({ message: "No games were found" });

    res.status(200).json(newGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getVideogamesSelectorsHandler;
