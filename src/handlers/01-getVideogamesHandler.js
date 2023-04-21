const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");
const getVideogamesByNameHandler = require("./02-getVideogamesByNameHandler");

const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const videogames = await getVideogamesByNameHandler(name);
      return res.status(200).json(videogames);
    }
    const apiVideogames = await getApiVideogamesController();
    const dbVideogames = await getDBVideogamesController();
    const allVideogames = [...apiVideogames, ...dbVideogames];
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideogamesHandler;
