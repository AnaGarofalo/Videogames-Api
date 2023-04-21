const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");
const getVideogamesHandler = require("./01-getVideogamesHandler");
const getVideogamesByGenreHandler = require("./04-getVideogamesByGenreHandler");
const getVideogamesByOriginHandler = require("./05-getVideogamesByOriginHandler");

const getVideogamesSelectorsHandler = async (req, res) => {
  try {
    const { genre, origin } = req.query;
    if (!genre || !origin) res.status(400).json({ error: "Incomplete Data" });

    if ((origin === "all") & (genre === "all"))
      return getVideogamesHandler(req, res);

    if (origin === "all") return getVideogamesByGenreHandler(genre, res);
    if (genre === "all") return getVideogamesByOriginHandler(origin, res);

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

    if (!newGames.length)
      return res.status(200).json({ message: "No games were found" });

    res.status(200).json(newGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getVideogamesSelectorsHandler;
