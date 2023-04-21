const getApiVideogamesByGenreController = require("../controllers/04-getApiVideogamesByGenreController");
const getDBVideogamesByGenreController = require("../controllers/04-getDBVideogamesByGenreController");

const getVideogamesByGenreHandler = async (genre, res) => {
  try {
    const apiVideogames = await getApiVideogamesByGenreController(genre);
    const dbVideogames = await getDBVideogamesByGenreController(genre);
    const allVideogames = [...apiVideogames, ...dbVideogames];

    if (!allVideogames.length)
      return res.status(200).json({ error: "No games found" });

    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideogamesByGenreHandler;
