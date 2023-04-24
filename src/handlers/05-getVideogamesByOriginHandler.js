const getApiVideogamesController = require("../controllers/01-getApiVideogamesController");
const getDBVideogamesController = require("../controllers/01-getDBVideogamesController");

const getVideogamesByOriginHandler = async (origin, res) => {
  try {
    //* llama al controller que corresponda según si se solicita el origen
    let videogames;
    if (origin === "database") videogames = await getDBVideogamesController();
    else if (origin === "api") videogames = await getApiVideogamesController();
    else res.status(404).json({ error: "Origin not found" });

    //* en esta implementación del front end, se fija si la respuesta es o no un array para saber si
    //* lo debe mapear o si no llegaron resultados, de esta manera lo distingue del array vacío cuando
    //* está esperando los resultados
    if (!videogames.length)
      return res.status(200).json({ message: "No games were found" });

    res.status(200).json(videogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getVideogamesByOriginHandler;
