const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");

const getVideogamesByOriginHandler = async (origin, res) => {
  try {
    let videogames;
    if (origin === "database") videogames = await getDBVideogamesController();
    else if (origin === "api") videogames = await getApiVideogamesController();
    else res.status(404).json({ error: "Origin not found" });

    if (!videogames.length)
      return res.status(200).json({ message: "No games were found" });

    res.status(200).json(videogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getVideogamesByOriginHandler;
