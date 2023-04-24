const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");
const getVideogamesByNameHandler = require("./02-getVideogamesByNameHandler");

//*Handler que trae o todos los videojuegos o por nombre
const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      //*llamo al handler que busca por nombre
      const videogames = await getVideogamesByNameHandler(name);
      return res.status(200).json(videogames);
    }
    //* llamo a los controllers que buscan todos los juegos en la api y en la bdd
    const apiVideogames = await getApiVideogamesController();
    const dbVideogames = await getDBVideogamesController();
    const allVideogames = [...apiVideogames, ...dbVideogames];
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideogamesHandler;
