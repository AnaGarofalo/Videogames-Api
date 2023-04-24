const getApiVideogamesByGenreController = require("../controllers/04-getApiVideogamesByGenreController");
const getDBVideogamesByGenreController = require("../controllers/04-getDBVideogamesByGenreController");

const getVideogamesByGenreHandler = async (genre, res) => {
  try {
    //* llama a los controllers que traen los juegos según género
    const apiVideogames = await getApiVideogamesByGenreController(genre);
    const dbVideogames = await getDBVideogamesByGenreController(genre);
    const allVideogames = [...apiVideogames, ...dbVideogames];

    //* en esta implementación del front end, se fija si la respuesta es o no un array para saber si
    //* lo debe mapear o si no llegaron resultados, de esta manera lo distingue del array vacío cuando
    //* está esperando los resultados
    if (!allVideogames.length)
      return res.status(200).json({ error: "No games found" });

    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideogamesByGenreHandler;
